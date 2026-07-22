import type { Destination } from "../types";
import { IMG } from "./images";

export const destinations: Destination[] = [
  {
    id: "d1",
    slug: "chefchaouen",
    name: "Chefchaouen",
    country: "Morocco",
    region: "North Africa",
    tagline: "The Blue City",
    description:
      "A pale-blue medina in the Rif mountains — quiet stairs, mint tea, and morning light that changes the walls minute by minute.",
    image: IMG.chefchaouen,
    featured: true,
  },
  {
    id: "d2",
    slug: "kyoto",
    name: "Kyoto",
    country: "Japan",
    region: "East Asia",
    tagline: "Rituals in silence",
    description:
      "Temple mornings, tea houses, and the small architecture of restraint. Kyoto rewards the traveler who slows down.",
    image: IMG.kyoto,
    featured: true,
  },
  {
    id: "d3",
    slug: "naxos",
    name: "Naxos",
    country: "Greece",
    region: "Mediterranean",
    tagline: "Aegean solitude",
    description:
      "White walls, olive groves, and a sea that is always in the corner of the frame. Naxos is the calmer sister of Santorini.",
    image: IMG.naxos,
    featured: true,
  },
  {
    id: "d4",
    slug: "sri-lanka-highlands",
    name: "Sri Lankan Highlands",
    country: "Sri Lanka",
    region: "South Asia",
    tagline: "Tea country sanctuary",
    description:
      "Colonial bungalows above green terraces, train windows framing waterfalls, and a slower measurement of time.",
    image: IMG.srilanka,
    featured: false,
  },
  {
    id: "d5",
    slug: "himalayas",
    name: "Indian Himalayas",
    country: "India",
    region: "South Asia",
    tagline: "The high still places",
    description:
      "Prayer flags, monasteries at altitude, and light that arrives before the sun. Trekking that changes the way you breathe.",
    image: IMG.himalayas,
    featured: true,
  },
  {
    id: "d6",
    slug: "bali",
    name: "Bali",
    country: "Indonesia",
    region: "Southeast Asia",
    tagline: "Rice terrace mornings",
    description:
      "Ceremony every day, temples in every direction, and a coastline that stays warm year round.",
    image: IMG.bali,
    featured: false,
  },
  {
    id: "d7",
    slug: "iceland",
    name: "Iceland",
    country: "Iceland",
    region: "Nordic",
    tagline: "Glacier and silence",
    description:
      "Basalt coasts, geothermal pools, and an interior no other country has. Best walked slowly, in every season.",
    image: IMG.iceland,
    featured: false,
  },
];
