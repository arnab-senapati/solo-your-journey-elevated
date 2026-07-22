import { Shield, LifeBuoy, PhoneCall, BadgeCheck } from "lucide-react";
import { IMG } from "@/lib/api/_mock/images";
const safetyPassport = IMG.safetyPassport;

const items = [
  {
    icon: BadgeCheck,
    title: "Vetted Havens",
    body: "Every accommodation is hand-inspected against a 42-point safety protocol — 24/7 lobby staffing, secure access, neighborhood ratings.",
  },
  {
    icon: PhoneCall,
    title: "Shadow Support",
    body: "Localized emergency contacts and real-time transit assistance through a female concierge, 24 hours a day.",
  },
  {
    icon: Shield,
    title: "Verified Guides",
    body: "Every guide passes a background check and completes our solo-traveler hospitality training.",
  },
  {
    icon: LifeBuoy,
    title: "Emergency Cover",
    body: "SOS button in the app, insurance built into adventure departures, evacuation ready.",
  },
];

export function SafetySection() {
  return (
    <section className="py-24 px-6">
      <div className="container-page">
        <div className="bg-ocean rounded-[40px] p-10 md:p-16 lg:p-20 text-white relative overflow-hidden">
          <div className="absolute -top-24 -right-24 size-96 rounded-full bg-sky-vivid/10 blur-3xl" />
          <div className="relative z-10 grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-sky-vivid mb-4 block">
                The Protocol
              </span>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight text-balance max-w-[35ch] mb-8">
                The Solo Safety Protocol
              </h2>
              <div className="space-y-6">
                {items.map((it) => (
                  <div key={it.title} className="flex gap-4">
                    <div className="size-10 shrink-0 bg-sky-vivid/20 rounded-xl flex items-center justify-center">
                      <it.icon className="size-4 text-sky-vivid" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{it.title}</h4>
                      <p className="text-sky-soft/70 text-sm leading-relaxed max-w-[56ch]">
                        {it.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src={safetyPassport}
                alt="A passport and travel journal on a sunlit surface"
                width={1000}
                height={1200}
                loading="lazy"
                className="w-full aspect-[4/5] rounded-[32px] object-cover ring-1 ring-white/10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
