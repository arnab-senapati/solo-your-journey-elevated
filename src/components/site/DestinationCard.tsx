import type { Destination } from "@/lib/api/types";

export function DestinationCard({ dest }: { dest: Destination }) {
  return (
    <div className="group cursor-pointer">
      <div className="aspect-[4/5] bg-sky-soft rounded-[24px] mb-5 overflow-hidden ring-1 ring-black/5">
        <img
          src={dest.image}
          alt={`${dest.name}, ${dest.country}`}
          width={800}
          height={1000}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex justify-between items-start gap-3">
        <div>
          <h3 className="font-medium text-lg text-ocean">{dest.name}</h3>
          <p className="text-sm text-ocean/60 mt-1">{dest.country}</p>
        </div>
        <span className="text-xs font-medium px-2 py-1 bg-ocean/5 rounded-full text-ocean/80">
          {dest.tagline}
        </span>
      </div>
    </div>
  );
}
