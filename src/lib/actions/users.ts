"use server";
import { revalidatePath } from "next/cache";
import postgres from "postgres";
import { isAuthApiError } from "@supabase/supabase-js";
import { ZodError, z } from "zod";

import { db } from "@/db";
import { users } from "@/db/schema";
import { createSupabaseAdmin } from "../supabase/server";
import { eq } from "drizzle-orm";
import { createUserFormSchema } from "@/lib/validations";

const BUCKET_NAME = process.env.SUPABASE_BUCKET_NAME!;

if (!BUCKET_NAME) {
  // Throw immediately during server startup/build if env var is missing
  throw new Error("SUPABASE_BUCKET_NAME environment variable is not defined");
}

// Define a consistent return type for the action
type ActionResult =
  | { success: true; message: string; userId?: string; email?: string } // Add relevant success data
  | { success: false; message: string; errors?: Record<string, string[]> }; // Include validation errors

export async function createOrUpdateUser(
  formdata: FormData
): Promise<ActionResult> {
  // 1. Validate Input Data
  const rawFormData = Object.fromEntries(formdata.entries());
  const userId = rawFormData["userId"] as string;
  const validationResult = createUserFormSchema(!!userId, true).safeParse(
    rawFormData
  );

  if (!validationResult.success) {
    console.error("Validation Error:", validationResult.error.flatten());
    return {
      success: false,
      message: "Invalid form data.",
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { name, email, password, avatar } = validationResult.data;
  let avatarPath: string | undefined = undefined; // Store avatar path
  // Flag to track if it's an update operation
  const isUpdateOperation = !!userId;

  try {
    const supabase = await createSupabaseAdmin();

    // 2. Handle Avatar Upload (if provided)
    if (avatar) {
      // Generate a unique filename to prevent collisions
      const fileExtension = avatar.name.split(".").pop();
      const uniqueFileName = `avatars/${name}__${avatar.name}.${fileExtension}`;

      const { data: imageData, error: imageError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(uniqueFileName, avatar, {
          cacheControl: "3600", // Keep cache control as needed
          upsert: false, // Keep false if you never want to overwrite, true if the UUID somehow collided (highly unlikely)
        });

      if (imageError) {
        console.error(`Error uploading avatar ${avatar.name}:`, imageError);
        // Handle specific storage errors more gracefully
        if (
          typeof imageError === "object" &&
          imageError !== null &&
          "statusCode" in imageError &&
          imageError.statusCode === "409"
        ) {
          // Example: Check for bucket not found, permissions error, etc.
          // You might want different messages based on imageError.statusCode or imageError.message
          return {
            success: false,
            message: `Failed to upload profile picture: ${imageError.message}`,
          };
        }
        // Generic storage error
        return {
          success: false,
          message:
            "An unexpected error occurred while uploading the profile picture.",
        };
      }
      avatarPath = imageData?.path; // Store the path for DB insert
      if (!avatarPath) {
        // This shouldn't happen if upload succeeded without error, but check just in case
        console.error(
          "Avatar upload succeeded but path is missing:",
          imageData
        );
        return {
          success: false,
          message: "Failed to get avatar path after upload.",
        };
      }
    }

    // --- 2. Perform Create or Update ---
    if (isUpdateOperation && userId) {
      // --- UPDATE LOGIC ---

      // 2a. Update Supabase Auth User (if necessary - handle with care)
      // Only update email/password if they are provided and different.
      // Requires fetching the current user data first to compare.
      // NOTE: Using admin client. Use supabase.auth.updateUser() for user context.
      const authUpdates: { email?: string; password?: string } = {};
      // Example: Check if email needs update (requires fetching current email)
      const {
        data: { user: currentAuthUser },
      } = await supabase.auth.admin.getUserById(userId);
      if (currentAuthUser && email !== currentAuthUser.email) {
        authUpdates.email = email;
      }
      if (password) {
        // Only update password if a new one was provided
        authUpdates.password = password;
      }
      // Add email update logic similarly if needed

      if (Object.keys(authUpdates).length > 0) {
        const { error: authUpdateError } =
          await supabase.auth.admin.updateUserById(userId, authUpdates);
        if (authUpdateError) {
          console.error("Supabase Auth Update Error:", authUpdateError);
          // Handle specific auth update errors
          return {
            success: false,
            message: `Failed to update authentication details: ${authUpdateError.message}`,
          };
        }
      }

      // 2b. Update Local Database
      const dataToUpdate: { name: string; avatar?: string } = { name }; // Base update data
      if (avatarPath) {
        // Only include avatar_url if a new avatar was successfully uploaded
        dataToUpdate.avatar = avatarPath; // Ensure this matches your schema column name
      }

      const result = await db
        .update(users)
        .set(dataToUpdate)
        .where(eq(users.id, userId)) // Use the userId from the form
        .returning({
          updatedId: users.id, // Adjust returned fields as needed
          updatedEmail: users.email,
        });

      if (!result || result.length === 0) {
        console.error("DB update failed for user ID:", userId);
        // Attempt to delete newly uploaded avatar if DB update failed?
        if (avatarPath)
          await supabase.storage.from(BUCKET_NAME).remove([avatarPath]);
        return {
          success: false,
          message: "User not found or failed to update profile information.",
        };
      }

      // --- Delete old avatar now if DB update succeeded ---
      // if (oldAvatarPath && oldAvatarPath !== avatarPath) {
      //     await supabase.storage.from(BUCKET_NAME).remove([oldAvatarPath]);
      // }

      // 2c. Return Update Success
      return {
        success: true,
        message: `User profile updated successfully for ${result[0].updatedEmail}.`,
        userId: result[0].updatedId,
        email: result[0].updatedEmail,
      };
    } else {
      // 3. Sign Up User with Supabase Auth
      // Note: If this fails, the avatar might already be uploaded.
      // Consider cleanup logic if strict atomicity is required (complex).
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password: password!,
      });

      if (authError) {
        console.error("Supabase Auth Error:", authError);
        // Delete the uploaded avatar if auth fails?
        // if (avatarPath) {
        //     await supabase.storage.from(BUCKET_NAME).remove([avatarPath]);
        // }
        if (isAuthApiError(authError)) {
          // Provide more specific messages if possible based on authError.status
          if (
            authError.status === 400 &&
            authError.message.includes("User already registered")
          ) {
            return {
              success: false,
              message: "This email address is already registered.",
            };
          }
          if (authError.status === 422) {
            // Often password policy errors
            return {
              success: false,
              message: `Signup failed: ${authError.message}`,
            };
          }
          // Default Auth API error
          return {
            success: false,
            message: `Authentication error: ${authError.message}`,
          };
        }
        // Default non-API auth error
        return {
          success: false,
          message: "An unexpected error occurred during sign up.",
        };
      }

      if (!authData.user) {
        // This case might indicate email confirmation is required or another unexpected issue
        console.error(
          "Supabase Auth Signup succeeded but user object is missing."
        );
        // Delete the uploaded avatar if auth "succeeded" but user is null?
        // if (avatarPath) {
        //     await supabase.storage.from(BUCKET_NAME).remove([avatarPath]);
        // }
        return {
          success: false,
          message:
            "Signup process did not complete successfully. Please check your email or try again.",
        };
      }

      // 4. Insert User Data into Local Database
      // Note: If this fails, the Supabase Auth user exists, but the local profile doesn't.
      // Consider adding logic to delete the Supabase Auth user if this DB insert fails (complex).
      const userData = {
        name,
        avatar: avatarPath,
      };

      // Ensure your 'users' schema has an 'id' (UUID or text) column as primary key
      // and an 'avatar_url' (text, nullable) column.
      const result = await db
        .update(users)
        .set(userData)
        .where(eq(users.id, authData.user.id))
        .returning({
          insertedId: users.id, // return specific fields
          insertedEmail: users.email,
        });

      if (!result || result.length === 0) {
        console.error(
          "DB insert failed after successful signup. Auth User ID:",
          authData.user.id
        );
        // CRITICAL: Potential inconsistency. Consider cleanup:
        // await supabase.auth.admin.deleteUser(authData.user.id); // Requires Supabase Admin privileges
        if (avatarPath) {
          await supabase.storage.from(BUCKET_NAME).remove([avatarPath]);
        }
        return {
          success: false,
          message: "Failed to save user profile information after signup.",
        };
      }

      // 5. Return Success
      return {
        success: true,
        message: `User registration initiated successfully for ${result[0].insertedEmail}. Please check your email for verification if required.`,
        userId: result[0].insertedId,
        email: result[0].insertedEmail,
      };
    }
  } catch (error) {
    console.error("Error creating user:", error);

    // Handle specific DB errors (PostgresError)
    if (error instanceof postgres.PostgresError) {
      // You already had good handlers here, keep them.
      let message = "Database error occurred.";
      if (error.code === "23505")
        message = "User profile data conflicts with existing data.";
      // More generic than "User already exists" if based on ID/email from Auth
      else if (error.code === "23514")
        message = "Invalid data provided for user profile.";
      else if (error.code === "23503") message = "Profile data relation error.";
      else if (error.code === "23502")
        message = "Missing required profile information.";
      else if (error.code === "22007")
        message = "Invalid date format in profile.";

      return { success: false, message };
    }

    // Handle Zod errors during parsing (though `safeParse` catches them earlier)
    if (error instanceof ZodError) {
      const fieldErrors = error.flatten().fieldErrors;
      const sanitizedErrors: Record<string, string[]> = {};

      Object.keys(fieldErrors).forEach((key) => {
        if (fieldErrors[key]) {
          sanitizedErrors[key] = fieldErrors[key] as string[];
        }
      });

      return {
        success: false,
        message: "Invalid data provided.",
        errors: sanitizedErrors,
      };
    }

    // Handle generic errors
    if (error instanceof Error) {
      // Avoid exposing potentially sensitive details from error.message directly
      return {
        success: false,
        message: `An unexpected server error occurred: ${error.message}`,
      }; // Or a more generic message for production
    }

    // Fallback for unknown errors
    return {
      success: false,
      message: "An unknown error occurred while creating the user.",
    };
  }
}

// Define a schema for input validation (expecting userId)
const DeleteUserSchema = z.object({
  // Assuming userId is passed, validate it's a non-empty string (likely UUID)
  userId: z.string().min(1, "User ID cannot be empty."),
});

type DeleteActionResult =
  | { success: true; message: string }
  | { success: false; message: string };

export async function deleteUser(
  userIdToDelete: string
): Promise<DeleteActionResult> {
  const validationResult = DeleteUserSchema.safeParse({
    userId: userIdToDelete,
  });

  if (!validationResult.success) {
    console.error("Validation Error:", validationResult.error.flatten());
    const errorMessages = validationResult.error.errors
      .map((e) => e.message)
      .join(", ");
    return {
      success: false,
      message: `Invalid input: ${errorMessages}`,
    };
  }

  const { userId } = validationResult.data;

  try {
    const supabase = await createSupabaseAdmin();

    const { error: authError } = await supabase.auth.admin.deleteUser(userId);

    if (authError) {
      console.error(
        `Supabase Auth Deletion Error for user ${userId}:`,
        authError
      );
      if (isAuthApiError(authError)) {
        // Handle specific cases like "User not found" (status 404) gracefully
        if (authError.status === 404) {
          console.warn(
            `Supabase Auth user ${userId} not found. Proceeding to delete from DB.`
          );
          // Don't necessarily return an error here, maybe the user was already deleted from Auth.
        } else {
          return {
            success: false,
            message: `Failed to delete user from authentication: ${authError.message}`,
          };
        }
      } else {
        // Generic auth error
        return {
          success: false,
          message:
            "An unexpected error occurred during authentication deletion.",
        };
      }
    } else {
      console.log(`Successfully deleted user ${userId} from Supabase Auth.`);
    }

    const deleteDbResult = await db
      .delete(users)
      .where(eq(users.id, userId))
      .returning({ deletedId: users.id });

    if (!deleteDbResult || deleteDbResult.length === 0) {
      // This could happen if the user was already deleted from the DB or never existed there
      console.warn(
        `User ${userId} not found in the local database or already deleted.`
      );
      // Decide if this is an error or acceptable state. If Auth deletion succeeded,
      // maybe return success but with a specific message.
      // If Auth user *was* found and deleted, but DB user wasn't, it's potentially an inconsistency.
      if (!authError) {
        // Only warn strongly if Auth deletion *did* happen
        console.error(
          `Potential inconsistency: Auth user ${userId} deleted, but DB record not found.`
        );
        // Return success because the primary goal (removing auth access) succeeded.
        return {
          success: true,
          message: `User removed from authentication, but profile data was not found in the database.`,
        };
      }
    } else {
      console.log(
        `Successfully deleted user ${deleteDbResult[0].deletedId} from the database.`
      );
    }

    // --- Step 3: Revalidate Client Cache (Optional) ---
    // If you're displaying a list of users, revalidate the path
    // to trigger a data refresh on the client-side. Adjust the path as needed.
    revalidatePath("/admin/users"); // Example path

    // --- Step 4: Return Success ---
    return {
      success: true,
      message: `User ${userId} has been successfully deleted.`,
    };
  } catch (error) {
    console.error(`Error deleting user ${userId}:`, error);

    // Handle specific DB errors (PostgresError)
    if (error instanceof postgres.PostgresError) {
      // Provide a generic DB error message for deletion
      return {
        success: false,
        message: `Database error occurred during deletion (Code: ${error.code}).`,
      };
    }

    // Handle generic errors
    if (error instanceof Error) {
      return {
        success: false,
        message: `An unexpected server error occurred: ${error.message}`,
      };
    }

    // Fallback for unknown errors
    return {
      success: false,
      message: "An unknown error occurred while deleting the user.",
    };
  }
}
