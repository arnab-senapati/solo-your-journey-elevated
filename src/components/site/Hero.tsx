import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import type { HeroSlide } from "@/lib/api/types";
import { HeroSearch } from "./HeroSearch";

export function Hero({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 6000);
    return () => clearInterval(id);
  }, [slides.length]);

  const slide = slides[index];

  return (
    <section className="pt-8 pb-16 px-6">
      <div className="container-page">
        <div className="relative">
          <div className="w-full h-[520px] md:h-[640px] rounded-[32px] overflow-hidden ring-1 ring-black/5 relative">
            {slides.map((s, i) => (
              <img
                key={s.id}
                src={s.image}
                alt={s.heading}
                width={1920}
                height={1080}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-out ${
                  i === index ? "opacity-100" : "opacity-0"
                }`}
                loading={i === 0 ? "eager" : "lazy"}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-ocean/40 via-ocean/10 to-transparent" />
            <div className="absolute left-8 right-8 bottom-24 md:bottom-32 md:left-12 md:right-12 max-w-3xl text-white">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md px-3 py-1 text-[11px] uppercase tracking-[0.2em] mb-4 ring-1 ring-white/25">
                <span className="size-1.5 rounded-full bg-sky-vivid" />
                {slide.eyebrow}
              </div>
              <h2 className="font-serif text-3xl md:text-5xl leading-tight text-balance drop-shadow-sm">
                {slide.heading}
              </h2>
              <p className="mt-3 text-sm md:text-base text-white/85 max-w-xl">
                {slide.subheading}
              </p>
              <Link
                to={slide.ctaHref}
                className="mt-6 inline-flex items-center gap-2 bg-white text-ocean rounded-full px-5 py-2.5 text-sm font-medium hover:bg-sky-soft transition-colors"
              >
                {slide.ctaLabel}
                <span aria-hidden>→</span>
              </Link>
            </div>

            <div className="absolute top-6 right-6 flex gap-1.5">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-8 bg-white" : "w-4 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full max-w-5xl px-4">
            <HeroSearch />
          </div>
        </div>

        <div className="mt-24 text-center">
          <h1 className="font-serif text-4xl md:text-6xl text-ocean text-balance leading-tight max-w-[22ch] mx-auto">
            Travel with total autonomy, never alone.
          </h1>
          <p className="mt-4 text-ocean/60 max-w-xl mx-auto">
            Curated small-group journeys for solo women — and for anyone traveling
            with intent, from age 8 to 80.
          </p>
        </div>
      </div>
    </section>
  );
}
