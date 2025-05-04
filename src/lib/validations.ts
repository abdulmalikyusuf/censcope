import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

// Base schema definition with optional fields where necessary for update logic
const UserFormSchemaBase = z.object({
  userId: z.string().optional(),
  name: z.string().min(1, "Please enter the user's name"), // Use min(1) instead of required_error for easier conditional logic
  email: z
    .string()
    .email("Invalid email address")
    .min(1, "Please enter the user's email"), // Use min(1)
  // Password is optional for update, but must meet criteria if provided
  password: z
    .string()
    .min(8, "Password should be a minimum of 8 characters")
    .optional()
    .or(z.literal("")), // Allow empty string to signify no change
  // Confirm password is also optional
  confirm_password: z
    .string()
    .min(8, "Password should be a minimum of 8 characters")
    .optional()
    .or(z.literal("")), // Allow empty string
  // Avatar is optional for update, but must meet criteria if provided
  avatar: z
    .instanceof(File)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .png, and .webp formats are supported."
    )
    .refine((file) => file.size <= MAX_FILE_SIZE, "Max file size is 5MB.")
    .optional(), // Make avatar optional at the base level
});

// Function to generate the final schema with conditional validations
export const createUserFormSchema = (
  isUpdating: boolean,
  isServerAction: boolean
) =>
  UserFormSchemaBase.refine(
    (data) => {
      // Password confirmation check: Only required if a new password is entered.
      if (!isServerAction && (data.password || data.confirm_password)) {
        return data.password === data.confirm_password;
      }
      return true; // Pass if no new password is being set
    },
    {
      message: "Passwords do not match",
      path: ["confirm_password"], // Attach error to confirm_password field
    }
  ).superRefine((data, ctx) => {
    // Add required checks only when *creating* a user
    if (!isUpdating) {
      if (!data.name) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter the user's name",
          path: ["name"],
        });
      }
      if (!data.email) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter the user's email",
          path: ["email"],
        });
      }
      // For creation, password fields are required
      if (!data.password) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter the user's password",
          path: ["password"],
        });
      }
      if (!data.confirm_password && !isServerAction) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please confirm the user's password",
          path: ["confirm_password"],
        });
      }
      // Make avatar required only during creation, if needed.
      // If avatar should be optional even for creation, remove this check.
      // Based on your original schema (no .optional()), it was required.
      if (!data.avatar) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please upload an avatar",
          path: ["avatar"],
        });
      }
    }

    // Optional: Add a check during update: if one password field is filled, the other must be too.
    // The refine above already checks for mismatch, this checks for *existence* if one is present.
    if (
      !isServerAction &&
      isUpdating &&
      (data.password || data.confirm_password)
    ) {
      if (data.password && !data.confirm_password) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please confirm the new password",
          path: ["confirm_password"],
        });
      } else if (!data.password && data.confirm_password) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please enter the new password",
          path: ["password"],
        });
      }
    }
  });

// Infer the type from the base schema for component usage
export type UserFormValues = z.infer<typeof UserFormSchemaBase>;
