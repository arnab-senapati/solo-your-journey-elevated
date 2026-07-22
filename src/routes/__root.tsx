import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-7xl text-ocean">404</h1>
        <h2 className="mt-3 text-xl font-medium text-ocean">Off the map</h2>
        <p className="mt-2 text-sm text-ocean/60">
          The page you're looking for has drifted. Let's find your way home.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-ocean px-5 py-2 text-sm font-medium text-white hover:bg-ocean/90 transition-colors"
          >
            Back to SOLO.COM
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-3xl text-ocean">This page didn't load</h1>
        <p className="mt-2 text-sm text-ocean/60">
          Something went wrong on our end. Try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-ocean px-5 py-2 text-sm font-medium text-white hover:bg-ocean/90 transition-colors"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-ocean/20 bg-white px-5 py-2 text-sm font-medium text-ocean hover:bg-sky-soft transition-colors"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "SOLO.COM" },
      { property: "og:site_name", content: "SOLO.COM" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@solodotcom" },
      { name: "theme-color", content: "#0c4a6e" },
      { title: "SOLO.COM — Explore the World. Discover Yourself." },
      { property: "og:title", content: "SOLO.COM — Explore the World. Discover Yourself." },
      { name: "twitter:title", content: "SOLO.COM — Explore the World. Discover Yourself." },
      { name: "description", content: "Curated small-group journeys for solo women travelers and anyone traveling with intent, ages 8 to 80. Verified safety, women-owned partners, worldwide." },
      { property: "og:description", content: "Curated small-group journeys for solo women travelers and anyone traveling with intent, ages 8 to 80. Verified safety, women-owned partners, worldwide." },
      { name: "twitter:description", content: "Curated small-group journeys for solo women travelers and anyone traveling with intent, ages 8 to 80. Verified safety, women-owned partners, worldwide." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/aef26e4d-5f07-4642-b139-640d2278ec9e/id-preview-d04f7e2c--c83fc81d-4b67-4a51-8ac0-3abca83e8df9.lovable.app-1784730303137.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/aef26e4d-5f07-4642-b139-640d2278ec9e/id-preview-d04f7e2c--c83fc81d-4b67-4a51-8ac0-3abca83e8df9.lovable.app-1784730303137.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          name: "SOLO.COM",
          description:
            "SOLO.COM curates safe, premium group journeys for solo women travelers and for anyone traveling with intent — ages 8 to 80.",
          slogan: "Explore the World. Discover Yourself.",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster position="top-right" richColors closeButton />
    </QueryClientProvider>
  );
}
