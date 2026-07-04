import { ABOUT_POINTS } from "@/data/code";
import Link from "next/link";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

const page = () => {
  return (
    <section className="bg-white py-14 md:py-20 px-4 md:px-10 lg:px-20 border-b border-accent/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-3">
          <p className="text-accent text-xs font-bold uppercase tracking-[0.3em]">
            About
          </p>
          <span className="flex-1 h-px bg-accent/30 max-w-[180px]" />
        </div>

        <h2 className="text-foreground text-2xl md:text-3xl font-bold uppercase tracking-wide mb-8">
          Malir Bar Association
        </h2>

        <div className="flex flex-col md:flex-row gap-10 md:gap-16">
          {/* Left column */}
          <div className="flex-1 space-y-6">
            <p className="text-gray-600 text-sm md:text-[15px] leading-relaxed">
              The Malir Bar Association is a statutory regulatory body of lawyers in
              Malir for safeguarding the rights, interests, and privileges of
              practicing lawyers, within the province of Sindh, Pakistan.
            </p>

            <ul className="space-y-3">
              {ABOUT_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <FaCheckCircle className="text-accent mt-0.5 shrink-0 text-base" />
                  <span className="text-gray-600 text-sm md:text-[15px] leading-relaxed">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right column */}
          <div className="md:w-80 shrink-0 flex flex-col gap-5 justify-start">
            <p className="text-gray-600 text-sm md:text-[15px] leading-relaxed">
              Advocates licensed and regulated by other provincial bar councils
              can also practice in Malir, subject to the rules and regulations
              of the Council.
            </p>

            <Link
              href="/members"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm
                             bg-primary hover:bg-primary/90 text-white font-semibold text-sm tracking-wide
                             border border-accent/30 hover:border-accent shadow
                             transition-all duration-200 group w-fit"
            >
              Advocate Verification
              <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
