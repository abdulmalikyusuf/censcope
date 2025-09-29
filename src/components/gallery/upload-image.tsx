"use client";

import { useRef, useTransition, useState } from "react";
import imageCompression from "browser-image-compression";

import { uploadImages } from "@/lib/actions/images";
import { toast } from "sonner";

export function UploadImage() {
  const [pending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [compressionProgress, setCompressionProgress] = useState<number>();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files; // Get all selected files

    if (!files || files.length === 0) return;

    const formData = new FormData();

    try {
      // Process all files in parallel
      const processedFiles = await Promise.all(
        Array.from(files).map(async (file, index) => {
          try {
            if (file.size > 1 * 1024 * 1024) {
              // Compress if >1MB
              const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1024,
                useWebWorker: true,
                onProgress: (progress: number) =>
                  progress >= 100
                    ? setCompressionProgress(undefined)
                    : setCompressionProgress((progress * index) / files.length),
              };
              return await imageCompression(file, options);
            }
            return file; // Return original if no compression needed
          } catch (error) {
            console.error("Error processing file:", file.name, error);
            return null; // Handle individual file errors
          }
        })
      );

      // Filter out nulls (failed files) and append to FormData
      processedFiles
        .filter((file) => file !== null)
        .forEach((file) => formData.append("files", file!));

      startTransition(async () => {
        const res = await uploadImages(formData);
        if (res?.error) {
          console.log(res.error);

          toast("Ooops! An error occurred.");
        } else {
          toast(res.message);
          console.log(res.success);
          if (fileInputRef.current) fileInputRef.current.value = "";
        }
      });
    } catch (error) {
      console.error("Error during file processing:", error);
    }
  };

  return (
    <label
      htmlFor="uploadFile1"
      data-active={pending}
      className="bg-white text-slate-500 font-semibold text-base rounded max-w-md h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto data-[active='true']:cursor-not-allowed data-[active='true']:opacity-50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-11 mb-3 fill-gray-500"
        viewBox="0 0 32 32"
      >
        <path
          d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
          data-original="#000000"
        />
        <path
          d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
          data-original="#000000"
        />
      </svg>
      {compressionProgress
        ? `Compressing: ${compressionProgress.toFixed(2)}%`
        : pending
        ? "Uploading"
        : "Upload file"}
      <input
        type="file"
        id="uploadFile1"
        className="hidden"
        accept="image/*"
        multiple
        ref={fileInputRef}
        onChange={handleUpload}
        disabled={pending || !!compressionProgress}
      />
      <p className="text-xs font-medium text-slate-400 mt-2">
        PNG, JPG SVG, WEBP, and GIF are Allowed.
      </p>
    </label>
  );
}
