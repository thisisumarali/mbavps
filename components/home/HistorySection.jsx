import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const HistorySection = () => {
  return (
    <section className="bg-white py-16 md:py-24 px-4 md:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">
          {/* Image */}
          <div className="relative w-full md:w-[45%] shrink-0">
            <div className="relative h-72 md:h-[420px] rounded-sm overflow-hidden shadow-2xl">
              <Image
                src="/law-2.jpg"
                alt="History of Malir Bar Association"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent" />
            </div>
            {/* Floating year badge */}
            <div
              className="absolute -bottom-5 -right-5 hidden md:flex flex-col items-center justify-center
                              w-24 h-24 rounded-full bg-primary border-4 border-white shadow-xl"
            >
              <span className="text-accent font-bold text-lg leading-none">
                Est.
              </span>
              <span className="text-white font-bold text-base">1947</span>
            </div>
          </div>

          {/* Text */}
          <div className="flex-1">
            <p className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-2">
              Our Roots
            </p>
            <h2 className="text-foreground text-3xl md:text-4xl font-bold leading-tight mb-4">
              History of Malir Bar Association
            </h2>
            <div className="w-12 h-1 bg-accent rounded mb-6" />
            <div className="space-y-4 text-gray-600 text-sm md:text-[15px] leading-relaxed">
              <p>
                The Malir Bar Association was established at the time of
                Pakistan's independence, with a founding mission to protect and
                advance the rights of legal practitioners in the Malir district
                of Karachi, Sindh. Rooted in the rich tradition of the
                subcontinent's legal heritage, the Association has grown from a
                small gathering of dedicated advocates to a robust statutory
                body.
              </p>
              <p>
                Over the decades, the Association has played a pivotal role in
                shaping the legal landscape of Malir, advocating for judicial
                reforms, access to justice, and the professional welfare of its
                members. Its members have consistently upheld the rule of law,
                contributing to landmark cases and community legal education.
              </p>
              <p>
                Today, the Malir Bar Association stands as a cornerstone
                institution within Sindh's legal fraternity, continuing its
                legacy of integrity, service, and commitment to justice for all.
              </p>
            </div>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-sm
                           bg-primary text-white font-semibold text-sm tracking-wide
                           hover:bg-primary/90 border border-accent/30 hover:border-accent
                           transition-all duration-200 group"
            >
              Read More
              <FaArrowRight className="text-accent group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
