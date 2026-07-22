import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/cancellation-policy")({
  head: () => ({
    meta: [
      { title: "Cancellation Policy — SOLO.COM" },
      { name: "description", content: "How to cancel a SOLO.COM booking." },
      { property: "og:title", content: "Cancellation Policy — SOLO.COM" },
      { property: "og:description", content: "How to cancel a SOLO.COM booking." },
      { property: "og:url", content: "/cancellation-policy" },
    ],
    links: [{ rel: "canonical", href: "/cancellation-policy" }],
  }),
  component: () => (
    <LegalPage
      eyebrow="Legal"
      title="Cancellation policy"
      intro="Every package lists a specific cancellation window on its detail page. The general framework below applies to most departures."
      sections={[
        { heading: "Free cancellation window", body: "Most departures offer free cancellation up to 30–60 days before travel." },
        { heading: "Partial refund window", body: "Cancellations inside the partial window receive a 50% refund." },
        { heading: "No-refund window", body: "Cancellations within 14 days of departure are non-refundable, though we will always try to transfer your booking to another traveler if possible." },
      ]}
    />
  ),
});
