
## Goal

Use the 10 uploaded travel photos (Paris, Amalfi, Portofino, Venice, Italian mountains, London street, Polignano, Portofino villa, London Big Ben dusk, coastal village night) throughout the site instead of the current AI-generated placeholders.

## Approach

Upload each image via `lovable-assets create` from `/mnt/user-uploads/` so binaries stay out of the repo, and write `.asset.json` pointers into `src/assets/`. Then wire them into the existing image registry.

## Steps

1. **Upload the 10 images** to CDN with `lovable-assets`, naming them semantically:
   - `dest-paris.webp` ← Paris/Eiffel café
   - `dest-amalfi.jpg` ← Amalfi coast road
   - `dest-portofino.webp` ← Portofino harbor
   - `dest-venice.webp` ← Venice canal sunset
   - `dest-italian-alps.webp` ← Italian mountain village
   - `dest-london-street.jpg` ← London street daytime
   - `dest-polignano.jpg` ← Polignano a Mare cliffs
   - `dest-portofino-villa.jpg` ← Portofino villa cove
   - `hero-london.webp` ← London Big Ben dusk (hero)
   - `hero-coastal-night.jpg` ← Coastal village at night (hero)

2. **Update `src/lib/api/_mock/images.ts`** to import the new `.asset.json` pointers (using `.url`) and expose them under the `IMG` map. Keep existing keys working by remapping them to the closest new photo; add new keys for the new destinations.

3. **Update `src/lib/api/_mock/destinations.ts`** and `hero.ts` to reference the new IMG keys so cards and hero slides show the uploaded photos. Reshape destination entries (Paris, Amalfi, Portofino, Venice, Italian Alps, London, Polignano) to match the images. Blog/gallery/package covers that use the old keys will automatically pick up the remapped photos.

4. **Delete the now-unused AI-generated asset pointers** in `src/assets/` (chefchaouen, kyoto, naxos, srilanka, himalayas, bali, iceland, hero-women, hero-students, hero-professionals, hero-seniors) with `lovable-assets delete` to keep the repo clean. Safety asset (`safety-passport`) stays.

5. **Verify** with `tsgo` and a quick visual check of `/` and `/destinations`.

## Notes

- No component code changes needed — cards read `dest.image` and hero reads `slide.image`, both sourced from the mock data.
- Uploaded photos are portrait-oriented, which matches the `aspect-[4/5]` destination cards and the 16:9 hero (cropped via `object-cover`).
