"use client";

import Image from "next/image";
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
    <div className="space-y-4 border border-gray-200 bg-white p-6">
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
    <div className="space-y-4 border border-gray-200 bg-white p-6">
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

function RedirectPaymentPanel({
  title,
  description,
  buttonLabel,
  logo,
  logoAlt,
  paymentMethod,
  form,
  items,
  onError,
}: {
  title: string;
  description: string;
  buttonLabel: string;
  logo: string;
  logoAlt: string;
  paymentMethod: PaymentMethodChoice;
  form: CheckoutFormData;
  items: CartItem[];
  onError: (message: string) => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleRedirect = async () => {
    setLoading(true);
    onError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          buildCheckoutPayload(paymentMethod, form, items)
        ),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Checkout failed");
      if (data.url) window.location.href = data.url;
    } catch (err) {
      onError(err instanceof Error ? err.message : "Payment failed.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5 border border-gray-200 bg-white p-6 text-center">
      <Image
        src={logo}
        alt={logoAlt}
        width={120}
        height={32}
        className="mx-auto h-8 w-auto object-contain"
        unoptimized
      />
      <div>
        <p className="font-sans text-sm font-bold text-black">{title}</p>
        <p className="mt-2 text-xs leading-relaxed text-gray-500">{description}</p>
      </div>
      <button
        type="button"
        onClick={handleRedirect}
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 border border-black bg-white py-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-black transition-colors hover:bg-black hover:text-white disabled:opacity-60"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : buttonLabel}
      </button>
    </div>
  );
}

function PayoneerPaymentForm({
  form,
  items,
  total,
  onError,
}: {
  form: CheckoutFormData;
  items: CartItem[];
  total: number;
  onError: (message: string) => void;
}) {
  const [payoneerEmail, setPayoneerEmail] = useState(form.email);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    if (!payoneerEmail.trim() || !password.trim()) {
      onError("Enter your Payoneer email and password.");
      return;
    }

    setLoading(true);
    onError("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          buildCheckoutPayload("payoneer", { ...form, email: payoneerEmail }, items)
        ),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Payoneer checkout failed");
      if (data.url) window.location.href = data.url;
    } catch (err) {
      onError(err instanceof Error ? err.message : "Payoneer payment failed.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 border border-gray-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
          Payoneer Account
        </p>
        <Image
          src="/Images/payments/payoneer.svg"
          alt="Payoneer"
          width={90}
          height={20}
          className="h-5 w-auto"
          unoptimized
        />
      </div>

      <div className="space-y-1.5">
        <label className="font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-gray-500">
          Payoneer Email
        </label>
        <input
          type="email"
          value={payoneerEmail}
          onChange={(e) => setPayoneerEmail(e.target.value)}
          className={inputClass}
          placeholder="your@payoneer.com"
        />
      </div>

      <div className="space-y-1.5">
        <label className="font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-gray-500">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
          placeholder="Enter Payoneer password"
        />
      </div>

      <p className="text-xs text-gray-500">
        Test mode only. Amount: <strong>{formatPrice(total)}</strong>
      </p>

      <button
        type="button"
        onClick={handlePay}
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 bg-[#FF4800] py-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Pay with Payoneer"}
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
    if (paymentMethod !== "card" && paymentMethod !== "stripe") {
      setClientSecret(null);
      return;
    }

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

  if (paymentMethod === "card" || paymentMethod === "stripe") {
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

  if (paymentMethod === "paypal") {
    return (
      <RedirectPaymentPanel
        title="Pay with PayPal"
        description="You will be redirected to PayPal to securely log in and approve your payment."
        buttonLabel="Continue to PayPal"
        logo="/Images/payments/paypal.svg"
        logoAlt="PayPal"
        paymentMethod="paypal"
        form={form}
        items={items}
        onError={onError}
      />
    );
  }

  return (
    <PayoneerPaymentForm
      form={form}
      items={items}
      total={total}
      onError={onError}
    />
  );
}
