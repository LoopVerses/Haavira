"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/lib/products";
import { getProductImageTabs } from "@/lib/products";
import ProductImageTabs from "@/components/products/ProductImageTabs";

interface ProductGalleryProps {
  product: Product;
}

const slideEase = [0.22, 1, 0.36, 1] as const;

export default function ProductGallery({ product }: ProductGalleryProps) {
  const tabs = getProductImageTabs(product);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTab = tabs[activeIndex] ?? tabs[0];

  return (
    <div className="w-full space-y-0">
      <ProductImageTabs
        labels={tabs.map((tab) => tab.label)}
        activeIndex={activeIndex}
        onChange={setActiveIndex}
      />

      <div className="group relative mt-4 aspect-[4/5] w-full overflow-hidden border border-t-0 border-border bg-surface sm:aspect-[3/4] lg:aspect-[4/5]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: slideEase }}
            className="absolute inset-0"
          >
            <Image
              src={activeTab.src}
              alt={`${product.name} — ${activeTab.label}`}
              fill
              priority={activeIndex === 0}
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </motion.div>
        </AnimatePresence>

        {product.badge && (
          <span className="absolute left-5 top-5 z-10 bg-gold px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-white">
            {product.badge}
          </span>
        )}

        <span className="absolute bottom-5 right-5 z-10 bg-white/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-foreground backdrop-blur-sm">
          {activeTab.label}
        </span>
      </div>
    </div>
  );
}
