import { createFileRoute, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PackageCard } from "@/components/site/PackageCard";
import { categoryQuery, packagesByCategoryQuery } from "@/lib/api/queries";

export const Route = createFileRoute("/categories/$slug")({
  loader: async ({ params, context }) => {
    const [cat] = await Promise.all([
      context.queryClient.ensureQueryData(categoryQuery(params.slug)),
      context.queryClient.ensureQueryData(packagesByCategoryQuery(params.slug)),
    ]);
    if (!cat) throw notFound();
    return cat;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found — SOLO.COM" }, { name: "robots", content: "noindex" }] };
    }
    const c = loaderData;
    const title = `${c.name} — SOLO.COM`;
    return {
      meta: [
        { title },
        { name: "description", content: c.description },
        { property: "og:title", content: title },
        { property: "og:description", content: c.description },
        { property: "og:image", content: c.image },
        { name: "twitter:image", content: c.image },
        { property: "og:url", content: `/categories/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/categories/${params.slug}` }],
    };
  },
  component: CategoryPage,
  notFoundComponent: () => (
    <SiteLayout>
      <section className="container-page py-24 text-center">
        <h1 className="font-serif text-4xl text-ocean">Category not found</h1>
      </section>
    </SiteLayout>
  ),
});

function CategoryPage() {
  const params = Route.useParams();
  const { data: cat } = useSuspenseQuery(categoryQuery(params.slug));
  const { data: pkgs } = useSuspenseQuery(packagesByCategoryQuery(params.slug));

  if (!cat) return null;

  return (
    <SiteLayout>
      <section className="pt-8 pb-16 px-6">
        <div className="container-page">
          <div className="relative rounded-[32px] overflow-hidden ring-1 ring-black/5 h-[360px] md:h-[440px]">
            <img src={cat.image} alt={cat.name} className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ocean/70 via-ocean/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 text-white">
              <span className="text-[11px] uppercase tracking-[0.2em] bg-white/15 backdrop-blur-md rounded-full px-3 py-1 ring-1 ring-white/25">
                {cat.name}
              </span>
              <h1 className="font-serif text-4xl md:text-5xl mt-3">{cat.tagline}</h1>
              <p className="mt-2 text-white/85 max-w-2xl">{cat.description}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="container-page">
          {pkgs.length === 0 ? (
            <p className="text-ocean/60">
              No departures in this category yet — check back soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {pkgs.map((p) => (
                <PackageCard key={p.id} pkg={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
