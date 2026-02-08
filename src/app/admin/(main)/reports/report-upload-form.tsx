"use client";

import { useState } from "react";
import { uploadReport } from "@/lib/actions/reports";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ReportUploadForm() {
  const [pending, setPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setPending(true);
    const result = await uploadReport(formData);
    setPending(false);
    if (result?.error) {
      toast.error(result.error);
      return;
    }
    toast.success("Report uploaded.");
    window.location.reload();
  }

  return (
    <form action={handleSubmit} className="mt-6 p-4 border border-gray-200 rounded-lg space-y-4 max-w-xl">
      <div>
        <Label htmlFor="title">Report title (optional)</Label>
        <Input
          id="title"
          name="title"
          placeholder="e.g. Annual Report 2024"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="file">PDF file</Label>
        <input
          id="file"
          type="file"
          name="file"
          accept="application/pdf"
          required
          className="mt-1 block w-full text-sm text-gray-600 file:mr-4 file:rounded-md file:border-0 file:bg-cyan-600 file:px-4 file:py-2 file:text-white file:hover:bg-cyan-700"
        />
      </div>
      <Button type="submit" disabled={pending} className="bg-cyan-600 hover:bg-cyan-700">
        {pending ? "Uploading…" : "Upload report"}
      </Button>
    </form>
  );
}
