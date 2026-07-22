import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title: "Refund Policy — SOLO.COM" },
      { name: "description", content: "How refunds work at SOLO.COM." },
      { property: "og:title", content: "Refund Policy — SOLO.COM" },
      { property: "og:description", content: "How refunds work at SOLO.COM." },
      { property: "og:url", content: "/refund-policy" },
    ],
    links: [{ rel: "canonical", href: "/refund-policy" }],
  }),
  component: () => (
    <LegalPage
      eyebrow="Legal"
      title="Refund policy"
      intro="Every package lists its specific refund window on its detail page. This document explains the general framework."
      sections={[
        { heading: "Processing time", body: "Refunds are processed within 7–10 business days to the original payment method." },
        { heading: "Non-refundable items", body: "Third-party costs (visas, air tickets, insurance) are non-refundable once purchased." },
        { heading: "Trip changes by SOLO.COM", body: "If we cancel a departure, you receive a full refund or the option to move to another date at no extra cost." },
      ]}
    />
  ),
});
