import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Star, MapPin, Clock, Users, Check, X, Info } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { SiteLayout } from "@/components/site/SiteLayout";
import { packageQuery } from "@/lib/api/queries";

export const Route = createFileRoute("/packages/$slug")({
  loader: async ({ params, context }) => {
    const pkg = await context.queryClient.ensureQueryData(packageQuery(params.slug));
    if (!pkg) throw notFound();
    return pkg;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Package not found — SOLO.COM" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const p = loaderData;
    const title = `${p.title} — SOLO.COM`;
    const desc = p.overview.slice(0, 155);
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { property: "og:image", content: p.coverImage },
        { name: "twitter:image", content: p.coverImage },
        { property: "og:url", content: `/packages/${p.slug}` },
      ],
      links: [{ rel: "canonical", href: `/packages/${p.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.title,
            description: p.overview,
            image: p.coverImage,
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: p.rating,
              reviewCount: p.reviewCount,
            },
            offers: {
              "@type": "Offer",
              price: p.priceFrom,
              priceCurrency: p.currency,
            },
          }),
        },
      ],
    };
  },
  component: PackageDetailPage,
  notFoundComponent: () => (
    <SiteLayout>
      <section className="container-page py-24 text-center">
        <h1 className="font-serif text-4xl text-ocean">Package not found</h1>
        <p className="mt-3 text-ocean/60">This departure has moved or ended.</p>
        <Link
          to="/packages"
          className="mt-6 inline-block rounded-full bg-ocean text-white px-5 py-2.5 text-sm"
        >
          Browse all packages
        </Link>
      </section>
    </SiteLayout>
  ),
});

function PackageDetailPage() {
  const params = Route.useParams();
  const { data: pkg } = useSuspenseQuery(packageQuery(params.slug));
  const [activeImage, setActiveImage] = useState(0);
  const [selectedDate, setSelectedDate] = useState(pkg!.availableDates[0]?.id);

  if (!pkg) return null;
  const gallery = pkg.gallery.length ? pkg.gallery : [pkg.coverImage];

  return (
    <SiteLayout>
      {/* Hero gallery */}
      <section className="pt-8 pb-6 px-6">
        <div className="container-page">
          <nav className="text-[11px] uppercase tracking-widest text-ocean/50 mb-4">
            <Link to="/packages" className="hover:text-ocean">Packages</Link>
            <span className="mx-2">/</span>
            <span className="text-ocean">{pkg.title}</span>
          </nav>
          <div className="grid md:grid-cols-3 gap-3">
            <div className="md:col-span-2 aspect-[16/10] overflow-hidden rounded-[24px] ring-1 ring-black/5 bg-sky-soft">
              <img
                src={gallery[activeImage]}
                alt={pkg.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 md:grid-cols-1 gap-3">
              {gallery.slice(0, 3).map((g, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`aspect-[4/3] md:aspect-auto md:h-full overflow-hidden rounded-[20px] ring-1 transition-all ${
                    activeImage === i ? "ring-sky-vivid ring-2" : "ring-black/5 hover:ring-black/20"
                  }`}
                >
                  <img src={g} alt="" loading="lazy" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="container-page grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-12">
            <header>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {pkg.isWomenSpecial && (
                  <span className="px-2.5 py-1 rounded-full bg-ocean text-white text-[10px] font-medium uppercase tracking-wider">
                    Women Special
                  </span>
                )}
                <span className="px-2.5 py-1 rounded-full bg-sky-soft text-ocean text-[10px] font-medium uppercase tracking-wider">
                  {pkg.travelType}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-sky-soft text-ocean text-[10px] font-medium uppercase tracking-wider">
                  {pkg.difficulty}
                </span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl text-ocean leading-tight">
                {pkg.title}
              </h1>
              <p className="mt-2 text-ocean/60">{pkg.subtitle}</p>
              <div className="mt-5 flex flex-wrap gap-6 text-sm text-ocean/70">
                <span className="inline-flex items-center gap-1.5"><MapPin className="size-4" /> {pkg.destinationName}</span>
                <span className="inline-flex items-center gap-1.5"><Clock className="size-4" /> {pkg.durationDays}D / {pkg.durationNights}N</span>
                <span className="inline-flex items-center gap-1.5"><Star className="size-4 fill-sky-vivid text-sky-vivid" /> {pkg.rating} ({pkg.reviewCount} reviews)</span>
              </div>
            </header>

            <Block title="Overview">
              <p className="text-ocean/70 leading-relaxed">{pkg.overview}</p>
            </Block>

            <Block title="Highlights">
              <ul className="grid sm:grid-cols-2 gap-3">
                {pkg.highlights.map((h) => (
                  <li key={h} className="flex gap-2 text-sm text-ocean/80">
                    <Check className="size-4 text-sky-vivid mt-0.5 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </Block>

            <Block title="Itinerary">
              <div className="space-y-2">
                {pkg.itinerary.map((d) => (
                  <details key={d.day} className="group bg-white rounded-2xl ring-1 ring-black/5">
                    <summary className="cursor-pointer list-none p-4 flex items-center gap-4">
                      <span className="size-8 rounded-full bg-sky-soft text-ocean text-xs font-medium flex items-center justify-center shrink-0">
                        {d.day}
                      </span>
                      <span className="font-medium text-ocean flex-1">{d.title}</span>
                      <span className="text-sky-vivid transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="px-4 pb-4 pl-16 text-sm text-ocean/70">{d.summary}</p>
                  </details>
                ))}
              </div>
            </Block>

            <div className="grid md:grid-cols-2 gap-6">
              <Block title="What's included">
                <ul className="space-y-2">
                  {pkg.included.map((i) => (
                    <li key={i} className="flex gap-2 text-sm text-ocean/80">
                      <Check className="size-4 text-sky-vivid mt-0.5 shrink-0" />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </Block>
              <Block title="Not included">
                <ul className="space-y-2">
                  {pkg.excluded.map((i) => (
                    <li key={i} className="flex gap-2 text-sm text-ocean/60">
                      <X className="size-4 mt-0.5 shrink-0" />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </Block>
            </div>

            <Block title="Stay, meals and transport">
              <dl className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-[10px] uppercase tracking-widest text-ocean/40">Hotel</dt>
                  <dd className="text-ocean mt-1">{pkg.hotel}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-widest text-ocean/40">Meals</dt>
                  <dd className="text-ocean mt-1">{pkg.meals}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-widest text-ocean/40">Transport</dt>
                  <dd className="text-ocean mt-1">{pkg.transport}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-widest text-ocean/40">Pickup / Drop</dt>
                  <dd className="text-ocean mt-1">{pkg.pickup} → {pkg.drop}</dd>
                </div>
              </dl>
            </Block>

            <Block title="Cancellation & refunds">
              <p className="text-sm text-ocean/70"><strong className="text-ocean">Cancellation:</strong> {pkg.cancellationPolicy}</p>
              <p className="text-sm text-ocean/70 mt-2"><strong className="text-ocean">Refunds:</strong> {pkg.refundPolicy}</p>
            </Block>

            {pkg.faqs.length > 0 && (
              <Block title="Questions on this trip">
                <div className="space-y-2">
                  {pkg.faqs.map((f) => (
                    <details key={f.q} className="group bg-white rounded-2xl p-4 ring-1 ring-black/5">
                      <summary className="cursor-pointer list-none flex justify-between font-medium text-ocean">
                        {f.q}
                        <span className="text-sky-vivid transition-transform group-open:rotate-45">+</span>
                      </summary>
                      <p className="mt-3 text-sm text-ocean/70">{f.a}</p>
                    </details>
                  ))}
                </div>
              </Block>
            )}
          </div>

          {/* Sticky booking card */}
          <aside className="md:sticky md:top-24 h-fit space-y-4">
            <div className="bg-white rounded-[24px] p-6 ring-1 ring-black/5 shadow-luxe-sm">
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] uppercase tracking-widest text-ocean/40">From</span>
                <span className="font-serif text-3xl text-ocean">
                  ${pkg.priceFrom.toLocaleString()}
                </span>
                <span className="text-xs text-ocean/50">per person</span>
              </div>

              <div className="mt-5">
                <label className="text-[10px] uppercase tracking-widest text-ocean/40">
                  Available dates
                </label>
                <div className="mt-2 space-y-2">
                  {pkg.availableDates.map((d) => {
                    const remaining = d.totalSeats - d.bookedSeats;
                    const isSelected = selectedDate === d.id;
                    return (
                      <button
                        key={d.id}
                        onClick={() => setSelectedDate(d.id)}
                        className={`w-full text-left rounded-2xl p-3 ring-1 transition-all ${
                          isSelected
                            ? "ring-sky-vivid bg-sky-soft/40"
                            : "ring-black/5 hover:ring-ocean/20"
                        }`}
                      >
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-medium text-ocean">
                            {new Date(d.startDate).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                            })}{" "}
                            —{" "}
                            {new Date(d.endDate).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                          <span className={`text-xs ${remaining <= 2 ? "text-destructive" : "text-ocean/60"}`}>
                            {remaining} left
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() =>
                  toast.info("Booking coming soon", {
                    description: "Our booking flow arrives with the FastAPI backend. For now we'll take enquiries via WhatsApp.",
                  })
                }
                className="mt-5 w-full bg-ocean text-white rounded-full py-3 text-sm font-medium hover:bg-ocean/90 transition-colors"
              >
                Reserve this trip
              </button>
              <a
                href={`https://wa.me/917384708532?text=${encodeURIComponent(
                  `Hello SOLO.COM, I'd like to enquire about "${pkg.title}".`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="mt-2 w-full inline-block text-center bg-transparent text-ocean rounded-full py-3 text-sm font-medium ring-1 ring-ocean/10 hover:bg-sky-soft/50 transition-colors"
              >
                Enquire on WhatsApp
              </a>
              <p className="mt-3 text-[11px] text-ocean/50 flex items-start gap-1.5">
                <Info className="size-3 mt-0.5 shrink-0" />
                Free cancellation window applies. See policy above.
              </p>
            </div>

            <div className="bg-sky-soft/50 rounded-2xl p-5 text-sm text-ocean/80 flex gap-3">
              <Users className="size-5 text-sky-vivid mt-0.5 shrink-0" />
              <div>
                <p className="font-medium text-ocean">Small groups by design</p>
                <p className="text-xs text-ocean/60 mt-1">
                  Most departures cap at 8–12 travelers. Larger family and student groups get their own guide team.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-serif text-2xl text-ocean mb-4">{title}</h2>
      {children}
    </section>
  );
}
