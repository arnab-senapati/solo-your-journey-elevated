import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/destinations", label: "Destinations" },
  { to: "/packages", label: "Packages" },
  { to: "/women", label: "Women Special" },
  { to: "/gallery", label: "Gallery" },
  { to: "/blog", label: "Journal" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-canvas/80 backdrop-blur-md border-b border-ocean/5">
      <div className="container-page h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-serif italic text-ocean tracking-tight">
          Solo.com
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6 text-sm font-medium text-ocean/70">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="hover:text-ocean transition-colors"
                activeProps={{ className: "text-ocean" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <Link
            to="/packages"
            className="bg-ocean text-white text-sm font-medium py-2 pr-4 pl-2 rounded-full flex items-center gap-2 ring-1 ring-ocean hover:bg-ocean/90 transition-colors"
          >
            <span className="size-4 shrink-0 rounded-full bg-sky-vivid/30 flex items-center justify-center">
              <span className="size-1.5 rounded-full bg-white" />
            </span>
            Plan a trip
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-ocean"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-ocean/5 bg-canvas">
          <div className="container-page py-4 flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-ocean/80 py-1"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/packages"
              onClick={() => setOpen(false)}
              className="mt-2 bg-ocean text-white text-sm font-medium py-3 rounded-full text-center"
            >
              Plan a trip
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
