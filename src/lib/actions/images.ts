"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { images } from "@/db/schema";
import { deleteFromCloudinary, uploadToCloudinary } from "../cloudinary";
import { fileToURI } from "@/lib/utils";
import { auth, signOut } from "../auth";

export async function deleteGallery(galleryId: string) {
  return db.transaction(async (tx) => {
    try {
      const galleryItem = await tx.query.images.findFirst({
        where: eq(images.id, galleryId),
      });

      if (!galleryItem) {
        return { error: "Gallery item not found." };
      }

      await deleteFromCloudinary(galleryItem?.url);

      await tx.delete(images).where(eq(images.id, galleryId));

      revalidatePath("/admin/gallery");

      return { success: "Image deleted successfully." };
    } catch (error) {
      console.error(error);
      return { error: "An error occurred while deleting the image." };
    }
  });
}

type Result = {
  filename: string;
  success: boolean;
  error?: string;
  path?: string;
};

export async function uploadImages(formData: FormData) {
  const results = [] as Result[]; // To store the outcome of each file upload
  let hasErrors = false;

  try {
    const session = await auth();
    console.log(session);
    if (!session || !session.user) {
      console.error("Could not authenticate user for upload.");
      return signOut({ redirectTo: "/admin/signin" });
      // return { error: "Could not authenticate user for upload.", results };
    }

    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return { error: "No files provided.", results };
    }

    for (const file of files) {
      if (!file || typeof file.name !== "string" || file.size === 0) {
        console.warn("Skipping invalid file entry:", file);
        results.push({
          filename: "unknown",
          success: false,
          error: "Invalid file entry",
        });
        hasErrors = true;
        continue;
      }

      const originalFilename = file.name;
      try {
        const filenameWithoutExt = originalFilename.replace(/\.[^/.]+$/, "");

        const fileURI = await fileToURI(file);
        const result = await uploadToCloudinary(fileURI, "gallery");

        const imageUrl: string = (result as { secure_url: string }).secure_url;

        if (!imageUrl) {
          console.error(`Error uploading ${originalFilename}`);
          results.push({
            filename: originalFilename,
            success: false,
            error: "Eloudinary error",
          });
          hasErrors = true;
          continue;
        }

        await db.insert(images).values({
          title: filenameWithoutExt,
          url: imageUrl,
        });

        results.push({
          filename: originalFilename,
          success: true,
          path: imageUrl,
        });
      } catch (uploadError) {
        let errorMessage = "Processing failed";
        if (uploadError instanceof Error) {
          // Type guard: checks if uploadError is an instance of Error
          // Inside this block, TypeScript knows uploadError has .message, .name, .stack properties
          console.error(
            `Failed to process ${originalFilename}: ${uploadError.message}`,
            uploadError.stack
          );
          errorMessage = uploadError.message;
        } else {
          // Handle cases where something else was thrown (string, object, etc.)
          console.error(
            `Failed to process ${originalFilename}: Unexpected error type`,
            uploadError
          );
          // Try to convert the unknown error to a string representation
          errorMessage =
            String(uploadError) ||
            "Non-error object thrown during file processing";
        }
        results.push({
          filename: originalFilename,
          success: false,
          error: errorMessage,
        });
        hasErrors = true;
      }
    }

    if (results.some((r) => r.success)) {
      // Only revalidate if at least one succeeded
      revalidatePath("/admin/gallery");
    }

    const successfulUploads = results.filter((r) => r.success).length;
    const failedUploads = results.length - successfulUploads;

    return {
      message: `Processed ${results.length} files. ${successfulUploads} uploaded successfully, ${failedUploads} failed.`,
      success: !hasErrors, // Overall success if no individual errors occurred
      results: results, // Detailed results for each file
    };
  } catch (error) {
    console.error("General error during multi-file upload:", error);
    return {
      error:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred during the upload process.",
      success: false,
      results,
    };
  }
}
