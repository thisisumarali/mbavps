import SectionHeading from "@/common/SectionHeading";
import { CABINET_MEMBERS } from "@/data/code";
import Image from "next/image";

const CabinetSection = () => {
  return (
    <section className="bg-white py-16 md:py-24 px-4 md:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Managing"
          title="Members Managing Committee Malir Bar Association"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 justify-items-center">
          {CABINET_MEMBERS.map((member, index) => (
            <div
              key={`${member.name}-${index}`}
              className="flex flex-col items-center text-center"
            >
              <div className="relative w-36 h-40 md:w-44 md:h-52 rounded-sm overflow-hidden shadow-lg ring-1 ring-accent/20 mb-4 group-hover:shadow-xl group-hover:ring-accent/50 transition-all duration-300">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary" />
              </div>

              <p className="text-foreground font-bold text-sm leading-snug">
                {member.name}
              </p>

              <p className="text-accent text-[11px] mt-0.5">
                Malir Bar Association
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CabinetSection;
