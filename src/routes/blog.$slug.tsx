import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/SiteLayout";
import { blogPostQuery } from "@/lib/api/queries";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params, context }) => {
    const post = await context.queryClient.ensureQueryData(blogPostQuery(params.slug));
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found — SOLO.COM" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData;
    const title = `${p.title} — SOLO.COM Journal`;
    return {
      meta: [
        { title },
        { name: "description", content: p.excerpt },
        { property: "og:title", content: title },
        { property: "og:description", content: p.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:image", content: p.coverImage },
        { name: "twitter:image", content: p.coverImage },
        { property: "og:url", content: `/blog/${p.slug}` },
      ],
      links: [{ rel: "canonical", href: `/blog/${p.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: p.title,
            image: p.coverImage,
            datePublished: p.publishedAt,
            author: { "@type": "Person", name: p.author },
          }),
        },
      ],
    };
  },
  component: BlogPostPage,
  notFoundComponent: () => (
    <SiteLayout>
      <section className="container-page py-24 text-center">
        <h1 className="font-serif text-4xl text-ocean">Post not found</h1>
        <Link to="/blog" className="mt-6 inline-block rounded-full bg-ocean text-white px-5 py-2.5 text-sm">
          Back to journal
        </Link>
      </section>
    </SiteLayout>
  ),
});

function BlogPostPage() {
  const params = Route.useParams();
  const { data: p } = useSuspenseQuery(blogPostQuery(params.slug));
  if (!p) return null;

  return (
    <SiteLayout>
      <article className="pt-8 pb-24 px-6">
        <div className="container-page max-w-3xl">
          <nav className="text-[11px] uppercase tracking-widest text-ocean/50 mb-6">
            <Link to="/blog" className="hover:text-ocean">Journal</Link>
            <span className="mx-2">/</span>
            <span className="text-ocean">{p.category}</span>
          </nav>
          <h1 className="font-serif text-4xl md:text-6xl text-ocean leading-tight">
            {p.title}
          </h1>
          <div className="mt-4 text-sm text-ocean/60">
            {p.author} · {new Date(p.publishedAt).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
          </div>
          <div className="mt-8 aspect-[16/9] rounded-[24px] overflow-hidden ring-1 ring-black/5">
            <img src={p.coverImage} alt={p.title} className="h-full w-full object-cover" />
          </div>
          <div className="mt-10 prose prose-neutral max-w-none">
            {p.body.split("\n\n").map((para, i) => (
              <p key={i} className="text-ocean/80 leading-relaxed text-lg mb-6">
                {para}
              </p>
            ))}
          </div>
        </div>
      </article>
    </SiteLayout>
  );
}
