import { Link } from "@tanstack/react-router";

type Action = { label: string; to: string };

export function SectionHeader({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string;
  title: string;
  action?: Action;
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
      {action && (
        <Link
          to={action.to}
          className="hidden md:inline text-sm font-medium text-ocean underline underline-offset-4 decoration-ocean/20 hover:decoration-ocean shrink-0"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}
