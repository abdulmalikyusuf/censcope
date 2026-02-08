"use client";

import { useRef, useState } from "react";
import { uploadBackgroundImage } from "@/lib/actions/settings";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function BackgroundImageForm() {
  const [pending, setPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    const result = await uploadBackgroundImage(formData);
    setPending(false);
    if (result?.error) {
      toast.error(result.error);
      return;
    }
    toast.success("Background image updated.");
    formRef.current?.reset();
    window.location.reload();
  }

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="mt-4 flex flex-wrap items-end gap-4"
    >
      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-700">Choose image</span>
        <input
          type="file"
          name="file"
          accept="image/*"
          required
          className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-cyan-600 file:px-4 file:py-2 file:text-white file:hover:bg-cyan-700"
        />
      </label>
      <Button type="submit" disabled={pending} className="bg-cyan-600 hover:bg-cyan-700">
        {pending ? "Uploading…" : "Update background"}
      </Button>
    </form>
  );
}
