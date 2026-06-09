"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import products from "@/lib/products";

const SECTION_BG = "/Images/havara 8.jpeg";
const SECTION_PRODUCT = "/Images/Main_product_1.png";

const leatherProduct =
  products.find((p) => p.slug === "leather-jacket") ?? products[3];

const features = [
  "100% Genuine Leather",
  "Premium Handmade Construction",
  "Luxury Black Leather Finish",
  "Premium Quality Metal Zippers",
  "Soft Comfortable Inner Lining",
  "Multiple Secure Pockets",
  "Timeless Biker Inspired Design",
];

const highlights = [
  "Casual Wear",
  "Smart Casual",
  "Evening Events",
  "Travel",
  "Everyday Luxury",
];

export default function GenuineLeatherSection() {
  return (
    <section
      className="relative min-h-[560px] overflow-x-clip bg-white sm:min-h-[620px] lg:min-h-[680px]"
      aria-label="Genuine Leather Jacket"
    >
      <div className="section-bg-image absolute inset-0">
        <div className="relative h-full w-full">
          <Image
            src={SECTION_BG}
            alt=""
            fill
            className="object-cover object-[65%_center]"
            sizes="100vw"
          />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-white/78 to-white/92" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/65 via-white/15 to-white/40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_45%,rgba(201,168,76,0.16),transparent_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_55%,rgba(255,255,255,0.55),transparent_52%)]" />

      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
      <div className="absolute bottom-0 left-0 h-px w-full bg-border" />

      <span className="pointer-events-none absolute left-4 top-8 font-display text-[100px] font-bold text-surface sm:text-[140px] lg:left-12 lg:top-12 lg:text-[200px]">
        01
      </span>

      <div className="site-container relative z-10 flex min-h-[560px] items-center py-16 sm:min-h-[620px] sm:py-20 lg:min-h-[680px] lg:py-24">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 xl:gap-16">
          <div className="relative mx-auto w-full lg:mx-0 lg:max-w-none lg:justify-self-start">
            <div className="relative aspect-[4/5] w-full max-w-[440px] sm:max-w-[500px] lg:max-w-[560px] xl:max-w-[600px]">
              <div className="product-float-y absolute inset-0">
                <Image
                  src={SECTION_PRODUCT}
                  alt="HAAVIRA Genuine Leather Jacket — Main_product_1"
                  fill
                  className="object-contain drop-shadow-[0_28px_50px_rgba(0,0,0,0.18)]"
                  sizes="(max-width: 1024px) 90vw, 600px"
                />
              </div>
            </div>
          </div>

          <div className="max-w-xl lg:justify-self-end">
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-10 bg-gold" />
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.4em] text-gold sm:text-[11px]">
                Premium Collection
              </p>
            </div>

            <h2 className="font-display text-3xl font-bold leading-[1.05] text-foreground sm:text-4xl md:text-5xl lg:text-[52px]">
              Genuine Leather Jacket
            </h2>

            <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
              Experience luxury craftsmanship with the HAAVIRA Genuine Leather
              Jacket. Made from premium genuine leather and finished with
              high-quality hardware, premium lining, and durable stitching for
              long-lasting wear.
            </p>

            <ul className="mt-8 space-y-3">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm text-muted"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-2">
              {highlights.map((item) => (
                <span
                  key={item}
                  className="border border-border bg-white/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <p className="font-mono text-2xl font-bold text-gold">
                {leatherProduct.priceDisplay}
              </p>
              <Link
                href={`/products/${leatherProduct.slug}`}
                className="group inline-flex items-center gap-2 bg-foreground px-8 py-4 font-mono text-[11px] font-semibold uppercase tracking-widest text-white transition-all hover:opacity-90"
              >
                Shop Now
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
