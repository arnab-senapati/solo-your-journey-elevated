import type { Destination } from "../types";
import { IMG } from "./images";

export const destinations: Destination[] = [
  {
    id: "d1",
    slug: "paris",
    name: "Paris",
    country: "France",
    region: "Western Europe",
    tagline: "Sunset over the Tower",
    description:
      "Rooftop terraces framing the Eiffel Tower at golden hour — bistros, boulevards, and quiet mornings in the Marais.",
    image: IMG.paris,
    featured: true,
  },
  {
    id: "d2",
    slug: "amalfi-coast",
    name: "Amalfi Coast",
    country: "Italy",
    region: "Mediterranean",
    tagline: "Cliffside drives",
    description:
      "Pastel villages stacked above the Tyrrhenian, hairpin roads, lemon groves, and long lunches by the sea.",
    image: IMG.amalfi,
    featured: true,
  },
  {
    id: "d3",
    slug: "portofino",
    name: "Portofino",
    country: "Italy",
    region: "Ligurian Riviera",
    tagline: "Harbour of colour",
    description:
      "A pocket-sized fishing port turned Riviera icon — ochre facades, wooden boats, and paths through the pines.",
    image: IMG.portofino,
    featured: true,
  },
  {
    id: "d4",
    slug: "venice",
    name: "Venice",
    country: "Italy",
    region: "Northern Italy",
    tagline: "Canals at sunset",
    description:
      "Bridges, reflections, and the quiet slap of water against stone. Best walked slowly, without a map.",
    image: IMG.venice,
    featured: false,
  },
  {
    id: "d5",
    slug: "italian-alps",
    name: "Italian Alps",
    country: "Italy",
    region: "Northern Italy",
    tagline: "Villages above the lakes",
    description:
      "Cypress-lined roads, hilltop hamlets, and Alpine lakes glimpsed through vineyards.",
    image: IMG.italianAlps,
    featured: true,
  },
  {
    id: "d6",
    slug: "london",
    name: "London",
    country: "United Kingdom",
    region: "Western Europe",
    tagline: "City of icons",
    description:
      "Red buses, black cabs, museums for weeks, and a river that connects every version of the city at once.",
    image: IMG.londonStreet,
    featured: false,
  },
  {
    id: "d7",
    slug: "polignano-a-mare",
    name: "Polignano a Mare",
    country: "Italy",
    region: "Puglia",
    tagline: "Whitewashed cliffs",
    description:
      "A limestone town perched over turquoise coves — swimming beneath the old houses of Puglia.",
    image: IMG.polignano,
    featured: false,
  },
];
