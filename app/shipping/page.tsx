import type { Metadata } from "next";
import InfoPageLayout, { InfoList, InfoSection } from "@/components/info/InfoPageLayout";

export const metadata: Metadata = {
  title: "Shipping Policy | HAAVIRA",
  description: "HAAVIRA shipping times, tracking, and international delivery information.",
};

export default function ShippingPage() {
  return (
    <InfoPageLayout title="Shipping Policy">
      <InfoSection title="Processing Time">
        <p>
          All orders are processed within 1–3 business days after payment
          confirmation.
        </p>
      </InfoSection>

      <InfoSection title="United Kingdom">
        <InfoList
          items={[
            "Standard Delivery: 2–5 business days",
            "Express Delivery: 1–2 business days (if available)",
          ]}
        />
      </InfoSection>

      <InfoSection title="International Shipping">
        <p>
          Delivery times vary depending on destination and customs processing.
          Estimated delivery:
        </p>
        <InfoList
          items={[
            "Europe: 5–10 business days",
            "USA & Canada: 7–14 business days",
            "Rest of World: 7–21 business days",
          ]}
        />
      </InfoSection>

      <InfoSection title="Tracking">
        <p>
          All orders are provided with tracking information where available.
        </p>
      </InfoSection>

      <InfoSection title="Customs & Duties">
        <p>
          International customers are responsible for any customs duties, taxes,
          or import charges applied by their country. HAAVIRA is not responsible
          for delays caused by customs or courier services.
        </p>
      </InfoSection>
    </InfoPageLayout>
  );
}
