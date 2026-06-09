"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { LEATHER_GALLERY_IMAGES } from "@/lib/products";
import { luxuryEase } from "@/lib/motion";

const AUTOPLAY_MS = 4500;

export default function LeatherDetailGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const total = LEATHER_GALLERY_IMAGES.length;
  const activeImage = LEATHER_GALLERY_IMAGES[activeIndex];

  const goTo = (index: number, dir: number) => {
    setDirection(dir);
    setActiveIndex((index + total) % total);
  };

  const goPrev = () => goTo(activeIndex - 1, -1);
  const goNext = () => goTo(activeIndex + 1, 1);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % total);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [isPaused, total]);

  return (
    <section
      className="bg-surface px-[var(--container-px)] py-16 sm:py-20 lg:py-24"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Leather jacket detail gallery"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 sm:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.35em] text-gold">
              Craftsmanship Details
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl md:text-4xl">
              Every Angle. Every Detail.
            </h2>
            <p className="mt-3 max-w-lg text-sm text-muted sm:text-base">
              Explore the HAAVIRA leather jacket through premium close-ups —
              texture, hardware, lining, and finish.
            </p>
          </div>
          <Link
            href="/products/leather-jacket"
            className="inline-flex items-center gap-2 self-start font-mono text-[11px] font-semibold uppercase tracking-widest text-foreground transition-colors hover:text-gold md:self-auto"
          >
            View Full Jacket
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-10">
          <div className="relative overflow-hidden border border-border bg-white shadow-product-lg">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeImage}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 80 : -80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
                transition={{ duration: 0.5, ease: luxuryEase }}
                className="relative aspect-[4/5] w-full sm:aspect-[5/6]"
              >
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeImage}
                    alt={`Leather jacket detail ${activeIndex + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority={activeIndex === 0}
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest backdrop-blur-sm">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-3 sm:gap-3">
              {LEATHER_GALLERY_IMAGES.map((img, index) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => goTo(index, index > activeIndex ? 1 : -1)}
                  className={`relative aspect-square overflow-hidden border transition-all duration-300 ${
                    activeIndex === index
                      ? "border-foreground ring-1 ring-foreground"
                      : "border-border opacity-75 hover:border-foreground/50 hover:opacity-100"
                  }`}
                  aria-label={`View detail image ${index + 1}`}
                >
                  <Image
                    src={img}
                    alt={`Leather detail thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                </button>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
              <button
                type="button"
                onClick={goPrev}
                className="flex h-11 w-11 items-center justify-center border border-border bg-white transition-colors hover:border-foreground"
                aria-label="Previous detail"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted">
                Havara 24 — 32 Collection
              </p>
              <button
                type="button"
                onClick={goNext}
                className="flex h-11 w-11 items-center justify-center border border-border bg-white transition-colors hover:border-foreground"
                aria-label="Next detail"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
