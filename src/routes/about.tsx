import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import heroWomen from "@/assets/hero-women.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — SOLO.COM" },
      {
        name: "description",
        content: "SOLO.COM builds curated, safety-first small-group journeys for solo women — and for anyone traveling with intent, ages 8 to 80.",
      },
      { property: "og:title", content: "About — SOLO.COM" },
      { property: "og:description", content: "The story behind SOLO.COM." },
      { property: "og:image", content: heroWomen },
      { name: "twitter:image", content: heroWomen },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="pt-16 pb-24 px-6">
        <div className="container-page max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-sky-vivid">
            About
          </span>
          <h1 className="font-serif text-5xl md:text-6xl text-ocean mt-3 leading-tight">
            Travel with total autonomy, never alone.
          </h1>
          <div className="mt-8 text-lg text-ocean/70 leading-relaxed space-y-6">
            <p>
              SOLO.COM started as a small group of women organising trips for other women who didn't want to wait for a partner, a friend, or a group before they explored the world.
            </p>
            <p>
              We built the safety infrastructure we wished existed — 42 checks per partner, 24/7 female concierge, background-checked guides, and a private community of past travelers — and then we opened it up to anyone traveling with intent.
            </p>
            <p>
              Today we host students on their first international trip, professionals stealing back a weekend, families choosing one trip together per year, and seniors finally taking the pilgrimage they've been thinking about for a decade.
            </p>
            <p>
              We are not the biggest travel platform. We plan to stay that way.
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
