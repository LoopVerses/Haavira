export type PaymentMethodChoice = "card" | "stripe";

export interface PaymentMethodOption {
  id: PaymentMethodChoice;
  label: string;
  description: string;
  flowHint: string;
  logos: string[];
}

export const PAYMENT_METHOD_OPTIONS: PaymentMethodOption[] = [
  {
    id: "card",
    label: "Credit / Debit Card",
    description: "Pay with Visa, Mastercard, or Amex",
    flowHint: "Enter card number, expiry, and CVC in the secure form below.",
    logos: ["visa", "mastercard", "amex"],
  },
  {
    id: "stripe",
    label: "Stripe",
    description: "Stripe secure checkout (Card + Link)",
    flowHint: "Stripe hosted checkout with saved cards and Link where available.",
    logos: ["stripe"],
  },
];

export function getPaymentMethodOption(id: PaymentMethodChoice) {
  return PAYMENT_METHOD_OPTIONS.find((option) => option.id === id);
}

export function getCheckoutButtonLabel(method: PaymentMethodChoice) {
  switch (method) {
    case "card":
      return "Continue to Card Payment";
    case "stripe":
      return "Continue with Stripe";
    default:
      return "Continue to Payment";
  }
}
