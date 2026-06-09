"use client";

import Link from "next/link";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useCartStore } from "@/lib/store";

function SuccessContent() {
  const searchParams = useSearchParams();
  const items = useCartStore((s) => s.items);

  const method = searchParams.get("method") ?? "card";
  const isTest = searchParams.get("test") === "true";
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (items.length > 0) {
      useCartStore.setState({ items: [] });
    }
  }, [items.length]);

  const methodLabel =
    method === "paypal"
      ? "PayPal"
      : method === "stripe"
        ? "Stripe"
        : method === "payoneer"
          ? "Payoneer"
          : "Card";

  return (
    <div
      className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-12 text-center sm:px-6"
      style={{ backgroundColor: "#080808" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-lg"
      >
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-gold">
          HAAVIRA
        </p>

        <h1 className="mt-6 font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          ORDER CONFIRMED
        </h1>

        <p className="mt-4 font-mono text-xs uppercase tracking-widest text-gold">
          Paid via {methodLabel}
          {isTest ? " (Test Mode)" : ""}
        </p>

        <p className="mt-6 text-base leading-relaxed text-muted">
          Thank you for your order. You will receive a confirmation email shortly
          with your order details and tracking information.
        </p>

        {sessionId && (
          <p className="mt-4 font-mono text-[10px] text-muted/70">
            Ref: {sessionId.slice(0, 24)}...
          </p>
        )}

        <Link
          href="/products"
          className="mt-10 inline-block border border-gold px-10 py-4 font-mono text-sm tracking-wide text-gold transition-all duration-300 hover:bg-gold hover:text-background"
        >
          BACK TO SHOP →
        </Link>
      </motion.div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] bg-[#080808]" />}>
      <SuccessContent />
    </Suspense>
  );
}
