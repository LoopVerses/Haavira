"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, ShieldCheck, Sparkles, RotateCcw } from "lucide-react";

const announcements = [
  {
    id: "delivery",
    text: "Free UK Delivery On All Orders",
    mobileText: "Free UK Delivery",
    icon: Truck,
  },
  {
    id: "brand",
    text: "Born Different. Built Unstoppable. — HAAVIRA",
    mobileText: "Born Different. Built Unstoppable.",
    icon: Sparkles,
  },
  {
    id: "drops",
    text: "Limited Edition Streetwear Drops — Shop The Collection",
    mobileText: "Shop Limited Edition Drops",
    icon: Sparkles,
    href: "/products",
  },
  {
    id: "secure",
    text: "Secure Checkout · 14-Day Easy Returns",
    mobileText: "Secure Checkout · Easy Returns",
    icon: ShieldCheck,
  },
  {
    id: "tagline",
    text: "Designed To Define You — Premium Luxury Streetwear",
    mobileText: "Designed To Define You",
    icon: Sparkles,
  },
];

const transitionEase = [0.22, 1, 0.36, 1] as const;

export const TOPBAR_HEIGHT = 36;

export default function TopBar() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const current = announcements[activeIndex];
  const Icon = current.icon;

  return (
    <div
      className="fixed left-0 right-0 top-0 z-[60] border-b border-white/10 bg-foreground pt-[var(--safe-top)] text-white"
      role="region"
      aria-label="Store announcements"
    >
      <div className="mx-auto flex h-9 max-w-[1600px] items-center justify-between px-3 sm:px-6 md:px-8 lg:px-12">
        <p className="hidden items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70 lg:flex">
          <Truck className="h-3 w-3 text-gold" strokeWidth={2} />
          Free UK Delivery
        </p>

        <div className="relative flex min-w-0 flex-1 items-center justify-center overflow-hidden px-1 sm:px-4 md:px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: transitionEase }}
              className="flex w-full min-w-0 items-center justify-center gap-2 text-center"
            >
              <Icon
                className="hidden h-3.5 w-3.5 shrink-0 text-gold sm:block"
                strokeWidth={2}
              />
              {current.href ? (
                <Link
                  href={current.href}
                  className="truncate font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:text-gold sm:text-[11px] sm:tracking-[0.22em]"
                >
                  <span className="sm:hidden">{current.mobileText}</span>
                  <span className="hidden sm:inline">{current.text}</span>
                </Link>
              ) : (
                <p className="truncate font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-white sm:text-[11px] sm:tracking-[0.22em]">
                  <span className="sm:hidden">{current.mobileText}</span>
                  <span className="hidden sm:inline">{current.text}</span>
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="hidden items-center gap-4 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70 lg:flex">
          <span className="flex items-center gap-1.5">
            <RotateCcw className="h-3 w-3 text-gold" strokeWidth={2} />
            14-Day Returns
          </span>
          <span className="h-3 w-px bg-white/20" aria-hidden />
          <Link
            href="/products"
            className="text-gold transition-opacity hover:opacity-80"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}
