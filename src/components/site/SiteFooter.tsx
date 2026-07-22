import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Linkedin, Youtube, MessageCircle } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-ocean/5 mt-24">
      <div className="container-page py-16 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4 space-y-4">
          <div className="text-2xl font-serif italic text-ocean">Solo.com</div>
          <p className="text-sm text-ocean/60 leading-relaxed max-w-sm">
            Explore the World. Discover Yourself.
            <br />
            The global standard for autonomous travel — for women, and for anyone
            traveling with intent, ages 8 to 80.
          </p>
          <div className="flex gap-3 pt-2 text-ocean/60">
            <a href="#" aria-label="Instagram" className="hover:text-ocean"><Instagram className="size-4" /></a>
            <a href="#" aria-label="Facebook" className="hover:text-ocean"><Facebook className="size-4" /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-ocean"><Linkedin className="size-4" /></a>
            <a href="#" aria-label="YouTube" className="hover:text-ocean"><Youtube className="size-4" /></a>
            <a
              href="https://wa.me/917384708532"
              aria-label="WhatsApp"
              className="hover:text-ocean"
            >
              <MessageCircle className="size-4" />
            </a>
          </div>
        </div>

        <FooterCol
          title="Explore"
          items={[
            { label: "Destinations", to: "/destinations" },
            { label: "All packages", to: "/packages" },
            { label: "Women Special", to: "/women" },
            { label: "Gallery", to: "/gallery" },
            { label: "Journal", to: "/blog" },
          ]}
        />
        <FooterCol
          title="Who we host"
          items={[
            { label: "Students", to: "/categories/students" },
            { label: "Families", to: "/categories/family" },
            { label: "Professionals", to: "/categories/professionals" },
            { label: "Senior citizens", to: "/categories/seniors" },
            { label: "Weekend escapes", to: "/categories/weekend" },
          ]}
        />
        <FooterCol
          title="Company"
          items={[
            { label: "About", to: "/about" },
            { label: "Contact", to: "/contact" },
            { label: "FAQs", to: "/faqs" },
          ]}
        />
        <FooterCol
          title="Legal"
          items={[
            { label: "Privacy", to: "/privacy" },
            { label: "Terms", to: "/terms" },
            { label: "Refunds", to: "/refund-policy" },
            { label: "Cancellation", to: "/cancellation-policy" },
          ]}
        />
      </div>

      <div className="border-t border-ocean/5">
        <div className="container-page py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-[10px] uppercase tracking-widest text-ocean/40">
          <p>© {new Date().getFullYear()} SOLO.COM — Explore the World. Discover Yourself.</p>
          <p>WhatsApp concierge · +91 73847 08532</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; to: string }[];
}) {
  return (
    <div className="md:col-span-2 space-y-4">
      <h5 className="text-[10px] font-semibold uppercase tracking-wider text-ocean/40">
        {title}
      </h5>
      <ul className="text-sm text-ocean/70 space-y-2">
        {items.map((i) => (
          <li key={i.to}>
            <Link to={i.to} className="hover:text-ocean transition-colors">
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
