import SectionHeading from "@/common/SectionHeading";
import { PRACTICE_AREAS } from "@/data/code";
import Image from "next/image";

const ExpertiseSection = () => {
  return (
    <section className="bg-surface py-16 md:py-24 px-4 md:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <SectionHeading eyebrow="Expertise" title="Legal Practice Areas" />

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Practice list */}
          <div className="flex-1 space-y-2">
            {PRACTICE_AREAS.map((area) => {
              const Icon = area.icon;
              return (
                <div
                  key={area.title}
                  className="group flex gap-5 p-5 rounded-sm border border-transparent
                                 hover:border-accent/30 hover:bg-white hover:shadow-md
                                 transition-all duration-200"
                >
                  {/* Icon box */}
                  <div
                    className="shrink-0 w-12 h-12 rounded-sm bg-primary/10
                                      border border-primary/20 group-hover:bg-primary
                                      flex items-center justify-center transition-colors duration-200"
                  >
                    <Icon className="text-primary group-hover:text-white text-lg transition-colors duration-200" />
                  </div>
                  {/* Text */}
                  <div>
                    <h3 className="text-foreground font-bold text-base mb-1 group-hover:text-primary transition-colors duration-200">
                      {area.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Side image */}
          <div className="w-full lg:w-[40%] shrink-0 sticky top-24">
            <div className="relative h-72 lg:h-[520px] rounded-sm overflow-hidden shadow-2xl">
              <Image
                src="/law-3.jpg"
                alt="Legal Practice Areas"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/60" />
              {/* Bottom label */}
              <div className="absolute bottom-0 inset-x-0 p-5">
                <p className="text-white font-bold text-lg leading-tight">
                  Malir Bar Association
                </p>
                <p className="text-accent text-xs tracking-widest uppercase mt-1">
                  Karachi · Sindh · Pakistan
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
