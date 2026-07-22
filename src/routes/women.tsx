import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { PackageCard } from "@/components/site/PackageCard";
import { SafetySection } from "@/components/site/SafetySection";
import { womenPackagesQuery } from "@/lib/api/queries";
import heroWomen from "@/assets/hero-women.jpg";

export const Route = createFileRoute("/women")({
  head: () => ({
    meta: [
      { title: "Women Special — SOLO.COM" },
      {
        name: "description",
        content:
          "Small-group journeys designed and hosted by women, with vetted accommodations and 24/7 female concierge support.",
      },
      { property: "og:title", content: "Women Special — SOLO.COM" },
      {
        property: "og:description",
        content: "Small-group journeys designed and hosted by women.",
      },
      { property: "og:image", content: heroWomen },
      { name: "twitter:image", content: heroWomen },
      { property: "og:url", content: "/women" },
    ],
    links: [{ rel: "canonical", href: "/women" }],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(womenPackagesQuery());
  },
  component: WomenPage,
});

function WomenPage() {
  const { data } = useSuspenseQuery(womenPackagesQuery());

  return (
    <SiteLayout>
      <section className="pt-8 pb-16 px-6">
        <div className="container-page">
          <div className="relative rounded-[32px] overflow-hidden ring-1 ring-black/5 h-[420px] md:h-[560px]">
            <img src={heroWomen} alt="A woman traveling alone" className="absolute inset-0 h-full w-full object-cover" width={1920} height={1080} />
            <div className="absolute inset-0 bg-gradient-to-t from-ocean/70 via-ocean/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-16 text-white max-w-3xl">
              <span className="text-[11px] uppercase tracking-[0.2em] bg-white/15 backdrop-blur-md rounded-full px-3 py-1 ring-1 ring-white/25">
                Women Special
              </span>
              <h1 className="font-serif text-4xl md:text-6xl mt-4 leading-tight">
                Travel that meets you where you are.
              </h1>
              <p className="mt-3 text-white/85 max-w-xl">
                Designed by women, hosted by women, vetted for women. Small groups,
                women-owned partners, and a 24/7 female concierge.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-12">
        <div className="container-page">
          <SectionHeader
            eyebrow="Departures"
            title="Trips for women"
            action={{ label: "All packages", to: "/packages" }}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((p) => (
              <PackageCard key={p.id} pkg={p} />
            ))}
          </div>
        </div>
      </section>

      <SafetySection />
    </SiteLayout>
  );
}
