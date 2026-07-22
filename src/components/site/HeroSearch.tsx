import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

const budgets = ["Any", "Under $2k", "$2k–$4k", "$4k+"];
const travelTypes = ["Any", "Adventure", "Wellness", "Cultural", "Leisure", "Pilgrimage"];
const ageGroups = ["Any", "Students (8–18)", "Young adults", "Professionals", "Family", "Seniors (60+)"];

export function HeroSearch() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState(budgets[0]);
  const [travelType, setTravelType] = useState(travelTypes[0]);
  const [ageGroup, setAgeGroup] = useState(ageGroups[0]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const search: Record<string, string> = {};
        if (destination.trim()) search.q = destination.trim();
        if (budget !== "Any") search.budget = budget;
        if (travelType !== "Any") search.type = travelType;
        if (ageGroup !== "Any") search.age = ageGroup;
        navigate({ to: "/packages", search });
      }}
      className="bg-white/95 backdrop-blur-xl p-3 rounded-[28px] ring-1 ring-black/5 shadow-luxe"
    >
      <div className="grid grid-cols-1 md:grid-cols-5 md:divide-x divide-ocean/5 gap-2 md:gap-0">
        <Field label="Where to">
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Destination or country"
            className="w-full bg-transparent text-sm focus:outline-none text-ocean placeholder:text-ocean/30"
          />
        </Field>
        <Field label="Budget">
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full bg-transparent text-sm text-ocean focus:outline-none appearance-none"
          >
            {budgets.map((b) => <option key={b}>{b}</option>)}
          </select>
        </Field>
        <Field label="Travel type">
          <select
            value={travelType}
            onChange={(e) => setTravelType(e.target.value)}
            className="w-full bg-transparent text-sm text-ocean focus:outline-none appearance-none"
          >
            {travelTypes.map((t) => <option key={t}>{t}</option>)}
          </select>
        </Field>
        <Field label="Age">
          <select
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value)}
            className="w-full bg-transparent text-sm text-ocean focus:outline-none appearance-none"
          >
            {ageGroups.map((a) => <option key={a}>{a}</option>)}
          </select>
        </Field>
        <div className="px-2 md:px-3 flex items-center">
          <button
            type="submit"
            className="w-full h-full min-h-11 bg-sky-vivid text-white rounded-2xl font-medium text-sm hover:brightness-110 transition-all ring-1 ring-sky-vivid"
          >
            Find journeys
          </button>
        </div>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="px-6 py-3">
      <label className="block text-[10px] font-semibold uppercase tracking-wider text-ocean/40 mb-1">
        {label}
      </label>
      {children}
    </div>
  );
}
