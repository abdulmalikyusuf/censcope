import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 py-10 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-2xl bg-cyan-600 text-white p-6 sm:p-8 relative overflow-hidden"
          style={{
            backgroundImage: "url(&quot;/footer-grainy-background.png&quot;)",
            backgroundRepeat: "repeat",
            backgroundAttachment: "fixed",
            opacity: 1,
            transform: "none",
          }}
        >
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-8">
            <Link
              className="text-white/80 hover:text-white transition-colors duration-300 text-base font-medium"
              href="/"
              data-discover="true"
            >
              Home
            </Link>
            <Link
              className="text-white/80 hover:text-white transition-colors duration-300 text-base font-medium"
              href="/about-us"
              data-discover="true"
            >
              About Us
            </Link>
            <Link
              className="text-white/80 hover:text-white transition-colors duration-300 text-base font-medium"
              href="/news"
              data-discover="true"
            >
              News
            </Link>
            <Link
              className="text-white/80 hover:text-white transition-colors duration-300 text-base font-medium"
              href="/reports"
              data-discover="true"
            >
              Reports
            </Link>
            <Link
              className="text-white/80 hover:text-white transition-colors duration-300 text-base font-medium"
              href="/our-actions"
              data-discover="true"
            >
              Our Actions
            </Link>
            <Link
              className="text-white/80 hover:text-white transition-colors duration-300 text-base font-medium"
              href="/support-us"
              data-discover="true"
            >
              Support Us
            </Link>
          </div>
          <div className="h-px w-full bg-white/10 mb-8"></div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <Link href="/" className="hover:opacity-80 transition-opacity">
            
            </Link>
            <p className="text-center text-white/60 text-base">
              © {new Date().getFullYear()} Center for Social Cohesion, Peace and Empowerment (CENSCOPE). All rights
              reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://x.com/NigeriaJFP"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="text-white/60 hover:text-[#1DA1F2] transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-twitter w-5 h-5"
                  aria-hidden="true"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/nigeria-jubilee-fellows-programme"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-white/60 hover:text-[#0077B5] transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-linkedin w-5 h-5"
                  aria-hidden="true"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@undp_nigeria/search?query=njfp"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-white/60 hover:text-[#FF0000] transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-youtube w-5 h-5"
                  aria-hidden="true"
                >
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                  <path d="m10 15 5-3-5-3z"></path>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/undpnigeria/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/60 hover:text-[#E4405F] transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-instagram w-5 h-5"
                  aria-hidden="true"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

