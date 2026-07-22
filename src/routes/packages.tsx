import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { z } from "zod";

import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionHeader } from "@/components/site/SectionHeader";
import { PackageCard } from "@/components/site/PackageCard";
import { packagesQuery } from "@/lib/api/queries";

const searchSchema = z.object({
  q: z.string().optional(),
  budget: z.string().optional(),
  type: z.string().optional(),
  age: z.string().optional(),
});

export const Route = createFileRoute("/packages")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "All packages — SOLO.COM" },
      {
        name: "description",
        content:
          "Every curated departure on SOLO.COM. Filter by destination, budget, travel type, and age group.",
      },
      { property: "og:title", content: "All packages — SOLO.COM" },
      { property: "og:description", content: "Every curated departure on SOLO.COM." },
      { property: "og:url", content: "/packages" },
    ],
    links: [{ rel: "canonical", href: "/packages" }],
  }),
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(packagesQuery());
  },
  component: PackagesPage,
});

function PackagesPage() {
  const initial = Route.useSearch();
  const { data } = useSuspenseQuery(packagesQuery());

  const [q, setQ] = useState(initial.q ?? "");
  const [budget, setBudget] = useState(initial.budget ?? "Any");
  const [type, setType] = useState(initial.type ?? "Any");
  const [age, setAge] = useState(initial.age ?? "Any");

  const filtered = useMemo(() => {
    return data.filter((p) => {
      if (q) {
        const hay = `${p.title} ${p.destinationName} ${p.subtitle}`.toLowerCase();
        if (!hay.includes(q.toLowerCase())) return false;
      }
      if (budget !== "Any") {
        if (budget === "Under $2k" && p.priceFrom >= 2000) return false;
        if (budget === "$2k–$4k" && (p.priceFrom < 2000 || p.priceFrom > 4000)) return false;
        if (budget === "$4k+" && p.priceFrom < 4000) return false;
      }
      if (type !== "Any" && p.travelType.toLowerCase() !== type.toLowerCase()) return false;
      if (age !== "Any") {
        const ageKey = age.toLowerCase();
        const hit = p.ageGroups.some((g) => ageKey.includes(g.replace("-", " ")));
        if (!hit) return false;
      }
      return true;
    });
  }, [data, q, budget, type, age]);

  return (
    <SiteLayout>
      <section className="pt-16 pb-24 px-6">
        <div className="container-page">
          <SectionHeader eyebrow="Search" title="All departures" />

          <div className="mb-10 p-3 bg-white rounded-[24px] ring-1 ring-black/5 shadow-luxe-sm grid grid-cols-1 md:grid-cols-4 gap-2 md:divide-x md:divide-ocean/5">
            <Filter label="Search">
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Destination or trip name"
                className="w-full bg-transparent text-sm text-ocean placeholder:text-ocean/30 focus:outline-none"
              />
            </Filter>
            <Filter label="Budget">
              <select value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full bg-transparent text-sm text-ocean focus:outline-none">
                {["Any", "Under $2k", "$2k–$4k", "$4k+"].map((b) => <option key={b}>{b}</option>)}
              </select>
            </Filter>
            <Filter label="Travel type">
              <select value={type} onChange={(e) => setType(e.target.value)} className="w-full bg-transparent text-sm text-ocean focus:outline-none">
                {["Any", "Adventure", "Wellness", "Cultural", "Leisure", "Pilgrimage"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </Filter>
            <Filter label="Age">
              <select value={age} onChange={(e) => setAge(e.target.value)} className="w-full bg-transparent text-sm text-ocean focus:outline-none">
                {["Any", "Students", "Young adults", "Professionals", "Families", "Seniors"].map((a) => <option key={a}>{a}</option>)}
              </select>
            </Filter>
          </div>

          {filtered.length === 0 ? (
            <p className="text-ocean/60">No departures match those filters. Try widening the search.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((p) => (
                <PackageCard key={p.id} pkg={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

function Filter({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="px-4 py-3">
      <label className="block text-[10px] font-semibold uppercase tracking-wider text-ocean/40 mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}
