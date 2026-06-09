"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/lib/products";
import { getProductImageTabs } from "@/lib/products";
import ProductImageTabs from "@/components/products/ProductImageTabs";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const slideEase = [0.22, 1, 0.36, 1] as const;

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const tabs = getProductImageTabs(product);
  const defaultIndex = Math.max(
    0,
    tabs.findIndex((tab) => tab.src === product.cardImage)
  );
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const activeTab = tabs[activeIndex] ?? tabs[0];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group flex h-full flex-col"
    >
      <div className="relative flex flex-1 flex-col overflow-hidden border border-border bg-white">
        <Link href={`/products/${product.slug}`} className="block">
          <div className="relative aspect-square w-full overflow-hidden bg-surface">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: slideEase }}
                className="absolute inset-0"
              >
                <Image
                  src={activeTab.src}
                  alt={`${product.name} — ${activeTab.label}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </motion.div>
            </AnimatePresence>

            {product.badge && (
              <span className="absolute left-3 top-3 z-10 bg-gold px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-white">
                {product.badge}
              </span>
            )}

            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="bg-foreground px-5 py-2.5 font-mono text-[11px] uppercase tracking-wider text-white">
                View Piece →
              </span>
            </div>
          </div>
        </Link>

        {tabs.length > 1 && (
          <div className="border-t border-border bg-white px-2 py-2">
            <ProductImageTabs
              labels={tabs.map((tab) => tab.label)}
              activeIndex={activeIndex}
              onChange={setActiveIndex}
              variant="compact"
            />
          </div>
        )}
      </div>

      <Link href={`/products/${product.slug}`} className="mt-4 block flex-shrink-0 space-y-2">
        <h3 className="text-sm font-medium text-foreground transition-colors group-hover:text-gold">
          {product.name.replace("HAAVIRA ", "")}
        </h3>
        <p className="line-clamp-1 text-xs text-muted">{product.subtitle}</p>
        <div className="flex items-center justify-between gap-2">
          <p className="font-mono text-sm font-semibold text-gold">
            {product.priceDisplay}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
            {product.sizes.join(" · ")}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
