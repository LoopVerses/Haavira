export type PaymentMethodChoice = "card" | "paypal" | "stripe" | "payoneer";

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
    id: "paypal",
    label: "PayPal",
    description: "Pay with your PayPal account",
    flowHint: "You will be redirected to PayPal to log in and approve payment.",
    logos: ["paypal"],
  },
  {
    id: "stripe",
    label: "Stripe",
    description: "Stripe secure checkout (Card + Link)",
    flowHint: "Stripe hosted checkout with saved cards and Link where available.",
    logos: ["stripe"],
  },
  {
    id: "payoneer",
    label: "Payoneer",
    description: "Payoneer wallet checkout",
    flowHint:
      "Test mode: simulated Payoneer flow. Live Payoneer requires separate merchant setup.",
    logos: ["payoneer"],
  },
];

export function getPaymentMethodOption(id: PaymentMethodChoice) {
  return PAYMENT_METHOD_OPTIONS.find((option) => option.id === id);
}

export function getCheckoutButtonLabel(method: PaymentMethodChoice) {
  switch (method) {
    case "card":
      return "Continue to Card Payment";
    case "paypal":
      return "Continue with PayPal";
    case "stripe":
      return "Continue with Stripe";
    case "payoneer":
      return "Continue with Payoneer";
    default:
      return "Continue to Payment";
  }
}
