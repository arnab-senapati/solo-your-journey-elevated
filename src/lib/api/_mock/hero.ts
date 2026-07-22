import type { HeroSlide } from "../types";
import { IMG } from "./images";

export const heroSlides: HeroSlide[] = [
  {
    id: "paris",
    eyebrow: "Women Solo Travelers",
    heading: "Travel with total autonomy, never alone.",
    subheading:
      "Curated journeys designed and vetted for women who explore the world on their own terms.",
    image: IMG.paris,
    ctaLabel: "Explore women's journeys",
    ctaHref: "/women",
  },
  {
    id: "london",
    eyebrow: "City Escapes",
    heading: "London, on your own clock.",
    subheading:
      "Museums, markets, and long walks between them — small-group city journeys for every age.",
    image: IMG.heroLondon,
    ctaLabel: "See city trips",
    ctaHref: "/packages",
  },
  {
    id: "amalfi",
    eyebrow: "Mediterranean",
    heading: "The Amalfi drive, unhurried.",
    subheading:
      "Cliffside villages, long lunches, and the sea always in view. Weekends that feel like weeks.",
    image: IMG.amalfi,
    ctaLabel: "Weekend luxury",
    ctaHref: "/categories/weekend",
  },
  {
    id: "coastal",
    eyebrow: "Heritage Journeys",
    heading: "Unhurried journeys of a lifetime.",
    subheading:
      "Comfort-first pilgrimages and heritage tours with dedicated on-trip support.",
    image: IMG.heroCoastalNight,
    ctaLabel: "Comfort tours",
    ctaHref: "/categories/seniors",
  },
];
