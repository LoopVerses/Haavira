"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const FEATURE_IMAGES = {
  light: "/Images/Main_product_1.png",
  dark: "/Images/Main_product_2.png",
} as const;

interface FeatureShowcaseProps {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  features: string[];
  highlights?: string[];
  price: string;
  slug: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
  variant?: "light" | "dark";
}

const luxuryEase = [0.22, 1, 0.36, 1] as const;

export default function FeatureShowcase({
  number,
  eyebrow,
  title,
  description,
  features,
  highlights,
  price,
  slug,
  imageAlt,
  imagePosition = "left",
  variant = "light",
}: FeatureShowcaseProps) {
  const isDark = variant === "dark";
  const imageFirst = imagePosition === "left";
  const image = FEATURE_IMAGES[variant];

  const imageBlock = (
    <motion.div
      initial={{ opacity: 0, x: imageFirst ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: luxuryEase }}
      className={`relative ${imageFirst ? "" : "lg:order-2"}`}
    >
      <span
        className={`pointer-events-none absolute -top-4 font-display text-[72px] font-bold sm:text-[100px] lg:-top-6 lg:text-[140px] ${
          imageFirst ? "-left-2 text-surface sm:-left-4" : "-right-2 text-white/80 sm:-right-4"
        } ${isDark && imageFirst ? "text-white/10" : ""}`}
      >
        {number}
      </span>

      <motion.div
        animate={{ y: [0, -18, 0] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative aspect-[4/5] w-full bg-transparent md:aspect-[5/6]"
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </motion.div>
    </motion.div>
  );

  const contentBlock = (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: 0.15, ease: luxuryEase }}
      className={`flex flex-col justify-center ${imageFirst ? "" : "lg:order-1"}`}
    >
      <div className="mb-4 flex items-center gap-4">
        <span className="h-px w-12 bg-gold" />
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.35em] text-gold">
          {eyebrow}
        </p>
      </div>

      <h2
        className={`font-display text-3xl font-bold leading-[1.05] md:text-4xl lg:text-5xl ${
          isDark ? "text-white" : "text-foreground"
        }`}
      >
        {title}
      </h2>

      <p
        className={`mt-6 max-w-lg text-sm leading-relaxed md:text-base ${
          isDark ? "text-white/70" : "text-muted"
        }`}
      >
        {description}
      </p>

      <ul className="mt-8 space-y-3">
        {features.map((feature) => (
          <li
            key={feature}
            className={`flex items-start gap-3 text-sm ${
              isDark ? "text-white/80" : "text-muted"
            }`}
          >
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
            {feature}
          </li>
        ))}
      </ul>

      {highlights && highlights.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {highlights.map((item) => (
            <span
              key={item}
              className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest ${
                isDark
                  ? "border-white/15 text-white/60"
                  : "border-border text-muted"
              }`}
            >
              {item}
            </span>
          ))}
        </div>
      )}

      <div className="mt-10 flex flex-wrap items-center gap-6">
        <p className="font-mono text-2xl font-bold text-gold">{price}</p>
        <Link
          href={`/products/${slug}`}
          className={`group inline-flex items-center gap-2 px-8 py-4 font-mono text-[11px] font-semibold uppercase tracking-widest transition-all ${
            isDark
              ? "bg-white text-black hover:bg-gold"
              : "bg-foreground text-white hover:opacity-90"
          }`}
        >
          Shop Now
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
        </Link>
      </div>
    </motion.div>
  );

  return (
    <section
      className={`px-[var(--container-px)] py-16 sm:py-20 lg:py-28 ${
        isDark ? "bg-foreground text-white" : "bg-white"
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-20">
        {imageFirst ? (
          <>
            {imageBlock}
            {contentBlock}
          </>
        ) : (
          <>
            {contentBlock}
            {imageBlock}
          </>
        )}
      </div>
    </section>
  );
}
