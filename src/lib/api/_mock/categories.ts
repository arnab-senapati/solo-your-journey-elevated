import type { Category } from "../types";
import { IMG } from "./images";

export const categories: Category[] = [
  {
    slug: "women",
    name: "Women Special",
    tagline: "For the solo woman traveler.",
    description:
      "Trips designed by women, hosted by women, with vetted accommodations and 24/7 female concierge support.",
    image: IMG.naxos,
  },
  {
    slug: "students",
    name: "Students",
    tagline: "Learning trips for ages 8–18.",
    description:
      "School expeditions, cultural exchanges, and adventure camps with accredited chaperones.",
    image: IMG.heroStudents,
  },
  {
    slug: "seniors",
    name: "Senior Citizens",
    tagline: "Unhurried journeys for 60+.",
    description:
      "Comfort-first heritage tours and pilgrimages with dedicated medical support.",
    image: IMG.heroSeniors,
  },
  {
    slug: "family",
    name: "Family",
    tagline: "Trips for every age at the table.",
    description:
      "Multi-generational holidays with kid-safe activities and quiet time for the adults.",
    image: IMG.bali,
  },
  {
    slug: "professionals",
    name: "Professionals",
    tagline: "Workations and weekend luxury.",
    description:
      "Fast, restorative getaways for people whose calendars refuse to blink.",
    image: IMG.heroProfessionals,
  },
  {
    slug: "weekend",
    name: "Weekend Escapes",
    tagline: "2–5 day resets.",
    description: "Short, high-quality journeys within reach of a Friday afternoon.",
    image: IMG.chefchaouen,
  },
  {
    slug: "adventure",
    name: "Adventure",
    tagline: "For the well-earned tiredness.",
    description: "Treks, dives, climbs, and expeditions that ask something of you.",
    image: IMG.himalayas,
  },
  {
    slug: "international",
    name: "International",
    tagline: "Wherever the passport still turns.",
    description: "Global departures with visa assistance and local partners on the ground.",
    image: IMG.iceland,
  },
  {
    slug: "domestic",
    name: "Domestic",
    tagline: "Home, seen slower.",
    description: "The country you thought you knew, revisited with a curator's eye.",
    image: IMG.kyoto,
  },
];
