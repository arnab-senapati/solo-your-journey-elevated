import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { galleryQuery } from "@/lib/api/queries";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — SOLO.COM" },
      { name: "description", content: "Images and moments from SOLO.COM departures." },
      { property: "og:title", content: "Gallery — SOLO.COM" },
      { property: "og:description", content: "Images and moments from SOLO.COM departures." },
      { property: "og:url", content: "/gallery" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(galleryQuery());
  },
  component: GalleryPage,
});

function GalleryPage() {
  const { data } = useSuspenseQuery(galleryQuery());
  return (
    <SiteLayout>
      <section className="pt-16 pb-24 px-6">
        <div className="container-page">
          <SectionHeader eyebrow="Field images" title="Moments from the road" />
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
            {data.map((g) => (
              <figure
                key={g.id}
                className="mb-4 break-inside-avoid rounded-3xl overflow-hidden ring-1 ring-black/5"
              >
                <img
                  src={g.src}
                  alt={g.caption}
                  loading="lazy"
                  className="w-full h-auto"
                />
                <figcaption className="p-4 text-xs text-ocean/60 flex justify-between">
                  <span>{g.caption}</span>
                  {g.location && <span className="text-ocean/40">{g.location}</span>}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
