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
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", travelers: 1, notes: "" });

  const handleWhatsAppBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.error("Please provide your name and phone number.");
      return;
    }
    const dateObj = pkg!.availableDates.find((d) => d.id === selectedDate);
    const dateFormatted = dateObj 
      ? `${new Date(dateObj.startDate).toLocaleDateString()} — ${new Date(dateObj.endDate).toLocaleDateString()}` 
      : "Any";
    
    const message = `*New Booking Enquiry*\n\n*Package:* ${pkg!.title}\n*Date:* ${dateFormatted}\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email || 'N/A'}\n*Travelers:* ${formData.travelers}\n*Notes:* ${formData.notes || 'None'}\n\nI'd like to proceed with the booking!`;
    
    window.open(`https://wa.me/917384708532?text=${encodeURIComponent(message)}`, '_blank');
  };

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
                  ₹{pkg.priceFrom.toLocaleString()}
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

              {!showBookingForm ? (
                <>
                  <button
                    onClick={() => setShowBookingForm(true)}
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
                </>
              ) : (
                <form onSubmit={handleWhatsAppBooking} className="mt-5 space-y-3 bg-sky-soft/30 p-5 rounded-2xl ring-1 ring-black/5">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-sm font-medium text-ocean">Your Details</h3>
                    <button type="button" onClick={() => setShowBookingForm(false)} className="text-ocean/50 hover:text-ocean"><X className="size-4" /></button>
                  </div>
                  <input required type="text" placeholder="Full Name *" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full text-sm px-3 py-2.5 rounded-xl ring-1 ring-black/10 focus:ring-sky-vivid outline-none" />
                  <input required type="tel" placeholder="Phone Number *" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full text-sm px-3 py-2.5 rounded-xl ring-1 ring-black/10 focus:ring-sky-vivid outline-none" />
                  <input type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full text-sm px-3 py-2.5 rounded-xl ring-1 ring-black/10 focus:ring-sky-vivid outline-none" />
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label className="text-[10px] uppercase font-medium text-ocean/50 ml-1">Travelers</label>
                      <input type="number" min="1" value={formData.travelers} onChange={e => setFormData({...formData, travelers: parseInt(e.target.value) || 1})} className="w-full text-sm px-3 py-2 mt-1 rounded-xl ring-1 ring-black/10 focus:ring-sky-vivid outline-none" />
                    </div>
                  </div>
                  <textarea placeholder="Special Requests / Notes" value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} className="w-full text-sm px-3 py-2.5 rounded-xl ring-1 ring-black/10 focus:ring-sky-vivid outline-none resize-none h-20" />
                  <button type="submit" className="w-full bg-[#25D366] text-white rounded-full py-3 text-sm font-medium hover:bg-[#20bd5a] transition-colors flex items-center justify-center gap-2 mt-2 shadow-[0_4px_14px_0_rgba(37,211,102,0.2)]">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" /></svg>
                    Send Booking via WhatsApp
                  </button>
                </form>
              )}
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
