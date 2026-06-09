"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Lock, ShieldCheck, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/stripe";
import type { CartItem } from "@/lib/store";
import PaymentMethodBadges from "@/components/checkout/PaymentMethodBadges";
import PaymentMethodSelector from "@/components/checkout/PaymentMethodSelector";
import PaymentMethodForms from "@/components/checkout/PaymentMethodForms";
import CheckoutStepBar from "@/components/checkout/CheckoutStepBar";
import {
  isCheckoutDetailsComplete,
  type CheckoutFormData,
} from "@/lib/checkout-validation";
import type { PaymentMethodChoice } from "@/lib/payment-methods";

const inputClass =
  "w-full border border-gray-300 bg-white px-4 py-3.5 font-sans text-sm text-black placeholder:text-gray-400 outline-none transition-all focus:border-black focus:ring-1 focus:ring-black";

const initialForm: CheckoutFormData = {
  email: "",
  firstName: "",
  lastName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  postcode: "",
  country: "United Kingdom",
};

function FormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <h2 className="border-b border-gray-200 pb-3 font-sans text-lg font-bold uppercase tracking-widest text-black">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  id,
  required,
  children,
}: {
  label: string;
  id: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="flex justify-between font-sans text-[11px] font-bold uppercase tracking-[0.1em] text-gray-500"
      >
        {label}
        {required && <span className="text-black">*</span>}
      </label>
      {children}
    </div>
  );
}

function OrderSummaryContent({
  items,
  subtotal,
  total,
}: {
  items: CartItem[];
  subtotal: number;
  total: number;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-sans text-lg font-bold uppercase tracking-widest text-black">
          Order Summary
        </h2>
        <span className="bg-gray-200 px-2 py-1 font-sans text-[11px] font-bold uppercase tracking-widest text-gray-400">
          {items.length} Items
        </span>
      </div>

      <ul className="flex-1 space-y-6 overflow-y-auto pr-2">
        {items.map((item) => (
          <li key={`${item.id}-${item.size}`} className="group flex gap-4">
            <div className="relative h-24 w-20 flex-shrink-0 bg-[#f0f0f0]">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                sizes="80px"
              />
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-black text-[10px] font-bold text-white">
                {item.quantity}
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-center">
              <p className="text-sm font-bold uppercase tracking-wider text-black transition-colors group-hover:text-[#C9A84C]">
                {item.name.replace("HAAVIRA ", "")}
              </p>
              <p className="mt-1 font-sans text-[11px] font-medium uppercase tracking-widest text-gray-500">
                Size: {item.size}
              </p>
              <p className="mt-2 font-sans text-sm font-bold text-black">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 space-y-4 border-t border-gray-200 pt-6">
        <div className="flex items-center justify-between font-sans text-sm text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium text-black">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between font-sans text-sm text-gray-600">
          <span>Shipping</span>
          <span className="font-medium uppercase text-black">Complimentary</span>
        </div>

        <div className="mt-2 flex items-center justify-between border-t border-gray-200 pt-4">
          <span className="font-sans text-sm font-bold uppercase tracking-widest text-black">
            Total
          </span>
          <span className="font-sans text-2xl font-black text-black">
            {formatPrice(total)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) =>
    s.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
  const [form, setForm] = useState<CheckoutFormData>(initialForm);
  const [step, setStep] = useState<"details" | "payment">("details");
  const [error, setError] = useState<string | null>(null);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodChoice>("card");

  const total = subtotal;
  const detailsComplete = isCheckoutDetailsComplete(form);

  const updateField = (field: keyof CheckoutFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) setError(null);
  };

  const handleContinueToPayment = () => {
    if (!detailsComplete) {
      setError("Please fill in all required fields before continuing.");
      return;
    }
    setError(null);
    setStep("payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePaymentError = useCallback((message: string) => {
    setError(message);
  }, []);

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6">
        <h1 className="font-sans text-4xl font-black uppercase tracking-tighter text-black">
          Your bag is empty
        </h1>
        <Link
          href="/products"
          className="mt-6 border-b border-black pb-1 font-sans text-sm font-bold uppercase tracking-widest text-black transition-all hover:border-gray-500 hover:text-gray-500"
        >
          Return To Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <div className="flex w-full justify-end px-6 py-10 lg:w-[55%] lg:px-16 lg:py-16 xl:w-[60%]">
          <div className="w-full max-w-2xl lg:ml-auto">
            <div className="mb-10 flex items-center justify-between">
              <Link
                href="/cart"
                className="group flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 transition-colors hover:text-black"
              >
                <ArrowLeft
                  className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                  strokeWidth={1.5}
                />
                Return to Bag
              </Link>
              <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 text-green-600">
                <Lock className="h-3.5 w-3.5" />
                <span className="font-sans text-[10px] font-bold uppercase tracking-widest">
                  Secure Checkout
                </span>
              </div>
            </div>

            <h1 className="mb-6 font-sans text-4xl font-black uppercase tracking-tighter text-black">
              Checkout
            </h1>

            <CheckoutStepBar step={step} />

            <div className="mb-10 lg:hidden">
              <button
                type="button"
                onClick={() => setSummaryOpen(!summaryOpen)}
                className="flex w-full items-center justify-between border border-gray-200 bg-[#fafafa] p-5"
              >
                <span className="font-sans text-sm font-bold uppercase tracking-widest text-black">
                  Show Order Summary ({formatPrice(total)})
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-black transition-transform duration-300 ${
                    summaryOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {summaryOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border border-t-0 border-gray-200 bg-[#fafafa]"
                  >
                    <div className="p-5">
                      <OrderSummaryContent
                        items={items}
                        subtotal={subtotal}
                        total={total}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {step === "details" ? (
              <div>
                <div className="space-y-12">
                  <FormSection title="Contact Information">
                    <Field label="Email Address" id="email" required>
                      <input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder="Enter your email"
                        className={inputClass}
                      />
                    </Field>
                  </FormSection>

                  <FormSection title="Shipping Address">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field label="First Name" id="firstName" required>
                        <input
                          id="firstName"
                          type="text"
                          required
                          value={form.firstName}
                          onChange={(e) =>
                            updateField("firstName", e.target.value)
                          }
                          placeholder="First name"
                          className={inputClass}
                        />
                      </Field>
                      <Field label="Last Name" id="lastName" required>
                        <input
                          id="lastName"
                          type="text"
                          required
                          value={form.lastName}
                          onChange={(e) =>
                            updateField("lastName", e.target.value)
                          }
                          placeholder="Last name"
                          className={inputClass}
                        />
                      </Field>
                    </div>
                    <Field label="Address Line 1" id="addressLine1" required>
                      <input
                        id="addressLine1"
                        type="text"
                        required
                        value={form.addressLine1}
                        onChange={(e) =>
                          updateField("addressLine1", e.target.value)
                        }
                        placeholder="Street address or P.O. Box"
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Address Line 2 (Optional)" id="addressLine2">
                      <input
                        id="addressLine2"
                        type="text"
                        value={form.addressLine2}
                        onChange={(e) =>
                          updateField("addressLine2", e.target.value)
                        }
                        placeholder="Apartment, suite, unit, building, floor, etc."
                        className={inputClass}
                      />
                    </Field>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <Field label="City" id="city" required>
                        <input
                          id="city"
                          type="text"
                          required
                          value={form.city}
                          onChange={(e) => updateField("city", e.target.value)}
                          placeholder="City"
                          className={inputClass}
                        />
                      </Field>
                      <Field label="Postal Code" id="postcode" required>
                        <input
                          id="postcode"
                          type="text"
                          required
                          value={form.postcode}
                          onChange={(e) =>
                            updateField("postcode", e.target.value)
                          }
                          placeholder="Postal code"
                          className={inputClass}
                        />
                      </Field>
                    </div>
                    <Field label="Country/Region" id="country" required>
                      <input
                        id="country"
                        type="text"
                        required
                        value={form.country}
                        onChange={(e) => updateField("country", e.target.value)}
                        placeholder="Country"
                        className={inputClass}
                      />
                    </Field>
                  </FormSection>

                  <div className="relative">
                    <FormSection title="Payment Method">
                      <div className="pointer-events-none select-none opacity-40">
                        <PaymentMethodSelector
                          value={paymentMethod}
                          onChange={setPaymentMethod}
                          locked
                        />
                      </div>
                    </FormSection>
                    <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[1px]">
                      <div className="flex items-center gap-2 border border-gray-300 bg-white px-4 py-3 shadow-sm">
                        <Lock className="h-4 w-4 text-gray-500" />
                        <p className="font-sans text-xs font-bold uppercase tracking-wider text-gray-600">
                          Complete your details to unlock payment
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="mt-8 flex items-center gap-2 border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                    <ShieldCheck className="h-5 w-5" /> {error}
                  </div>
                )}

                <div className="mt-10 border-t border-gray-200 pt-8">
                  <button
                    type="button"
                    onClick={handleContinueToPayment}
                    disabled={!detailsComplete}
                    className="group flex w-full items-center justify-center gap-3 bg-black py-5 font-sans text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Lock className="h-4 w-4 text-gray-400 transition-colors group-hover:text-white group-disabled:text-gray-500" />
                    Continue to Payment
                  </button>
                  <div className="mt-4 flex items-center justify-center gap-2 text-gray-400">
                    <ShieldCheck className="h-4 w-4" />
                    <span className="text-[10px] font-medium uppercase tracking-widest">
                      Guaranteed Safe Checkout
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-4">
                  <button
                    type="button"
                    onClick={() => {
                      setStep("details");
                      setError(null);
                    }}
                    className="group flex items-center gap-2 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 transition-colors hover:text-black"
                  >
                    <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                    Edit Information
                  </button>
                  <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    {form.email}
                  </p>
                </div>

                <div className="space-y-8">
                  <PaymentMethodSelector
                    value={paymentMethod}
                    onChange={(method) => {
                      setPaymentMethod(method);
                      setError(null);
                    }}
                  />

                  <PaymentMethodForms
                    paymentMethod={paymentMethod}
                    form={form}
                    items={items}
                    total={total}
                    onError={handlePaymentError}
                  />
                </div>

                {error && (
                  <div className="mt-8 flex items-center gap-2 border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                    <ShieldCheck className="h-5 w-5" /> {error}
                  </div>
                )}

                <div className="mt-8 flex items-center justify-center gap-2 text-gray-400">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="text-[10px] font-medium uppercase tracking-widest">
                    Guaranteed Safe Checkout
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="hidden w-full border-l border-gray-200 bg-[#fafafa] lg:block lg:w-[45%] xl:w-[40%]">
          <div className="sticky top-0 h-screen overflow-y-auto px-10 py-16 xl:px-16">
            <OrderSummaryContent
              items={items}
              subtotal={subtotal}
              total={total}
            />

            <div className="mt-12 space-y-6 border-t border-gray-200 pt-8">
              <PaymentMethodBadges />
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-500">
                  <ShieldCheck className="h-5 w-5" />
                  <p className="text-xs font-medium">14-Day easy return policy</p>
                </div>
                <div className="flex items-center gap-3 text-gray-500">
                  <Lock className="h-5 w-5" />
                  <p className="text-xs font-medium">Powered by Stripe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
