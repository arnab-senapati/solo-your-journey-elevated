import type { ReactNode } from "react";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-canvas text-ink font-sans selection:bg-sky-soft">
      <SiteNav />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
