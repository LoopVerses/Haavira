import type { Metadata } from "next";
import InfoPageLayout, { InfoList, InfoSection } from "@/components/info/InfoPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | HAAVIRA",
  description: "How HAAVIRA collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <InfoPageLayout title="Privacy Policy">
      <p>
        At HAAVIRA, we respect your privacy and are committed to protecting your
        personal information.
      </p>

      <InfoSection title="Information We Collect">
        <p>We may collect information including:</p>
        <InfoList
          items={[
            "Name",
            "Email address",
            "Shipping address",
            "Billing information",
            "Order history",
          ]}
        />
      </InfoSection>

      <InfoSection title="How We Use Your Information">
        <p>This information is used to:</p>
        <InfoList
          items={[
            "Process orders",
            "Provide customer support",
            "Improve our website and services",
            "Send order updates",
          ]}
        />
      </InfoSection>

      <InfoSection title="Sharing Your Information">
        <p>
          We do not sell or share your personal information with third parties
          except where required to process payments, deliver orders, or comply
          with legal obligations.
        </p>
      </InfoSection>

      <InfoSection title="Security">
        <p>
          We use secure payment providers and industry-standard security measures
          to protect your data.
        </p>
      </InfoSection>

      <InfoSection title="Your Agreement">
        <p>By using our website, you agree to this Privacy Policy.</p>
        <p>
          For privacy-related enquiries contact:{" "}
          <a
            href="mailto:support@haavira.com"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            support@haavira.com
          </a>
        </p>
      </InfoSection>
    </InfoPageLayout>
  );
}
