"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowLeft, MoveRight } from "lucide-react";
import type { Product } from "@/lib/products";
import products from "@/lib/products";
import ProductGallery from "@/components/products/ProductGallery";
import CompleteTheLook from "@/components/products/CompleteTheLook";
import { useCartStore } from "@/lib/store";

// Smooth easing for all animations
const luxuryEase = [0.22, 1, 0.36, 1] as const;

interface ProductDetailProps {
  product: Product;
}

const accordionSections = [
  {
    id: "sizing",
    title: "Sizing & Fit",
    content: "Our pieces feature a relaxed, luxury streetwear silhouette. Size up for an oversized drape, or take your true size for a tailored classic fit. Model is 6'1\" / 185cm and wears size L.",
  },
  {
    id: "delivery",
    title: "Delivery & Returns",
    content: "Complimentary standard delivery on all UK orders. Experience our hassle-free 14-day global return policy.",
  },
  {
    id: "care",
    title: "Care Instructions",
    content: "Machine wash cold with like colours. Do not bleach. Tumble dry low or hang dry. Iron on low heat. Do not dry clean unless stated on garment label.",
  },
];

// Custom Luxury Accordion
function AccordionItem({ title, content, isOpen, onToggle }: any) {
  return (
    <div className="border-b border-gray-200">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-6 text-left group"
      >
        <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-black group-hover:text-gray-500 transition-colors">
          {title}
        </span>
        <div className="relative h-4 w-4 flex items-center justify-center">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0, opacity: isOpen ? 0 : 1 }}
            transition={{ duration: 0.3, ease: luxuryEase }}
            className="absolute"
          >
            <Plus className="h-4 w-4 text-black" strokeWidth={1} />
          </motion.div>
          <motion.div
            animate={{ rotate: isOpen ? 0 : -180, opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.3, ease: luxuryEase }}
            className="absolute"
          >
            <Minus className="h-4 w-4 text-black" strokeWidth={1} />
          </motion.div>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: luxuryEase }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-sm leading-relaxed text-gray-500 pr-10">
              {content}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>("sizing");

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const handleAddToBag = () => {
    if (!selectedSize || added) return;

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      priceDisplay: product.priceDisplay,
      size: selectedSize,
      quantity: 1,
      image: product.image,
    });

    openCart();
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Stagger animation variants for right panel
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: luxuryEase } },
  };

  return (
    <div className="overflow-x-clip bg-white pb-12 selection:bg-black selection:text-white sm:pb-20">
      
      {/* Top Breadcrumb */}
      <div className="site-container mx-auto max-w-[1600px] py-4 sm:py-6">
        <Link
          href="/products"
          className="group inline-flex items-center gap-3 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" strokeWidth={1.5} />
          Back to Collection
        </Link>
      </div>

      <div className="site-container mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 items-start gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          
          {/* LEFT: Product Gallery (Scrollable) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full"
          >
            <ProductGallery product={product} />
          </motion.div>

          {/* RIGHT: Product Info (Sticky) */}
          <div className="w-full lg:sticky lg:top-[calc(var(--header-height)+1.5rem)] lg:self-start">
            <motion.div variants={staggerContainer} initial="hidden" animate="show" className="flex flex-col">
              
              <motion.p variants={staggerItem} className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A84C] mb-4">
                Haavira / Drop 01
              </motion.p>

              <motion.h1 variants={staggerItem} className="mb-4 font-sans text-3xl font-black uppercase leading-[0.9] tracking-tighter text-black sm:text-4xl lg:text-5xl">
                {product.name.replace("HAAVIRA ", "")}
              </motion.h1>

              <motion.p variants={staggerItem} className="text-xl lg:text-2xl font-bold text-black mb-6">
                {product.priceDisplay}
              </motion.p>

              <motion.p variants={staggerItem} className="text-sm leading-relaxed text-gray-500 mb-10 max-w-md">
                {product.description}
              </motion.p>

              {/* Custom Minimalist Size Selector */}
              <motion.div variants={staggerItem} className="mb-10">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-black">
                    Select Size
                  </span>
                  <button className="font-sans text-[10px] uppercase tracking-wider text-gray-400 hover:text-black underline underline-offset-4 transition-colors">
                    Size Guide
                  </button>
                </div>
                
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                  {product.sizes.map((size, idx) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3.5 border transition-all duration-300 font-sans text-xs font-bold uppercase ${
                        selectedSize === size
                          ? "border-black bg-black text-white"
                          : "border-gray-200 bg-white text-black hover:border-black"
                      }`}
                    >
                      {product.sizeLabels?.[idx] || size}
                    </button>
                  ))}
                </div>
                {!selectedSize && (
                  <p className="mt-3 font-sans text-[10px] uppercase tracking-widest text-red-500">
                    * Required
                  </p>
                )}
              </motion.div>

              {/* Massive Add To Cart Button */}
              <motion.div variants={staggerItem} className="mb-12 mt-2">
                <button
                  type="button"
                  onClick={handleAddToBag}
                  disabled={!selectedSize}
                  className={`relative w-full overflow-hidden py-5 font-sans text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 group ${
                    added
                      ? "bg-[#C9A84C] text-white border border-[#C9A84C]"
                      : selectedSize
                        ? "bg-black text-white border border-black hover:bg-white hover:text-black"
                        : "bg-gray-100 text-gray-400 border border-gray-100 cursor-not-allowed"
                  }`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {added ? "Added To Collection" : "Add To Cart"}
                    {selectedSize && !added && (
                       <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                    )}
                  </span>
                </button>
              </motion.div>

              {/* Features Grid (Editorial approach) */}
              <motion.div variants={staggerItem} className="mb-12 border-t border-gray-200 pt-8">
                <h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-black mb-6">
                  Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="text-[#C9A84C] text-[10px] mt-1">✦</span>
                      <span className="text-xs text-gray-600 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Accordions */}
              <motion.div variants={staggerItem} className="border-t border-gray-200">
                {accordionSections.map((section) => (
                  <AccordionItem
                    key={section.id}
                    title={section.title}
                    content={section.content}
                    isOpen={openAccordion === section.id}
                    onToggle={() => setOpenAccordion(openAccordion === section.id ? null : section.id)}
                  />
                ))}
              </motion.div>

            </motion.div>
          </div>
        </div>
      </div>

      <CompleteTheLook products={products} currentSlug={product.slug} />
    </div>
  );
}