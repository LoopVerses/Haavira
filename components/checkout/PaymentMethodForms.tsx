"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Loader2, Lock } from "lucide-react";
import type { PaymentMethodChoice } from "@/lib/payment-methods";
import type { CheckoutFormData } from "@/lib/checkout-validation";
import type { CartItem } from "@/lib/store";
import { formatPrice } from "@/lib/stripe";

const inputClass =
  "w-full border border-gray-300 bg-white px-4 py-3.5 font-sans text-sm text-black placeholder:text-gray-400 outline-none transition-all focus:border-black focus:ring-1 focus:ring-black";

const stripeElementClass =
  "w-full border border-gray-300 bg-white px-4 py-3.5";

const stripeElementOptions = {
  style: {
    base: {
      fontSize: "14px",
      color: "#111111",
      fontFamily: "Inter, system-ui, sans-serif",
      "::placeholder": { color: "#9ca3af" },
    },
    invalid: { color: "#dc2626" },
  },
};

interface PaymentMethodFormsProps {
  paymentMethod: PaymentMethodChoice;
  form: CheckoutFormData;
  items: CartItem[];
  total: number;
  onError: (message: string) => void;
}

function buildCheckoutPayload(
  paymentMethod: PaymentMethodChoice,
  form: CheckoutFormData,
  items: CartItem[]
) {
  return {
    paymentMethod,
    shipping: form,
    items: items.map((item) => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      size: item.size,
    })),
  };
}

function CardPaymentForm({
  clientSecret,
  form,
  total,
  onError,
}: {
  clientSecret: string;
  form: CheckoutFormData;
  total: number;
  onError: (message: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [cardName, setCardName] = useState(
    `${form.firstName} ${form.lastName}`.trim()
  );

  const handlePay = async () => {
    if (!stripe || !elements) return;

    setLoading(true);
    onError("");

    const card = elements.getElement(CardNumberElement);
    if (!card) {
      onError("Card form is not ready. Please try again.");
      setLoading(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card,
          billing_details: {
            name: cardName,
            email: form.email,
            address: {
              line1: form.addressLine1,
              line2: form.addressLine2 || undefined,
              city: form.city,
              postal_code: form.postcode,
              country: "GB",
            },
          },
        },
      }
    );

    if (error) {
      onError(error.message ?? "Card payment failed.");
      setLoading(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      router.push(
        `/success?method=card&session_id=${paymentIntent.id}${
          paymentIntent.livemode ? "" : "&test=true"
        }`
      );
      return;
    }

    onError("Payment could not be completed.");
    setLoading(false);
  };

  return (
    <div className="space-y-4 border border-gray-200 bg-white p-4 sm:p-6">
      <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
        Card Details
      </p>

      <div className="space-y-1.5">
        <label className="font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-gray-500">
          Name on Card
        </label>
        <input
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          className={inputClass}
          placeholder="As shown on card"
        />
      </div>

      <div className="space-y-1.5">
        <label className="font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-gray-500">
          Card Number
        </label>
        <div className={stripeElementClass}>
          <CardNumberElement options={stripeElementOptions} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-gray-500">
            Expiry
          </label>
          <div className={stripeElementClass}>
            <CardExpiryElement options={stripeElementOptions} />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-gray-500">
            CVC
          </label>
          <div className={stripeElementClass}>
            <CardCvcElement options={stripeElementOptions} />
          </div>
        </div>
      </div>

      <p className="font-mono text-[10px] text-gray-500">
        Test card: 4242 4242 4242 4242 · Any future date · Any CVC
      </p>

      <button
        type="button"
        onClick={handlePay}
        disabled={loading || !cardName.trim()}
        className="flex w-full items-center justify-center gap-2 bg-black py-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Lock className="h-4 w-4" />
            Pay {formatPrice(total)}
          </>
        )}
      </button>
    </div>
  );
}

function StripeWalletForm({
  clientSecret,
  onError,
}: {
  clientSecret: string;
  onError: (message: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    if (!stripe || !elements) return;

    setLoading(true);
    onError("");

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success?method=stripe`,
      },
      redirect: "if_required",
    });

    if (error) {
      onError(error.message ?? "Stripe payment failed.");
      setLoading(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      router.push(
        `/success?method=stripe&session_id=${paymentIntent.id}${
          paymentIntent.livemode ? "" : "&test=true"
        }`
      );
      return;
    }

    onError("Payment could not be completed.");
    setLoading(false);
  };

  return (
    <div className="space-y-4 border border-gray-200 bg-white p-4 sm:p-6">
      <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
        Stripe Secure Payment
      </p>
      <PaymentElement />
      <button
        type="button"
        onClick={handlePay}
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 bg-[#635BFF] py-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirm with Stripe"}
      </button>
    </div>
  );
}

function StripeHostedForm({
  paymentMethod,
  form,
  items,
  clientSecret,
  total,
  onError,
}: {
  paymentMethod: PaymentMethodChoice;
  form: CheckoutFormData;
  items: CartItem[];
  clientSecret: string | null;
  total: number;
  onError: (message: string) => void;
}) {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = useMemo(
    () => (publishableKey ? loadStripe(publishableKey) : null),
    [publishableKey]
  );

  if (!publishableKey) {
    return (
      <div className="border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        Add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to .env.local to enable card
        payments.
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="flex items-center justify-center border border-gray-200 py-10">
        <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      {paymentMethod === "card" ? (
        <CardPaymentForm
          clientSecret={clientSecret}
          form={form}
          total={total}
          onError={onError}
        />
      ) : (
        <StripeWalletForm clientSecret={clientSecret} onError={onError} />
      )}
    </Elements>
  );
}

export default function PaymentMethodForms({
  paymentMethod,
  form,
  items,
  total,
  onError,
}: PaymentMethodFormsProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadIntent = async () => {
      setClientSecret(null);
      try {
        const res = await fetch("/api/checkout/intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            buildCheckoutPayload(paymentMethod, form, items)
          ),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Unable to start payment");
        if (!cancelled) setClientSecret(data.clientSecret);
      } catch (err) {
        if (!cancelled) {
          onError(
            err instanceof Error ? err.message : "Unable to initialize payment"
          );
        }
      }
    };

    loadIntent();
    return () => {
      cancelled = true;
    };
  }, [paymentMethod, form, items, onError]);

  return (
    <StripeHostedForm
      paymentMethod={paymentMethod}
      form={form}
      items={items}
      clientSecret={clientSecret}
      total={total}
      onError={onError}
    />
  );
}
