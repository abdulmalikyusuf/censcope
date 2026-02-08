import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export function CTAButtons() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
        <Link
          href="/about-us"
          className="group w-full md:w-auto px-8 py-4 bg-cyan-600 text-white font-bold text-lg rounded-md hover:bg-cyan-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-3"
        >
          <span>Who We Are</span>
          <FaArrowRight className="transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          href="/our-actions"
          className="group w-full md:w-auto px-8 py-4 bg-white text-cyan-600 border-2 border-cyan-600 font-bold text-lg rounded-md hover:bg-cyan-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-3"
        >
          <span>What We Do</span>
          <FaArrowRight className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
