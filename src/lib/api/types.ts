import { z } from "zod";

// Shared enums / vocab
export const AgeGroupSchema = z.enum([
  "kids",
  "students",
  "young-adults",
  "professionals",
  "families",
  "seniors",
]);
export type AgeGroup = z.infer<typeof AgeGroupSchema>;

export const TravelTypeSchema = z.enum([
  "adventure",
  "wellness",
  "cultural",
  "leisure",
  "pilgrimage",
  "beach",
  "mountain",
  "city",
]);
export type TravelType = z.infer<typeof TravelTypeSchema>;

export const DifficultySchema = z.enum(["easy", "moderate", "challenging"]);
export type Difficulty = z.infer<typeof DifficultySchema>;

// Destination
export const DestinationSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  country: z.string(),
  region: z.string(),
  tagline: z.string(),
  description: z.string(),
  image: z.string(),
  featured: z.boolean().default(false),
});
export type Destination = z.infer<typeof DestinationSchema>;

// Package
export const ItineraryDaySchema = z.object({
  day: z.number(),
  title: z.string(),
  summary: z.string(),
});

export const AvailableDateSchema = z.object({
  id: z.string(),
  startDate: z.string(), // ISO
  endDate: z.string(),
  totalSeats: z.number(),
  bookedSeats: z.number(),
  priceOverride: z.number().optional(),
});

export const PackageSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  subtitle: z.string(),
  destinationSlug: z.string(),
  destinationName: z.string(),
  categorySlug: z.string(), // e.g. women, students, seniors, family, adventure, weekend, international, domestic, professionals
  ageGroups: z.array(AgeGroupSchema),
  travelType: TravelTypeSchema,
  difficulty: DifficultySchema,
  durationDays: z.number(),
  durationNights: z.number(),
  priceFrom: z.number(),
  currency: z.string().default("USD"),
  rating: z.number().min(0).max(5),
  reviewCount: z.number(),
  coverImage: z.string(),
  gallery: z.array(z.string()),
  overview: z.string(),
  highlights: z.array(z.string()),
  itinerary: z.array(ItineraryDaySchema),
  included: z.array(z.string()),
  excluded: z.array(z.string()),
  hotel: z.string(),
  meals: z.string(),
  transport: z.string(),
  pickup: z.string(),
  drop: z.string(),
  cancellationPolicy: z.string(),
  refundPolicy: z.string(),
  faqs: z.array(z.object({ q: z.string(), a: z.string() })),
  availableDates: z.array(AvailableDateSchema),
  featured: z.boolean().default(false),
  isWomenSpecial: z.boolean().default(false),
});
export type Package = z.infer<typeof PackageSchema>;

// Category
export const CategorySchema = z.object({
  slug: z.string(),
  name: z.string(),
  tagline: z.string(),
  description: z.string(),
  image: z.string(),
});
export type Category = z.infer<typeof CategorySchema>;

// Testimonial
export const TestimonialSchema = z.object({
  id: z.string(),
  name: z.string(),
  age: z.number().optional(),
  location: z.string(),
  packageSlug: z.string().optional(),
  rating: z.number().min(0).max(5),
  quote: z.string(),
  verified: z.boolean().default(true),
});
export type Testimonial = z.infer<typeof TestimonialSchema>;

// Blog
export const BlogPostSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  body: z.string(),
  coverImage: z.string(),
  author: z.string(),
  publishedAt: z.string(),
  tags: z.array(z.string()),
  category: z.string(),
});
export type BlogPost = z.infer<typeof BlogPostSchema>;

// FAQ
export const FAQSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
  category: z.string(),
});
export type FAQ = z.infer<typeof FAQSchema>;

// Hero slide
export const HeroSlideSchema = z.object({
  id: z.string(),
  eyebrow: z.string(),
  heading: z.string(),
  subheading: z.string(),
  image: z.string(),
  ctaLabel: z.string(),
  ctaHref: z.string(),
});
export type HeroSlide = z.infer<typeof HeroSlideSchema>;

// Gallery item
export const GalleryItemSchema = z.object({
  id: z.string(),
  kind: z.enum(["image", "video"]),
  src: z.string(),
  caption: z.string(),
  location: z.string().optional(),
});
export type GalleryItem = z.infer<typeof GalleryItemSchema>;
