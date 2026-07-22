import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { DestinationCard } from "@/components/site/DestinationCard";
import { destinationsQuery } from "@/lib/api/queries";

export const Route = createFileRoute("/destinations")({
  head: () => ({
    meta: [
      { title: "Destinations — SOLO.COM" },
      {
        name: "description",
        content: "Every SOLO.COM destination, from Aegean islands to the Indian Himalayas.",
      },
      { property: "og:title", content: "Destinations — SOLO.COM" },
      {
        property: "og:description",
        content: "Every SOLO.COM destination, from Aegean islands to the Indian Himalayas.",
      },
      { property: "og:url", content: "/destinations" },
    ],
    links: [{ rel: "canonical", href: "/destinations" }],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(destinationsQuery());
  },
  component: DestinationsPage,
});

function DestinationsPage() {
  const { data } = useSuspenseQuery(destinationsQuery());
  return (
    <SiteLayout>
      <section className="pt-16 pb-24 px-6">
        <div className="container-page">
          <SectionHeader
            eyebrow="Atlas"
            title="Every corner we go to."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((d) => (
              <DestinationCard key={d.id} dest={d} />
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
