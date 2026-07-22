
# SOLO.COM — Frontend Build (Phase 1)

Scope: public marketing site + package detail page. No booking, auth, admin, or payments in this phase. All data comes from typed mock modules with an API-shaped layer so a FastAPI backend can drop in later without UI changes.

## Stack (what Lovable can actually run)

- React 19 + TypeScript + Tailwind v4 (already in project)
- TanStack Start's file-based router (Lovable's default — replaces React Router; same DX)
- TanStack Query for data fetching
- React Hook Form + Zod for forms
- Framer Motion for animation
- Swiper for hero/gallery sliders
- Sonner for toasts, Lucide for icons
- Images: Unsplash URLs + a few generated hero images (Cloudinary swap-in later is a one-line change in the image helper)

Explicitly deferred to your FastAPI/Mongo/Cloudinary/Razorpay backend: auth, booking, payments, admin CMS, WhatsApp handoff, email, analytics dashboards, SEO sitemap generation. UI hooks and types will exist so wiring them is straightforward.

## Design direction

Premium blue + white with sky-blue accents, 20px+ rounded cards, soft shadows, subtle glass on hero overlays, generous spacing. Distinct from generic templates — not another Airbnb clone. I'll produce 3 rendered directions and let you pick one before building.

## Routes

```text
/                       Home
/destinations           All destinations grid + filters
/packages               All packages grid + filters
/packages/$slug         Package detail
/women                  Women Solo Travelers landing
/categories/$slug       Category landing (students, seniors, family, weekend, adventure, intl, domestic)
/gallery                Image + video gallery
/blog                   Blog index
/blog/$slug             Blog post
/about /contact /faqs
/privacy /terms /refund-policy /cancellation-policy
```

Each route gets its own head() with unique title/description/og tags.

## Home sections

Hero (4-slide Swiper: students, women solo, professionals, seniors) with search bar (destination, dates, budget, travel type, age group) → Featured Destinations → Upcoming Trips (countdown + seats) → Women Special (safety badges) → category rails (Men / Family / Kids / Student / Senior / Weekend / Adventure / International / Domestic) → Popular Packages → Why SOLO.COM → Safety Features → Gallery preview → Reviews → Blog preview → FAQs → Newsletter → Contact strip → Footer.

## Package detail

Hero gallery slider, overview, highlights, day-by-day itinerary accordion, inclusions/exclusions, hotel/meals/transport, pickup/drop, cancellation + refund policy, FAQs, reviews, available dates with remaining seats, sticky Book Now bar (button disabled with "Booking coming soon" tooltip until backend lands).

## Data layer (backend-ready)

`src/lib/api/` contains one module per resource (`destinations.ts`, `packages.ts`, `categories.ts`, `blog.ts`, `testimonials.ts`, `faqs.ts`, `hero.ts`, `gallery.ts`). Each exports:

- Zod schemas + TS types matching your intended Mongo documents
- `listX()` / `getXBySlug()` functions that today read from `src/lib/api/_mock/*.ts`, tomorrow call `axios.get(\`${API_BASE}/x\`)`
- TanStack Query hooks (`useDestinations`, `usePackage(slug)`, …)

Switching to FastAPI = set `VITE_API_BASE_URL` and flip one flag in `src/lib/api/client.ts`. Route loaders use `ensureQueryData` so SSR-friendly.

## Search

Client-side filtering over the package list for now (destination, date range, budget, category, age group, duration, travel type, difficulty). Same hook signature the server-side endpoint will use later.

## SEO

Per-route head() with title/description/og:title/og:description, og:image on leaf routes with a hero, JSON-LD (Organization on root, TravelAgency on home, Product-ish on package pages, Article on blog posts), relative canonical + og:url.

## Not in this phase (called out so it isn't a surprise)

- Auth (customer + admin), JWT, OTP, Google login
- Booking form submission, Razorpay order/verify/webhook, WhatsApp redirect
- Admin panel, CMS editing, analytics, notifications, coupons, wishlist, PDF itinerary, PWA, i18n
- Email, Cloudinary upload widget, live chat

These are backend-driven and belong in phase 2+ once the FastAPI service exists. UI slots and types will be in place.

## Deliverables at end of phase 1

- All routes above rendering with mock data
- Responsive across mobile/tablet/desktop
- Design system tokens in `src/styles.css` (blue/white/sky-blue, radii, shadows, glass utilities)
- Backend-ready `src/lib/api/` layer with Zod types
- Per-route SEO metadata
- Clean structure so phase 2 (booking + auth) and phase 3 (admin CMS) slot in

## Next step

I'll generate 3 design directions for the hero + home composition; you pick one and I build the whole phase against it.
