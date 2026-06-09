import Image from "next/image";

const PAYMENT_LOGOS = [
  { src: "/Images/payments/visa.svg", alt: "Visa", width: 48, height: 16 },
  { src: "/Images/payments/mastercard.svg", alt: "Mastercard", width: 40, height: 28 },
  { src: "/Images/payments/amex.svg", alt: "American Express", width: 40, height: 28 },
  { src: "/Images/payments/paypal.svg", alt: "PayPal", width: 72, height: 20 },
  { src: "/Images/payments/stripe.svg", alt: "Stripe", width: 56, height: 24 },
  { src: "/Images/payments/payoneer.svg", alt: "Payoneer", width: 88, height: 20 },
] as const;

export default function PaymentMethodBadges() {
  return (
    <div className="space-y-4">
      <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
        Accepted Payment Methods
      </p>

      <div className="flex flex-wrap items-center gap-3">
        {PAYMENT_LOGOS.map((logo) => (
          <div
            key={logo.alt}
            className="flex h-12 min-w-[4.75rem] items-center justify-center rounded-md border border-gray-200 bg-white px-3 py-2 shadow-sm"
            title={logo.alt}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="h-auto max-h-7 w-auto object-contain"
              unoptimized
            />
          </div>
        ))}
      </div>

      <p className="text-xs leading-relaxed text-gray-500">
        Payments are processed securely through{" "}
        <span className="font-semibold text-black">Stripe</span>. Card and PayPal
        (when enabled in your Stripe account) are supported at checkout.
      </p>
    </div>
  );
}
