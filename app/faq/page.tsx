import type { Metadata } from "next";
import InfoPageLayout, { InfoSection } from "@/components/info/InfoPageLayout";
import FaqAccordion from "@/components/info/FaqAccordion";
import { FAQ_SECTIONS } from "@/lib/faq-content";

export const metadata: Metadata = {
  title: "FAQ | HAAVIRA",
  description: "Frequently asked questions about HAAVIRA orders, shipping, returns, and products.",
};

export default function FaqPage() {
  return (
    <InfoPageLayout title="Frequently Asked Questions" eyebrow="Help Centre">
      <p>
        Find answers to common questions about orders, products, returns, and
        payments. Can&apos;t find what you need? Email{" "}
        <a
          href="mailto:support@haavira.com"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          support@haavira.com
        </a>
        .
      </p>

      <div className="space-y-12">
        {FAQ_SECTIONS.map((section) => (
          <InfoSection key={section.title} title={section.title}>
            <FaqAccordion items={section.items} />
          </InfoSection>
        ))}
      </div>
    </InfoPageLayout>
  );
}
