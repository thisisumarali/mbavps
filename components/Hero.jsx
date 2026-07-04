"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight, FaBalanceScale } from "react-icons/fa";

const SLIDES = [
  { src: "/1.jpg", alt: "Malir Bar Association - Justice" },
  { src: "/2.jpg", alt: "Malir Bar Association - Advocates" },
  { src: "/3.jpg", alt: "Malir Bar Association - Advocates" },
];

export default function Hero() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <main
      className="hero-section relative w-full overflow-hidden"
      style={{ height: "clamp(300px, 60dvh, 500px)" }}
    >
      <style>{`
        @media (min-width: 768px) {
          .hero-section {
            height: calc(100dvh - var(--header-h, 160px)) !important;
          }
        }
      `}</style>

      {/* ── Embla Carousel ── */}
      <div ref={emblaRef} className="w-full h-full">
        <div className="flex h-full">
          {SLIDES.map((slide) => (
            <div key={slide.src} className="relative flex-[0_0_100%] h-full">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Gradient overlay ── */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20 pointer-events-none" /> */}

      {/* ── Text content — centered on all screens ── */}
      {/* Heading */}
      {/* Divider */}
      {/* Description */}
      {/* CTA */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-10 md:px-16 lg:px-32">
        <Image
          src="/logo-1.png"
          width={120}
          height={120}
          alt="Malir Bar Association Logo"
          className="object-center object-cover w-14 h-14 sm:w-20 sm:h-20 md:w-[120px] md:h-[120px]"
        />
        <h1
          className="text-slate-950 font-extrabold sm:font-bold leading-tight tracking-tight drop-shadow-2xl capitalize mt-1 sm:mt-2
                text-3xl md:text-5xl lg:text-7xl
                max-w-[350px] sm:max-w-sm md:max-w-4xl text-shadow-2xs"
        >
          WELCOME TO <br />
          <span className="text-red-900 text-shadow-lg">
            MALIR&nbsp;BAR ASSOCIATION
          </span>
        </h1>

        <div className="flex mt-2 mb-2 sm:mt-3 sm:mb-3 items-center gap-3">
          <span className="w-8 sm:w-10 h-px bg-amber-900/60" />
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-900" />
          <span className="w-8 sm:w-10 h-px bg-amber-900/60" />
        </div>

        <p
          className="text-black/95 text-shadow-md leading-relaxed drop-shadow
                text-sm md:text-lg xl:text-2xl
                max-w-[220px] sm:max-w-sm md:max-w-2xl"
        >
          The Second Bar Association In Karachi, Sindh Pakistan <br />
          www.malirbarassociation.com
        </p>

      </div>

      {/* ── Prev / Next ── */}
      <button
        onClick={scrollPrev}
        aria-label="Previous slide"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10
                   w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full
                   bg-black/40 hover:bg-primary border border-white/20 hover:border-accent
                   flex items-center justify-center text-white
                   transition-all duration-200 backdrop-blur-sm"
      >
        <FaArrowLeft size={12} />
      </button>

      <button
        onClick={scrollNext}
        aria-label="Next slide"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10
                   w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full
                   bg-black/40 hover:bg-primary border border-white/20 hover:border-accent
                   flex items-center justify-center text-white
                   transition-all duration-200 backdrop-blur-sm"
      >
        <FaArrowRight size={12} />
      </button>
    </main>
  );
}
