import type { Metadata } from "next";
import InfoPageLayout, { InfoSection } from "@/components/info/InfoPageLayout";

export const metadata: Metadata = {
  title: "About Us | HAAVIRA",
  description:
    "Learn about HAAVIRA — premium UK streetwear built on confidence, individuality, and ambition.",
};

export default function AboutPage() {
  return (
    <InfoPageLayout title="About HAAVIRA" eyebrow="Our Story">
      <p>
        HAAVIRA was created with a simple vision: to build premium clothing that
        stands for confidence, individuality, and ambition.
      </p>

      <InfoSection title="Quality Over Quantity">
        <p>
          Founded in the United Kingdom, HAAVIRA is a modern streetwear brand
          focused on quality over quantity. Every hoodie and jacket is designed
          with attention to detail, combining premium materials, unique artwork,
          and durable craftsmanship to create pieces that are built to last.
        </p>
      </InfoSection>

      <InfoSection title="Our Mindset">
        <p>
          Our collections are inspired by the mindset of those who choose their
          own path, embrace challenges, and refuse to settle for ordinary. From
          heavyweight cotton fleece hoodies to genuine leather jackets, every
          product reflects our commitment to quality, comfort, and style.
        </p>
      </InfoSection>

      <InfoSection title="More Than Fashion">
        <p>
          At HAAVIRA, we believe clothing is more than what you wear—it is a
          reflection of who you are. That&apos;s why we create designs that carry
          meaning, confidence, and purpose. Whether it&apos;s our signature
          embroidered hoodies, statement graphics, or premium leather pieces,
          every item is made to help you stand out and express your identity.
        </p>
      </InfoSection>

      <div className="space-y-2 border-l-2 border-gold pl-6 pt-2">
        <p className="font-display text-xl font-semibold text-foreground sm:text-2xl">
          This is more than fashion.
        </p>
        <p className="font-display text-xl font-semibold text-foreground sm:text-2xl">
          This is a mindset.
        </p>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-gold">
          HAAVIRA — Born Different. Built Unstoppable.
        </p>
      </div>
    </InfoPageLayout>
  );
}
