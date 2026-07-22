import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — SOLO.COM" },
      { name: "description", content: "How SOLO.COM collects, uses, and protects your data." },
      { property: "og:title", content: "Privacy Policy — SOLO.COM" },
      { property: "og:description", content: "How SOLO.COM handles your data." },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: () => (
    <LegalPage
      eyebrow="Legal"
      title="Privacy policy"
      intro="This policy explains what data SOLO.COM collects, how we use it, and how we keep it safe."
      sections={[
        { heading: "What we collect", body: "Name, email, phone, and booking information you share with us. Payment data is processed by our payment partner and never stored on our servers." },
        { heading: "How we use it", body: "To operate your booking, communicate about your trip, and improve our service. We never sell your data." },
        { heading: "How we protect it", body: "Encryption in transit and at rest, role-based access, and regular security audits." },
        { heading: "Your rights", body: "You may request access, correction, or deletion of your data at any time by writing to concierge@solo.com." },
      ]}
    />
  ),
});
