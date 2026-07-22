import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import type { Package } from "@/lib/api/types";

export function PackageCard({ pkg }: { pkg: Package }) {
  const nextDate = pkg.availableDates[0];
  const seatsLeft = nextDate ? nextDate.totalSeats - nextDate.bookedSeats : undefined;

  return (
    <Link
      to="/packages/$slug"
      params={{ slug: pkg.slug }}
      className="group block"
    >
      <div className="relative aspect-[4/5] bg-sky-soft rounded-[24px] mb-5 overflow-hidden ring-1 ring-black/5">
        <img
          src={pkg.coverImage}
          alt={pkg.title}
          width={800}
          height={1000}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {seatsLeft !== undefined && seatsLeft > 0 && (
          <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-white/95 text-[10px] font-medium uppercase tracking-wider text-ocean shadow-sm">
            {seatsLeft} {seatsLeft === 1 ? "seat" : "seats"} left
          </span>
        )}
        {pkg.isWomenSpecial && (
          <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-ocean text-white text-[10px] font-medium uppercase tracking-wider">
            Women Special
          </span>
        )}
      </div>
      <div className="flex justify-between items-start gap-3">
        <div className="min-w-0">
          <h3 className="font-medium text-lg text-ocean truncate">{pkg.title}</h3>
          <p className="text-sm text-ocean/60 mt-1 truncate">
            {pkg.destinationName} · {pkg.durationDays} days
          </p>
        </div>
        <div className="text-right shrink-0">
          <div className="flex items-center gap-1 text-xs text-ocean/70">
            <Star className="size-3 fill-sky-vivid text-sky-vivid" />
            {pkg.rating.toFixed(1)}
          </div>
          <div className="text-sm font-medium text-ocean mt-1">
            ₹{pkg.priceFrom.toLocaleString()}
          </div>
        </div>
      </div>
    </Link>
  );
}
