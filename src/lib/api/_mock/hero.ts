import type { HeroSlide } from "../types";
import { IMG } from "./images";

export const heroSlides: HeroSlide[] = [
  {
    id: "women",
    eyebrow: "Women Solo Travelers",
    heading: "Travel with total autonomy, never alone.",
    subheading:
      "Curated journeys designed and vetted for women who explore the world on their own terms.",
    image: IMG.heroWomen,
    ctaLabel: "Explore women's journeys",
    ctaHref: "/women",
  },
  {
    id: "students",
    eyebrow: "Students · Ages 8–18",
    heading: "Learning trips that widen the horizon.",
    subheading:
      "School expeditions, cultural exchanges, and adventure camps with 24/7 accredited chaperones.",
    image: IMG.heroStudents,
    ctaLabel: "See student trips",
    ctaHref: "/categories/students",
  },
  {
    id: "professionals",
    eyebrow: "Working Professionals",
    heading: "The weekend escape, elevated.",
    subheading:
      "Curated 2–5 day retreats and workations for people who guard their time.",
    image: IMG.heroProfessionals,
    ctaLabel: "Weekend luxury",
    ctaHref: "/categories/weekend",
  },
  {
    id: "seniors",
    eyebrow: "Senior Citizens · 60+",
    heading: "Unhurried journeys of a lifetime.",
    subheading:
      "Comfort-first pilgrimages and heritage tours with dedicated medical support.",
    image: IMG.heroSeniors,
    ctaLabel: "Comfort tours",
    ctaHref: "/categories/seniors",
  },
];
