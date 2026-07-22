import type { BlogPost } from "../types";
import { IMG } from "./images";

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    slug: "packing-for-a-solo-week",
    title: "Packing for a solo week: what actually earns its weight",
    excerpt:
      "A carry-on-only kit for seven days abroad, from the SOLO.COM concierge team.",
    body:
      "There is a version of packing that is about aesthetics and a version that is about attention. This piece is about the second version — the small decisions that free you to think about anything else once you land.\n\nStart with the base layers. Two sets of merino, one pair of trousers that can be dressed up or down, one dress or shirt for evenings.\n\nCarry the small things that make a hotel room feel like yours: an eye mask, a good book, one photograph.\n\nLeave room for something you don't yet know you'll bring home.",
    coverImage: IMG.safetyPassport,
    author: "SOLO Concierge",
    publishedAt: "2026-01-14",
    tags: ["packing", "solo", "guide"],
    category: "Guides",
  },
  {
    id: "b2",
    slug: "why-women-travel-alone",
    title: "Why women travel alone (and what changes when they do)",
    excerpt:
      "Notes from a year of hosting solo women travelers across four continents.",
    body:
      "Every solo trip we've hosted contains a version of the same small moment: the first meal alone in a foreign country, chosen by no one but yourself. It sounds like nothing. It is not nothing.\n\nWhat changes on a solo trip is not the world; it's the sentence you use to describe yourself to yourself. That change is worth planning for.",
    coverImage: IMG.naxos,
    author: "Anika Rao",
    publishedAt: "2026-02-02",
    tags: ["women", "solo", "reflection"],
    category: "Journal",
  },
  {
    id: "b3",
    slug: "kyoto-at-dawn",
    title: "Kyoto at dawn: a short field guide",
    excerpt:
      "The temples worth waking up for, and the ones that reward the second visit.",
    body:
      "Kyoto is a city that rewards early risers. This guide is a small list — six temples, in order of the light, that we return to on every trip.",
    coverImage: IMG.kyoto,
    author: "Yuki Tanaka",
    publishedAt: "2026-03-10",
    tags: ["kyoto", "japan", "guide"],
    category: "Field Guides",
  },
];
