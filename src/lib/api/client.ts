/**
 * Data layer switch.
 *
 * Phase 1 reads from local mock modules. When the FastAPI backend lands,
 * set VITE_API_BASE_URL and flip USE_REMOTE to true, then implement the
 * corresponding fetch calls in each resource module.
 */
export const API_BASE_URL: string =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "";
export const USE_REMOTE: boolean = Boolean(API_BASE_URL);

/** Small helper so mock functions look async like real fetches. */
export function ok<T>(value: T): Promise<T> {
  return Promise.resolve(value);
}
