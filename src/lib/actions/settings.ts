"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { settings } from "@/db/schema";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { fileToURI } from "@/lib/utils";
import { auth, signOut } from "@/lib/auth";

const BACKGROUND_IMAGE_KEY = "home_background_image";

export async function getBackgroundImageUrl(): Promise<string | null> {
  const row = await db.query.settings.findFirst({
    where: eq(settings.key, BACKGROUND_IMAGE_KEY),
  });
  return row?.value ?? null;
}

export async function uploadBackgroundImage(formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user) return signOut({ redirectTo: "/admin/signin" });

    const file = formData.get("file") as File;
    if (!file?.size || !file.type.startsWith("image/")) {
      return { error: "Please upload a valid image file." };
    }

    const fileURI = await fileToURI(file);
    const result = await uploadToCloudinary(fileURI, "background");
    const url = (result as { secure_url?: string })?.secure_url;
    if (!url) return { error: "Upload failed." };

    await db
      .insert(settings)
      .values({ key: BACKGROUND_IMAGE_KEY, value: url })
      .onConflictDoUpdate({
        target: settings.key,
        set: { value: url },
      });

    revalidatePath("/");
    revalidatePath("/admin/settings");
    return { success: true, url };
  } catch (e) {
    console.error(e);
    return {
      error: e instanceof Error ? e.message : "Failed to upload background.",
    };
  }
}
