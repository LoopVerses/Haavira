"use client";

import Image from "next/image";
import type { PaymentMethodChoice } from "@/lib/payment-methods";
import { PAYMENT_METHOD_OPTIONS } from "@/lib/payment-methods";

const LOGO_MAP: Record<string, string> = {
  visa: "/Images/payments/visa.svg",
  mastercard: "/Images/payments/mastercard.svg",
  amex: "/Images/payments/amex.svg",
  paypal: "/Images/payments/paypal.svg",
  stripe: "/Images/payments/stripe.svg",
  payoneer: "/Images/payments/payoneer.svg",
};

interface PaymentMethodSelectorProps {
  value: PaymentMethodChoice;
  onChange: (value: PaymentMethodChoice) => void;
  locked?: boolean;
}

export default function PaymentMethodSelector({
  value,
  onChange,
  locked = false,
}: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-4">
      <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
        Choose Payment Method
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {PAYMENT_METHOD_OPTIONS.map((option) => {
          const isActive = value === option.id;

          return (
            <button
              key={option.id}
              type="button"
              disabled={locked}
              onClick={() => onChange(option.id)}
              className={`flex flex-col items-start gap-3 border p-4 text-left transition-all ${
                isActive
                  ? "border-black bg-black text-white shadow-md"
                  : "border-gray-200 bg-white text-black hover:border-gray-400"
              } ${locked ? "cursor-not-allowed" : ""}`}
            >
              <div className="flex w-full items-center justify-between gap-3">
                <span className="font-sans text-xs font-bold uppercase tracking-wider">
                  {option.label}
                </span>
                <span
                  className={`h-4 w-4 rounded-full border-2 ${
                    isActive ? "border-white bg-white" : "border-gray-300"
                  }`}
                />
              </div>

              <p
                className={`text-[11px] leading-relaxed ${
                  isActive ? "text-white/80" : "text-gray-500"
                }`}
              >
                {option.description}
              </p>

              <div className="flex flex-wrap items-center gap-2">
                {option.logos.map((logo) => (
                  <div
                    key={logo}
                    className={`flex h-8 items-center justify-center rounded px-2 ${
                      isActive ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <Image
                      src={LOGO_MAP[logo]}
                      alt={logo}
                      width={56}
                      height={18}
                      className="h-4 w-auto object-contain"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
