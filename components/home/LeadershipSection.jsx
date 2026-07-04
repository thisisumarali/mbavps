import SectionHeading from "@/common/SectionHeading";
import { LEADERS } from "@/data/code";
import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";

/* ─── Leader Card ───────────────────────────────────── */
function LeaderCard({ leader, reversed }) {
  return (
    <div
      className={`flex flex-col ${
        reversed ? "md:flex-row-reverse" : "md:flex-row"
      } gap-8 md:gap-14 items-start`}
    >
      {/* Photo + name block */}
      <div className="flex flex-col items-center gap-4 w-full md:w-64 shrink-0">
        <div
          className="relative w-48 h-56 md:w-56 md:h-64 rounded-sm overflow-hidden
                        border-4 border-surface shadow-xl ring-1 ring-accent/20"
        >
          <Image
            src={leader.image}
            alt={leader.name}
            fill
            className="object-cover object-top"
          />
          <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary" />
        </div>
        <div className="text-center">
          <p className="text-foreground font-bold text-base leading-tight">
            {leader.name}
          </p>
          <p className="text-primary text-xs font-semibold uppercase tracking-widest mt-1">
            {leader.role}
          </p>
          <p className="text-accent text-xs mt-0.5">Malir Bar Association</p>
        </div>
      </div>

      {/* Message block */}
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-4">
          <FaQuoteLeft className="text-accent/50 text-3xl shrink-0" />
          <h3 className="text-primary text-xl md:text-2xl font-bold">
            {leader.roleLabel}
          </h3>
        </div>
        <div className="space-y-3 text-gray-600 text-sm md:text-[15px] leading-relaxed">
          {leader.message.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        <p className="mt-5 text-gray-500 text-sm italic">{leader.closing}</p>
        <p className="text-foreground font-semibold text-sm mt-1">
          {leader.name}
        </p>
        <p className="text-primary text-xs">
          {leader.role}, Malir Bar Association
        </p>
      </div>
    </div>
  );
}

const LeadershipSection = () => {
  return (
    <section className="bg-surface py-16 md:py-24 px-4 md:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Leadership"
          title="Messages from Our Leaders"
        />
        <div className="space-y-16 md:space-y-24">
          {LEADERS.map((leader, i) => (
            <div key={leader.name}>
              <LeaderCard leader={leader} reversed={i % 2 !== 0} />

              {i < LEADERS.length - 1 && (
                <div className="mt-16 border-t border-dashed border-accent/30" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;
