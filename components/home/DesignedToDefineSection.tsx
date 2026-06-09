"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import products from "@/lib/products";
import { luxuryEase } from "@/lib/motion";

const SECTION_BG = "/Images/havara 8.jpeg";
const SECTION_PRODUCT = "/Images/Main_product_2.png";

const leatherProduct =
  products.find((p) => p.slug === "leather-jacket") ?? products[3];

const features = [
  "Tailored Biker Silhouette With Structured Fit",
  "Antique Gold Hardware For A Luxury Finish",
  "Quilted Shoulder Panels & Reinforced Seams",
  "Soft Inner Lining For All-Day Comfort",
  "Versatile Styling From Day To Evening",
];

const highlights = ["S", "M", "L", "XL", "Free UK Delivery"];

export default function DesignedToDefineSection() {
  return (
    <section
      className="relative min-h-[480px] overflow-x-clip sm:min-h-[560px] lg:min-h-[680px]"
      aria-label="Designed To Define You"
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: luxuryEase }}
      >
        <div className="relative h-full w-full">
          <Image
            src={SECTION_BG}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(201,168,76,0.18),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_40%,rgba(201,168,76,0.1),transparent_50%)]" />

      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-gold to-transparent opacity-90" />
      <div className="absolute bottom-0 left-0 h-px w-full bg-white/10" />

      <span className="pointer-events-none absolute right-4 top-8 font-display text-[100px] font-bold text-white/[0.04] sm:text-[140px] lg:right-12 lg:top-12 lg:text-[200px]">
        02
      </span>

      <div className="site-container relative z-10 flex min-h-[480px] items-center py-12 sm:min-h-[560px] sm:py-20 lg:min-h-[680px] lg:py-24">
        <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ x: -48 }}
            whileInView={{ x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: luxuryEase }}
            className="max-w-xl lg:order-1"
          >
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-10 bg-gold" />
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.4em] text-gold sm:text-[11px]">
                Signature Craftsmanship
              </p>
            </div>

            <h2 className="font-display text-3xl font-bold leading-[1.05] text-white sm:text-4xl md:text-5xl lg:text-[52px]">
              Designed To Define You
            </h2>

            <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
              The HAAVIRA leather jacket is engineered for men who demand presence
              without compromise. From quilted shoulder detailing to precision
              metal hardware, every element reflects premium street-luxury
              standards made for real-world wear.
            </p>

            <ul className="mt-8 space-y-3">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm text-white/80"
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
                  className="border border-white/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white/60"
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
                className="group inline-flex items-center gap-2 bg-white px-8 py-4 font-mono text-[11px] font-semibold uppercase tracking-widest text-black transition-all hover:bg-gold"
              >
                Shop Now
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 48, scale: 0.94 }}
            whileInView={{ x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: luxuryEase }}
            className="relative mx-auto w-full max-w-md lg:order-2 lg:max-w-none lg:justify-self-end"
          >
            <div className="relative aspect-[4/5] w-full max-w-[380px] lg:ml-auto lg:max-w-[420px]">
              <motion.div
                animate={{ y: [0, -16, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0"
              >
                <Image
                  src={SECTION_PRODUCT}
                  alt="HAAVIRA Genuine Leather Jacket — Main_product_2"
                  fill
                  className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
                  sizes="(max-width: 1024px) 80vw, 420px"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
