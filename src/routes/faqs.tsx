import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { faqsQuery } from "@/lib/api/queries";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs — SOLO.COM" },
      { name: "description", content: "Common questions about SOLO.COM departures, safety, and booking." },
      { property: "og:title", content: "FAQs — SOLO.COM" },
      { property: "og:description", content: "Common questions about SOLO.COM." },
      { property: "og:url", content: "/faqs" },
    ],
    links: [{ rel: "canonical", href: "/faqs" }],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(faqsQuery());
  },
  component: FAQsPage,
});

function FAQsPage() {
  const { data } = useSuspenseQuery(faqsQuery());
  const grouped = useMemo(() => {
    const g = new Map<string, typeof data>();
    data.forEach((f) => {
      const arr = g.get(f.category) ?? [];
      arr.push(f);
      g.set(f.category, arr);
    });
    return Array.from(g.entries());
  }, [data]);

  return (
    <SiteLayout>
      <section className="pt-16 pb-24 px-6">
        <div className="container-page max-w-3xl">
          <SectionHeader eyebrow="Support" title="Common questions" />
          <div className="space-y-10">
            {grouped.map(([cat, items]) => (
              <div key={cat}>
                <h2 className="font-serif text-2xl text-ocean mb-3">{cat}</h2>
                <div className="space-y-2">
                  {items.map((f) => (
                    <details key={f.id} className="group bg-white rounded-2xl p-5 ring-1 ring-black/5">
                      <summary className="flex justify-between items-center cursor-pointer font-medium text-ocean list-none">
                        {f.question}
                        <span className="text-sky-vivid transition-transform group-open:rotate-45">+</span>
                      </summary>
                      <p className="mt-3 text-sm text-ocean/70 leading-relaxed">{f.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
