import type { Metadata } from "next";
import { getReports } from "@/lib/actions/reports";
import { ReportUploadForm } from "./report-upload-form";
import { ReportRow } from "./report-row";

export const metadata: Metadata = {
  title: "Reports",
};

export default async function AdminReportsPage() {
  const reports = await getReports();

  return (
    <div className="relative mx-auto mt-24 max-lg:max-w-2xl">
      <div className="line-y px-4 py-2 sm:px-2">
        <h2 className="max-w-3xl text-3xl font-medium tracking-tight text-pretty md:text-[2.5rem]/14">
          PDF reports
        </h2>
        <p className="mt-4 max-w-2xl text-base/7 text-gray-600">
          Upload PDF reports. They will appear on the public Reports page where visitors can preview or download them.
        </p>
      </div>

      <ReportUploadForm />

      <div className="mt-10">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Uploaded reports</h3>
        {reports.length === 0 ? (
          <p className="text-sm text-gray-500">No reports yet. Upload a PDF above.</p>
        ) : (
          <ul className="space-y-2">
            {reports.map((report) => (
              <ReportRow key={report.id} report={report} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
