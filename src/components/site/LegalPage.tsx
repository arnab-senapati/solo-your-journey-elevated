import { SiteLayout } from "./SiteLayout";

export function LegalPage({
  eyebrow,
  title,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
}) {
  return (
    <SiteLayout>
      <section className="pt-16 pb-24 px-6">
        <div className="container-page max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-sky-vivid">
            {eyebrow}
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-ocean mt-3 leading-tight">
            {title}
          </h1>
          <p className="mt-6 text-ocean/70 leading-relaxed">{intro}</p>

          <div className="mt-10 space-y-8">
            {sections.map((s) => (
              <section key={s.heading}>
                <h2 className="font-serif text-2xl text-ocean mb-2">{s.heading}</h2>
                <p className="text-ocean/70 leading-relaxed whitespace-pre-line">
                  {s.body}
                </p>
              </section>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
