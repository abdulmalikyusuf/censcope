import { notFound } from "next/navigation";
import { db } from "@/db";
import { reports } from "@/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function ReportPreviewPage({ params }: Props) {
  const { id } = await params;
  const [report] = await db
    .select()
    .from(reports)
    .where(eq(reports.id, id))
    .limit(1);

  if (!report) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <Link
          href="/reports"
          className="text-cyan-600 hover:underline text-sm font-medium"
        >
          ← Back to reports
        </Link>
        <a
          href={report.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700"
        >
          Download PDF
        </a>
      </div>
      <div className="bg-gray-100 rounded-lg overflow-hidden" style={{ minHeight: "80vh" }}>
        <iframe
          src={`${report.fileUrl}#view=FitH`}
          title={report.title}
          className="w-full h-[85vh] border-0"
        />
      </div>
    </div>
  );
}
