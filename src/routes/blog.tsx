import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { blogPostsQuery } from "@/lib/api/queries";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Journal — SOLO.COM" },
      {
        name: "description",
        content: "Field guides, notes from the road, and small essays from the SOLO.COM concierge team.",
      },
      { property: "og:title", content: "Journal — SOLO.COM" },
      { property: "og:description", content: "Field guides and notes from the road." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(blogPostsQuery());
  },
  component: BlogPage,
});

function BlogPage() {
  const { data } = useSuspenseQuery(blogPostsQuery());
  return (
    <SiteLayout>
      <section className="pt-16 pb-24 px-6">
        <div className="container-page">
          <SectionHeader eyebrow="Journal" title="Notes from the road" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {data.map((b) => (
              <Link key={b.id} to="/blog/$slug" params={{ slug: b.slug }} className="group">
                <div className="aspect-[4/3] rounded-[24px] overflow-hidden ring-1 ring-black/5 mb-4">
                  <img
                    src={b.coverImage}
                    alt={b.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="text-[10px] uppercase tracking-widest text-sky-vivid font-semibold">
                  {b.category} · {new Date(b.publishedAt).toLocaleDateString(undefined, { month: "short", year: "numeric" })}
                </div>
                <h3 className="font-serif text-2xl text-ocean mt-1">{b.title}</h3>
                <p className="mt-2 text-sm text-ocean/60 line-clamp-3">{b.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
