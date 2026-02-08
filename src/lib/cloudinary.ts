import { env } from "@/env.mjs";
import { v2 as cloudinary } from "cloudinary";
import { extractPublicId } from "cloudinary-build-url";

cloudinary.config({
  cloud_name: env.CLOUDINARY_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_SECRET,
  secure: true,
});

export async function uploadToCloudinary(fileURI: string, subFolder: string) {
  return await cloudinary.uploader
    .upload(fileURI, {
      invalidate: true,
      folder: `censcope/${subFolder}`,
    })
    .then((result) => result)
    .catch((error) => {
      console.log(error);
    });
}

export async function uploadRawToCloudinary(fileURI: string, subFolder: string) {
  return await cloudinary.uploader
    .upload(fileURI, {
      resource_type: "raw",
      folder: `censcope/${subFolder}`,
    })
    .then((result) => result)
    .catch((error) => {
      console.log(error);
      throw error;
    });
}
export async function deleteFromCloudinary(
  url: string,
  resourceType = "image"
) {
  try {
    const publicId = extractPublicId(url);
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
    console.log("Delete result:", result);
    return result;
  } catch (err) {
    console.error("Error deleting file:", err);
    throw err;
  }
}
