"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import products from "@/lib/products";

// Apple/Luxury style smooth easing
const luxuryEase = [0.22, 1, 0.36, 1] as const;

const categories = [
  { id: "all", label: "All Drops" },
  { id: "hoodie", label: "Hoodies" },
  { id: "jacket", label: "Jackets" },
];

export default function FeaturedProducts() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section className="bg-white px-6 py-20 sm:py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1600px]">
        
        {/* ================= HEADER & TABS ================= */}
        <div className="mb-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end lg:mb-20">
          
          {/* Title Area */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: luxuryEase }}
          >
            <p className="mb-3 font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A84C]">
              Curated Selection
            </p>
            <h2 className="font-sans text-4xl font-black uppercase tracking-tighter text-black md:text-5xl lg:text-6xl">
              Featured <br className="hidden md:block" />
              <span className="text-transparent [-webkit-text-stroke:1px_black] md:[-webkit-text-stroke:2px_black]">
                Products
              </span>
            </h2>
          </motion.div>

          {/* Premium Animated Tabs */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: luxuryEase }}
            className="flex flex-wrap gap-6 border-b border-gray-200 pb-2 md:gap-10"
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className="group relative pb-2 font-sans text-[11px] font-bold uppercase tracking-[0.15em] transition-colors"
                >
                  <span className={isActive ? "text-black" : "text-gray-400 group-hover:text-black"}>
                    {cat.label}
                  </span>

                  {/* Framer Motion Shared Layout Underline */}
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryTab"
                      className="absolute -bottom-[3px] left-0 right-0 h-[2px] bg-black"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* ================= PRODUCT GRID ================= */}
        <motion.div 
          layout
          className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, i) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: luxuryEase }}
                key={product.id}
                className="group relative flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#f5f5f5] mb-5">
                  <Link
                    href={`/products/${product.slug}`}
                    className="relative block h-full w-full"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </Link>

                  {/* Badges */}
                  {product.badge && (
                    <div className="absolute left-3 top-3 bg-black px-3 py-1 font-sans text-[9px] font-bold uppercase tracking-widest text-white">
                      {product.badge}
                    </div>
                  )}

                  {/* Hover Add To Cart Button (Slides up) */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 hidden lg:block">
                    <button className="w-full flex items-center justify-center gap-2 bg-white/95 backdrop-blur-sm text-black py-3.5 font-sans text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg hover:bg-black hover:text-white transition-colors">
                      <Plus size={14} /> Quick Add
                    </button>
                  </div>
                </div>

                {/* Product Info (Minimalist) */}
                <Link href={`/products/${product.slug}`} className="flex flex-col">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <p className="font-sans text-[9px] uppercase tracking-widest text-gray-400 mb-1">
                        {product.category || "Apparel"}
                      </p>
                      <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-black group-hover:text-[#C9A84C] transition-colors">
                        {product.name.replace("HAAVIRA ", "")}
                      </h3>
                    </div>
                    <p className="font-sans text-sm font-bold text-black shrink-0">
                      {product.priceDisplay}
                    </p>
                  </div>
                </Link>
                
                {/* Mobile Quick Add (Visible only on small screens) */}
                <button className="mt-4 flex w-full items-center justify-center border border-gray-200 py-3 font-sans text-[10px] font-bold uppercase tracking-widest text-black lg:hidden">
                  Add To Cart
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}