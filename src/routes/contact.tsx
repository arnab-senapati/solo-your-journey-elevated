import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { MessageCircle, Mail, Phone } from "lucide-react";

import { SiteLayout } from "@/components/site/SiteLayout";

const schema = z.object({
  name: z.string().min(2, "Please enter your name").max(80),
  email: z.string().email("Please enter a valid email").max(200),
  message: z.string().min(10, "Tell us a little more").max(1000),
});
type FormValues = z.infer<typeof schema>;

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — SOLO.COM" },
      { name: "description", content: "Talk to the SOLO.COM concierge team." },
      { property: "og:title", content: "Contact — SOLO.COM" },
      { property: "og:description", content: "Talk to the SOLO.COM concierge team." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    // Placeholder: real submission handled by the FastAPI backend.
    await new Promise((r) => setTimeout(r, 400));
    toast.success("Message received", {
      description: `Thanks ${values.name.split(" ")[0]} — we'll be in touch shortly.`,
    });
    reset();
  };

  return (
    <SiteLayout>
      <section className="pt-16 pb-24 px-6">
        <div className="container-page grid md:grid-cols-2 gap-16">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-sky-vivid">
              Contact
            </span>
            <h1 className="font-serif text-4xl md:text-5xl text-ocean mt-3 leading-tight">
              Talk to the concierge.
            </h1>
            <p className="mt-4 text-ocean/70">
              We reply to every enquiry within one business day.
            </p>

            <ul className="mt-8 space-y-4 text-sm text-ocean/80">
              <li className="flex items-start gap-3">
                <span className="size-9 rounded-xl bg-sky-soft flex items-center justify-center text-ocean">
                  <MessageCircle className="size-4" />
                </span>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-ocean/40">
                    WhatsApp
                  </div>
                  <a href="https://wa.me/917384708532" className="hover:text-ocean">
                    +91 73847 08532
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="size-9 rounded-xl bg-sky-soft flex items-center justify-center text-ocean">
                  <Mail className="size-4" />
                </span>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-ocean/40">
                    Email
                  </div>
                  <a href="mailto:concierge@solo.com" className="hover:text-ocean">
                    concierge@solo.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="size-9 rounded-xl bg-sky-soft flex items-center justify-center text-ocean">
                  <Phone className="size-4" />
                </span>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-ocean/40">
                    Phone
                  </div>
                  <a href="tel:+917384708532" className="hover:text-ocean">
                    +91 73847 08532
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-[24px] p-6 md:p-8 ring-1 ring-black/5 shadow-luxe-sm space-y-4"
          >
            <Field label="Name" error={errors.name?.message}>
              <input {...register("name")} className="w-full bg-sky-soft/60 rounded-xl px-4 py-3 text-sm text-ocean focus:outline-none focus:ring-2 focus:ring-sky-vivid" />
            </Field>
            <Field label="Email" error={errors.email?.message}>
              <input type="email" {...register("email")} className="w-full bg-sky-soft/60 rounded-xl px-4 py-3 text-sm text-ocean focus:outline-none focus:ring-2 focus:ring-sky-vivid" />
            </Field>
            <Field label="Message" error={errors.message?.message}>
              <textarea rows={5} {...register("message")} className="w-full bg-sky-soft/60 rounded-xl px-4 py-3 text-sm text-ocean focus:outline-none focus:ring-2 focus:ring-sky-vivid resize-none" />
            </Field>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-ocean text-white rounded-full py-3 text-sm font-medium hover:bg-ocean/90 transition-colors disabled:opacity-60"
            >
              {isSubmitting ? "Sending…" : "Send message"}
            </button>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-widest text-ocean/40 mb-1">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
