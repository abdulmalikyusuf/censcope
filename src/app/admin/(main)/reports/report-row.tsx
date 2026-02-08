"use client";

import { useState } from "react";
import { deleteReport } from "@/lib/actions/reports";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { SelectReport } from "@/db/schema";
import { formatDate } from "@/lib/utils";

export function ReportRow({ report }: { report: SelectReport }) {
  const [pending, setPending] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this report?")) return;
    setPending(true);
    const result = await deleteReport(report.id);
    setPending(false);
    if (result?.error) toast.error(result.error);
    else {
      toast.success("Report deleted.");
      window.location.reload();
    }
  }

  return (
    <li className="flex items-center justify-between gap-4 py-2 border-b border-gray-100">
      <div className="min-w-0">
        <p className="font-medium text-gray-900 truncate">{report.title}</p>
        <p className="text-xs text-gray-500">
          {report.createdAt ? formatDate(report.createdAt) : "—"}
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <a
          href={report.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-cyan-600 hover:underline"
        >
          Open
        </a>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleDelete}
          disabled={pending}
        >
          {pending ? "…" : "Delete"}
        </Button>
      </div>
    </li>
  );
}
