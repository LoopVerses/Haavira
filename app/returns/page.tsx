import type { Metadata } from "next";
import InfoPageLayout, { InfoList, InfoSection } from "@/components/info/InfoPageLayout";

export const metadata: Metadata = {
  title: "Returns & Refund Policy | HAAVIRA",
  description: "HAAVIRA returns, refunds, and exchange policy.",
};

export default function ReturnsPage() {
  return (
    <InfoPageLayout title="Returns & Refund Policy">
      <p>We want you to be completely satisfied with your purchase.</p>

      <InfoSection title="Returns">
        <p>Items may be returned within 14 days of delivery.</p>
        <p>To qualify for a return:</p>
        <InfoList
          items={[
            "Item must be unworn",
            "Item must be unused",
            "Original tags must remain attached",
            "Item must be returned in original condition",
          ]}
        />
      </InfoSection>

      <InfoSection title="Non-Returnable Items">
        <p>Returns may not be accepted for:</p>
        <InfoList
          items={[
            "Customised products",
            "Personalised products",
            "Items damaged through misuse",
          ]}
        />
      </InfoSection>

      <InfoSection title="Refunds">
        <p>
          Once your return is received and inspected, we will notify you
          regarding approval. Approved refunds will be issued to the original
          payment method within 5–10 business days.
        </p>
      </InfoSection>

      <InfoSection title="Return Shipping">
        <p>
          Customers are responsible for return shipping costs unless the item
          received is faulty or incorrect.
        </p>
      </InfoSection>

      <InfoSection title="Damaged or Incorrect Orders">
        <p>
          If you receive a damaged or incorrect item, please contact us within 48
          hours of delivery with photographs of the issue.
        </p>
        <p>
          Contact:{" "}
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
