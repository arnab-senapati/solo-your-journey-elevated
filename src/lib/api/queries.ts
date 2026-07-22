import { queryOptions } from "@tanstack/react-query";
import * as R from "./resources";

export const heroSlidesQuery = () =>
  queryOptions({ queryKey: ["heroSlides"], queryFn: R.listHeroSlides });

export const destinationsQuery = () =>
  queryOptions({ queryKey: ["destinations"], queryFn: R.listDestinations });

export const destinationQuery = (slug: string) =>
  queryOptions({
    queryKey: ["destination", slug],
    queryFn: () => R.getDestinationBySlug(slug),
  });

export const packagesQuery = () =>
  queryOptions({ queryKey: ["packages"], queryFn: R.listPackages });

export const featuredPackagesQuery = () =>
  queryOptions({ queryKey: ["packages", "featured"], queryFn: R.listFeaturedPackages });

export const womenPackagesQuery = () =>
  queryOptions({ queryKey: ["packages", "women"], queryFn: R.listWomenSpecialPackages });

export const packagesByCategoryQuery = (slug: string) =>
  queryOptions({
    queryKey: ["packages", "category", slug],
    queryFn: () => R.listPackagesByCategory(slug),
  });

export const packageQuery = (slug: string) =>
  queryOptions({
    queryKey: ["package", slug],
    queryFn: () => R.getPackageBySlug(slug),
  });

export const upcomingDeparturesQuery = () =>
  queryOptions({ queryKey: ["upcomingDepartures"], queryFn: R.listUpcomingDepartures });

export const categoriesQuery = () =>
  queryOptions({ queryKey: ["categories"], queryFn: R.listCategories });

export const categoryQuery = (slug: string) =>
  queryOptions({ queryKey: ["category", slug], queryFn: () => R.getCategoryBySlug(slug) });

export const testimonialsQuery = () =>
  queryOptions({ queryKey: ["testimonials"], queryFn: R.listTestimonials });

export const blogPostsQuery = () =>
  queryOptions({ queryKey: ["blogPosts"], queryFn: R.listBlogPosts });

export const blogPostQuery = (slug: string) =>
  queryOptions({ queryKey: ["blogPost", slug], queryFn: () => R.getBlogPostBySlug(slug) });

export const faqsQuery = () =>
  queryOptions({ queryKey: ["faqs"], queryFn: R.listFAQs });

export const galleryQuery = () =>
  queryOptions({ queryKey: ["gallery"], queryFn: R.listGallery });
