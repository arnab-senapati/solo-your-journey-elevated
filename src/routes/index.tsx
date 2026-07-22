import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { Star, MapPin, ArrowRight } from "lucide-react";

import { SiteLayout } from "@/components/site/SiteLayout";
import { Hero } from "@/components/site/Hero";
import { SectionHeader } from "@/components/site/SectionHeader";
import { PackageCard } from "@/components/site/PackageCard";
import { DestinationCard } from "@/components/site/DestinationCard";
import { SafetySection } from "@/components/site/SafetySection";
import { CountdownBadge } from "@/components/site/CountdownBadge";
import {
  heroSlidesQuery,
  destinationsQuery,
  featuredPackagesQuery,
  womenPackagesQuery,
  categoriesQuery,
  testimonialsQuery,
  blogPostsQuery,
  faqsQuery,
  upcomingDeparturesQuery,
} from "@/lib/api/queries";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SOLO.COM — Explore the World. Discover Yourself." },
      {
        name: "description",
        content:
          "Curated small-group journeys for solo women travelers and anyone traveling with intent, ages 8 to 80. Verified safety, women-owned partners, worldwide.",
      },
      { property: "og:title", content: "SOLO.COM — Explore the World. Discover Yourself." },
      {
        property: "og:description",
        content:
          "Curated small-group journeys for solo women travelers — and for anyone traveling with intent, ages 8 to 80.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(heroSlidesQuery());
    context.queryClient.ensureQueryData(destinationsQuery());
    context.queryClient.ensureQueryData(featuredPackagesQuery());
    context.queryClient.ensureQueryData(womenPackagesQuery());
    context.queryClient.ensureQueryData(categoriesQuery());
    context.queryClient.ensureQueryData(testimonialsQuery());
    context.queryClient.ensureQueryData(blogPostsQuery());
    context.queryClient.ensureQueryData(faqsQuery());
    context.queryClient.ensureQueryData(upcomingDeparturesQuery());
  },
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout>
      <Suspense>
        <HeroWrapper />
      </Suspense>
      <Destinations />
      <UpcomingTrips />
      <WomenSpecial />
      <Categories />
      <FeaturedPackages />
      <SafetySection />
      <Testimonials />
      <BlogPreview />
      <FAQsSection />
      <Newsletter />
    </SiteLayout>
  );
}

function HeroWrapper() {
  const { data } = useSuspenseQuery(heroSlidesQuery());
  return <Hero slides={data} />;
}

function Destinations() {
  const { data } = useSuspenseQuery(destinationsQuery());
  const featured = data.filter((d) => d.featured);
  return (
    <section className="py-20 px-6">
      <div className="container-page">
        <SectionHeader
          eyebrow="Curation"
          title="Featured destinations"
          action={{ label: "All destinations", to: "/destinations" }}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.slice(0, 4).map((d) => (
            <DestinationCard key={d.id} dest={d} />
          ))}
        </div>
      </div>
    </section>
  );
}

function UpcomingTrips() {
  const { data } = useSuspenseQuery(upcomingDeparturesQuery());
  return (
    <section className="py-20 px-6 bg-sky-soft/30">
      <div className="container-page">
        <SectionHeader
          eyebrow="Departures"
          title="Upcoming trips"
          action={{ label: "All packages", to: "/packages" }}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.slice(0, 6).map(({ package: pkg, date, remaining }) => (
            <Link
              key={date.id}
              to="/packages/$slug"
              params={{ slug: pkg.slug }}
              className="group bg-white rounded-[24px] p-5 ring-1 ring-black/5 hover:shadow-luxe-sm transition-shadow flex gap-4"
            >
              <img
                src={pkg.coverImage}
                alt={pkg.title}
                width={200}
                height={200}
                loading="lazy"
                className="size-24 rounded-2xl object-cover shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="text-[11px] uppercase tracking-widest text-sky-vivid font-semibold">
                  <CountdownBadge iso={date.startDate} />
                </div>
                <h3 className="font-medium text-ocean mt-1 truncate">{pkg.title}</h3>
                <p className="text-xs text-ocean/60 mt-0.5 flex items-center gap-1">
                  <MapPin className="size-3" />
                  {pkg.destinationName}
                </p>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span
                    className={`px-2 py-0.5 rounded-full ${
                      remaining <= 2
                        ? "bg-destructive/10 text-destructive"
                        : "bg-ocean/5 text-ocean"
                    }`}
                  >
                    {remaining} seats left
                  </span>
                  <span className="text-ocean/70 font-medium">
                    ${pkg.priceFrom.toLocaleString()}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function WomenSpecial() {
  const { data } = useSuspenseQuery(womenPackagesQuery());
  return (
    <section className="py-20 px-6">
      <div className="container-page">
        <SectionHeader
          eyebrow="Women Special"
          title="Journeys made with women in mind"
          action={{ label: "See all", to: "/women" }}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.slice(0, 3).map((p) => (
            <PackageCard key={p.id} pkg={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Categories() {
  const { data } = useSuspenseQuery(categoriesQuery());
  return (
    <section className="py-20 px-6 bg-sky-soft/30">
      <div className="container-page">
        <SectionHeader eyebrow="Who we host" title="Trips for every age at the table" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {data.map((c) => (
            <Link
              key={c.slug}
              to="/categories/$slug"
              params={{ slug: c.slug }}
              className="group relative aspect-[3/4] rounded-3xl overflow-hidden ring-1 ring-black/5"
            >
              <img
                src={c.image}
                alt={c.name}
                width={400}
                height={533}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ocean/80 via-ocean/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <h3 className="font-medium">{c.name}</h3>
                <p className="text-[11px] opacity-80 line-clamp-1">{c.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedPackages() {
  const { data } = useSuspenseQuery(featuredPackagesQuery());
  return (
    <section className="py-20 px-6">
      <div className="container-page">
        <SectionHeader
          eyebrow="Popular"
          title="Signature journeys"
          action={{ label: "All packages", to: "/packages" }}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.slice(0, 6).map((p) => (
            <PackageCard key={p.id} pkg={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const { data } = useSuspenseQuery(testimonialsQuery());
  return (
    <section className="py-20 px-6 bg-sky-soft/30">
      <div className="container-page">
        <SectionHeader eyebrow="Voices" title="What our travelers say" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.slice(0, 6).map((t) => (
            <figure
              key={t.id}
              className="bg-white rounded-[24px] p-6 ring-1 ring-black/5"
            >
              <div className="flex gap-0.5 text-sky-vivid mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-3.5 ${
                      i < Math.round(t.rating) ? "fill-sky-vivid" : "opacity-30"
                    }`}
                  />
                ))}
              </div>
              <blockquote className="text-ocean text-[15px] leading-relaxed">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-4 text-xs text-ocean/60 flex items-center justify-between">
                <span>
                  {t.name}
                  {t.age ? `, ${t.age}` : ""} · {t.location}
                </span>
                {t.verified && (
                  <span className="text-[10px] uppercase tracking-widest text-sky-vivid font-semibold">
                    Verified
                  </span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogPreview() {
  const { data } = useSuspenseQuery(blogPostsQuery());
  return (
    <section className="py-20 px-6">
      <div className="container-page">
        <SectionHeader
          eyebrow="Journal"
          title="Notes from the road"
          action={{ label: "All journal entries", to: "/blog" }}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.slice(0, 3).map((b) => (
            <Link
              key={b.id}
              to="/blog/$slug"
              params={{ slug: b.slug }}
              className="group"
            >
              <div className="aspect-[4/3] rounded-[20px] overflow-hidden ring-1 ring-black/5 mb-4">
                <img
                  src={b.coverImage}
                  alt={b.title}
                  width={800}
                  height={600}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="text-[10px] uppercase tracking-widest text-sky-vivid font-semibold">
                {b.category}
              </div>
              <h3 className="font-serif text-2xl text-ocean mt-1">{b.title}</h3>
              <p className="text-sm text-ocean/60 mt-2 line-clamp-2">{b.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQsSection() {
  const { data } = useSuspenseQuery(faqsQuery());
  return (
    <section className="py-20 px-6 bg-sky-soft/30">
      <div className="container-page">
        <SectionHeader
          eyebrow="Questions"
          title="Common questions"
          action={{ label: "All FAQs", to: "/faqs" }}
        />
        <div className="grid md:grid-cols-2 gap-4">
          {data.slice(0, 6).map((f) => (
            <details
              key={f.id}
              className="group bg-white rounded-2xl p-5 ring-1 ring-black/5"
            >
              <summary className="flex justify-between items-center cursor-pointer font-medium text-ocean list-none">
                {f.question}
                <span className="text-sky-vivid transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-ocean/70 leading-relaxed">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="py-20 px-6">
      <div className="container-page">
        <div className="bg-white rounded-[32px] p-10 md:p-16 ring-1 ring-black/5 shadow-luxe-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-sky-vivid">
              Newsletter
            </span>
            <h3 className="font-serif text-3xl md:text-4xl text-ocean mt-2 max-w-lg">
              A quiet, quarterly letter from SOLO.COM.
            </h3>
            <p className="text-sm text-ocean/60 mt-2 max-w-md">
              New departures, journal entries, and the occasional field guide.
            </p>
          </div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full md:w-auto flex gap-2"
          >
            <input
              type="email"
              required
              placeholder="you@somewhere.com"
              className="w-full md:w-72 px-4 py-3 rounded-full bg-sky-soft/60 text-sm text-ocean placeholder:text-ocean/40 focus:outline-none focus:ring-2 focus:ring-sky-vivid"
            />
            <button
              type="submit"
              className="bg-ocean text-white rounded-full px-5 py-3 text-sm font-medium hover:bg-ocean/90 transition-colors inline-flex items-center gap-2"
            >
              Subscribe <ArrowRight className="size-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
