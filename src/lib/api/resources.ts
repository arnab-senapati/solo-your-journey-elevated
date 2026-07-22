import { ok } from "./client";
import { destinations } from "./_mock/destinations";
import { packages } from "./_mock/packages";
import { categories } from "./_mock/categories";
import { testimonials } from "./_mock/testimonials";
import { blogPosts } from "./_mock/blog";
import { faqs } from "./_mock/faqs";
import { heroSlides } from "./_mock/hero";
import { gallery } from "./_mock/gallery";
import type {
  Destination,
  Package,
  Category,
  Testimonial,
  BlogPost,
  FAQ,
  HeroSlide,
  GalleryItem,
} from "./types";

// Destinations
export const listDestinations = (): Promise<Destination[]> => ok(destinations);
export const getDestinationBySlug = (slug: string): Promise<Destination | null> =>
  ok(destinations.find((d) => d.slug === slug) ?? null);

// Packages
export const listPackages = (): Promise<Package[]> => ok(packages);
export const listFeaturedPackages = (): Promise<Package[]> =>
  ok(packages.filter((p) => p.featured));
export const listWomenSpecialPackages = (): Promise<Package[]> =>
  ok(packages.filter((p) => p.isWomenSpecial));
export const listPackagesByCategory = (categorySlug: string): Promise<Package[]> =>
  ok(packages.filter((p) => p.categorySlug === categorySlug));
export const getPackageBySlug = (slug: string): Promise<Package | null> =>
  ok(packages.find((p) => p.slug === slug) ?? null);

// Upcoming trips: derived from availableDates
export const listUpcomingDepartures = () =>
  ok(
    packages
      .flatMap((pkg) =>
        pkg.availableDates.map((d) => ({
          package: pkg,
          date: d,
          remaining: d.totalSeats - d.bookedSeats,
        })),
      )
      .filter((x) => new Date(x.date.startDate).getTime() > Date.now())
      .sort(
        (a, b) => new Date(a.date.startDate).getTime() - new Date(b.date.startDate).getTime(),
      )
      .slice(0, 6),
  );

// Categories
export const listCategories = (): Promise<Category[]> => ok(categories);
export const getCategoryBySlug = (slug: string): Promise<Category | null> =>
  ok(categories.find((c) => c.slug === slug) ?? null);

// Testimonials, blog, faqs, hero, gallery
export const listTestimonials = (): Promise<Testimonial[]> => ok(testimonials);
export const listBlogPosts = (): Promise<BlogPost[]> => ok(blogPosts);
export const getBlogPostBySlug = (slug: string): Promise<BlogPost | null> =>
  ok(blogPosts.find((p) => p.slug === slug) ?? null);
export const listFAQs = (): Promise<FAQ[]> => ok(faqs);
export const listHeroSlides = (): Promise<HeroSlide[]> => ok(heroSlides);
export const listGallery = (): Promise<GalleryItem[]> => ok(gallery);
