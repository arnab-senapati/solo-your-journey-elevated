import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — SOLO.COM" },
      { name: "description", content: "The terms under which SOLO.COM provides its services." },
      { property: "og:title", content: "Terms of Service — SOLO.COM" },
      { property: "og:description", content: "The terms under which SOLO.COM operates." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: () => (
    <LegalPage
      eyebrow="Legal"
      title="Terms of service"
      intro="These terms govern your use of SOLO.COM and any trip booked through us."
      sections={[
        { heading: "Bookings", body: "A booking is confirmed once payment is received and a booking ID is issued." },
        { heading: "Traveler responsibility", body: "Travelers are responsible for valid passports, visas, and travel insurance where applicable." },
        { heading: "Force majeure", body: "SOLO.COM is not liable for delays or cancellations caused by events beyond our reasonable control." },
        { heading: "Liability", body: "Our maximum liability for any claim is limited to the total amount paid for your booking." },
      ]}
    />
  ),
});
