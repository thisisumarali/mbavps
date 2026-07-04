import SectionHeading from "@/common/SectionHeading";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export const NewsSection= () => {
  return (
    <section className="bg-white py-16 md:py-20 px-4 md:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto">
        {/* Header row */}
        <div className="flex items-end justify-between mb-10">
          <SectionHeading eyebrow="Latest" title="News & Notices" />
          <Link
            href="/news"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-sm
                   border border-primary text-primary hover:bg-primary hover:text-white
                   font-semibold text-sm tracking-wide transition-all duration-200 group shrink-0 mb-12"
          >
            View All
            <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        {/* News cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              date: "May 05, 2026",
              tag: "Notice",
              title: "Annual General Meeting – Schedule Announced",
              excerpt:
                "The Executive Committee has announced the date and venue for the upcoming Annual General Meeting of Malir Bar Association.",
            },
            {
              date: "Apr 28, 2026",
              tag: "News",
              title: "New Membership Registration Drive Launched",
              excerpt:
                "Malir Bar Association has opened fresh registrations for advocates seeking membership for the year 2026–27.",
            },
            {
              date: "Apr 15, 2026",
              tag: "Notice",
              title: "Bar Room Renovation – Temporary Closure",
              excerpt:
                "Bar Room No. 3 will remain closed from April 20 to May 10 due to ongoing renovation work. Members are advised accordingly.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="group border border-gray-100 hover:border-accent/30 rounded-sm
                     hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              {/* Top accent bar */}
              <div className="h-1 bg-gradient-to-r from-primary via-accent to-secondary" />

              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest
                               bg-primary/10 text-primary px-2 py-0.5 rounded-sm"
                  >
                    {item.tag}
                  </span>
                  <span className="text-gray-400 text-xs">{item.date}</span>
                </div>
                <h3
                  className="text-foreground font-bold text-sm leading-snug mb-2
                           group-hover:text-primary transition-colors duration-200"
                >
                  {item.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {item.excerpt}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile view all button */}
        <div className="mt-8 flex justify-center md:hidden">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-sm
                   bg-primary text-white font-semibold text-sm tracking-wide
                   hover:bg-primary/90 border border-accent/30 transition-all duration-200 group"
          >
            View All News
            <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </section>
  );
};
