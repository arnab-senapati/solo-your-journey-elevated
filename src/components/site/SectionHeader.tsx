import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

export function SectionHeader({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string;
  title: string;
  action?: { label: string; to: string } | ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-6 mb-10 md:mb-12">
      <div className="space-y-2">
        {eyebrow && (
          <span className="text-xs font-semibold uppercase tracking-widest text-sky-vivid">
            {eyebrow}
          </span>
        )}
        <h2 className="font-serif text-3xl md:text-4xl text-ocean text-balance max-w-[40ch]">
          {title}
        </h2>
      </div>
      {action && typeof action === "object" && "to" in (action as { to?: string }) ? (
        <Link
          to={(action as { to: string; label: string }).to}
          className="hidden md:inline text-sm font-medium text-ocean underline underline-offset-4 decoration-ocean/20 hover:decoration-ocean shrink-0"
        >
          {(action as { to: string; label: string }).label}
        </Link>
      ) : (
        action
      )}
    </div>
  );
}
