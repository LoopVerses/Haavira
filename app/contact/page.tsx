import type { Metadata } from "next";
import Link from "next/link";
import InfoPageLayout, { InfoSection } from "@/components/info/InfoPageLayout";
import { SOCIAL_LINKS } from "@/lib/social-links";
import { Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact | HAAVIRA",
  description: "Get in touch with HAAVIRA customer support.",
};

export default function ContactPage() {
  return (
    <InfoPageLayout title="Contact Us" eyebrow="Support">
      <p>
        Our team is here to help with orders, sizing, returns, and any questions
        about HAAVIRA products.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="border border-border bg-surface p-6">
          <Mail className="h-5 w-5 text-gold" />
          <h2 className="mt-4 font-sans text-sm font-bold uppercase tracking-wide text-foreground">
            Email
          </h2>
          <a
            href="mailto:support@haavira.com"
            className="mt-2 inline-block text-sm font-medium text-foreground underline-offset-4 hover:underline"
          >
            support@haavira.com
          </a>
          <p className="mt-2 text-sm text-muted">
            We aim to respond within 1–2 business days.
          </p>
        </div>

        <div className="border border-border bg-surface p-6">
          <MapPin className="h-5 w-5 text-gold" />
          <h2 className="mt-4 font-sans text-sm font-bold uppercase tracking-wide text-foreground">
            Location
          </h2>
          <p className="mt-2 text-sm text-muted">
            United Kingdom
            <br />
            Premium streetwear, shipped worldwide.
          </p>
        </div>
      </div>

      <InfoSection title="Follow Us">
        <p>Stay updated on new releases, drops, and exclusive offers.</p>
        <div className="flex flex-wrap gap-4">
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-widest text-foreground underline-offset-4 hover:underline"
          >
            Instagram
          </a>
          <a
            href={SOCIAL_LINKS.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-widest text-foreground underline-offset-4 hover:underline"
          >
            TikTok
          </a>
        </div>
      </InfoSection>

      <InfoSection title="Helpful Links">
        <ul className="space-y-2">
          <li>
            <Link href="/faq" className="underline-offset-4 hover:underline">
              Frequently Asked Questions
            </Link>
          </li>
          <li>
            <Link href="/shipping" className="underline-offset-4 hover:underline">
              Shipping Policy
            </Link>
          </li>
          <li>
            <Link href="/returns" className="underline-offset-4 hover:underline">
              Returns & Refunds
            </Link>
          </li>
        </ul>
      </InfoSection>
    </InfoPageLayout>
  );
}
