import { Hero } from "@/components/hero";
import { getReports } from "@/lib/actions/reports";
import { reportsMetadata } from "@/config/metadata";
import aboutBannerImg from "@/assets/images/about-us-bg.jpg";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export const metadata = reportsMetadata;
export const dynamic = "force-dynamic";

export default async function ReportsPage() {
  const reports = await getReports();

  return (
    <>
      <Hero
        title="Reports"
        image={aboutBannerImg.src}
        links={[{ label: "reports", href: "#" }]}
        description="View and download our reports and publications."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Reports &amp; Publications
            </h2>
            <p className="text-lg text-gray-600">
              Download or preview our reports below, including the CENSCOPE Strategic Plan (2026–2031).
            </p>
          </div>

          {reports.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-600">
              <p>No report found.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {reports.map((report) => (
                <li
                  key={report.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {report.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {report.createdAt != null
                          ? formatDate(report.createdAt)
                          : "—"}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                      <a
                        href={report.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-md bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700"
                      >
                        Download PDF
                      </a>
                      <Link
                        href={`/reports/${report.id}`}
                        className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Preview
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
