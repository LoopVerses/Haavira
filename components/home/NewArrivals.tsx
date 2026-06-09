"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

// Aapka data structure (Mocking for the component)
import products, { type Product } from "@/lib/products";
const ARRIVAL_SLUGS = ["dna-hoodie", "lion-hoodie", "time-hoodie", "leather-jacket"] as const;
const arrivals = ARRIVAL_SLUGS.map((slug) => products.find((p) => p.slug === slug)!).filter(Boolean) as Product[];

// Ultra-smooth Apple-like easing
const luxuryEase = [0.76, 0, 0.24, 1] as const; 

export default function NewArrivals() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev

  const activeProduct = arrivals[activeIndex];
  const total = arrivals.length;
  const AUTOPLAY_TIME = 6000;

  const goTo = (index: number, dir: number) => {
    setDirection(dir);
    setActiveIndex((index + total) % total);
  };

  const goPrev = () => goTo(activeIndex - 1, -1);
  const goNext = () => goTo(activeIndex + 1, 1);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => goNext(), AUTOPLAY_TIME);
    return () => clearInterval(timer);
  }, [activeIndex, isPaused, total]);

  // Image Masking Animation Variants
  const imageVariants = {
    initial: (dir: number) => ({
      clipPath: dir === 1 ? "inset(100% 0 0 0)" : "inset(0 0 100% 0)",
      scale: 1.1,
    }),
    animate: {
      clipPath: "inset(0% 0 0 0)",
      scale: 1,
      transition: { duration: 1.2, ease: luxuryEase },
    },
    exit: (dir: number) => ({
      clipPath: dir === 1 ? "inset(0 0 100% 0)" : "inset(100% 0 0 0)",
      scale: 0.95,
      transition: { duration: 1.2, ease: luxuryEase },
    }),
  };

  return (
    <section
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-32"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="site-container max-w-[1600px]">
        
        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-24 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: luxuryEase }}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="w-12 h-[1px] bg-[#C9A84C]" />
              <p className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A84C]">
                Latest Drops
              </p>
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-black sm:text-5xl md:text-6xl lg:text-7xl">
              New <span className="text-transparent [-webkit-text-stroke:1.5px_black] sm:[-webkit-text-stroke:2px_black]">Arrivals</span>
            </h2>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8, delay: 0.2, ease: luxuryEase }}
          >
            <Link
              href="/products"
              className="group flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-black hover:text-[#C9A84C] transition-colors"
            >
              View Full Collection
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/20 group-hover:border-[#C9A84C] transition-colors">
                <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition-transform duration-300" />
              </span>
            </Link>
          </motion.div>
        </div>

        {/* ================= MAIN EDITORIAL SLIDER ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-0 items-center">
          
          {/* LEFT: Image Reveal Showcase */}
          <div className="lg:col-span-7 relative w-full aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5] bg-[#f8f8f8] overflow-hidden group">
            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={activeProduct.id}
                custom={direction}
                variants={imageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={activeProduct.arrivalImage}
                  alt={activeProduct.name}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Floating Badge */}
            {activeProduct.badge && (
              <div className="absolute top-6 left-6 z-10 bg-black text-white px-4 py-2 text-[9px] font-bold uppercase tracking-widest">
                {activeProduct.badge}
              </div>
            )}
          </div>

          {/* RIGHT: Content & Controls */}
          <div className="relative flex min-h-[320px] flex-col justify-center overflow-hidden lg:col-span-5 lg:min-h-[400px] lg:pl-12 xl:pl-24">
            
            {/* Giant Background Number Watermark */}
            <div className="pointer-events-none absolute top-1/2 left-0 -z-10 -translate-y-1/2 select-none font-black tracking-tighter text-gray-50 text-[120px] sm:text-[180px] lg:left-10 lg:text-[280px]">
              {String(activeIndex + 1).padStart(2, "0")}
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`content-${activeProduct.id}`}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
                transition={{ duration: 0.55, ease: luxuryEase }}
                className="relative z-10 flex flex-col"
              >
                <p className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#C9A84C] mb-4">
                  Haavira Edition
                </p>
                <h3 className="mb-6 text-3xl font-black uppercase leading-[0.9] tracking-tighter text-black sm:text-4xl lg:text-6xl">
                  {activeProduct.name.replace("HAAVIRA ", "")}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-md mb-8">
                  {activeProduct.description || activeProduct.subtitle}
                </p>
                <p className="text-2xl font-bold text-black mb-10">
                  {activeProduct.priceDisplay}
                </p>

                {/* Shop Button */}
                <Link
                  href={`/products/${activeProduct.slug}`}
                  className="relative overflow-hidden group self-start bg-black text-white px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em]"
                >
                  <span className="relative z-10 flex items-center gap-2 transition-transform duration-500 group-hover:-translate-y-[150%]">
                    Explore Drop
                  </span>
                  <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 translate-y-[150%] transition-transform duration-500 group-hover:translate-y-0 bg-[#C9A84C] text-black">
                    Shop Now <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
              </motion.div>
            </AnimatePresence>

            {/* ================= NAVIGATION CONTROLS ================= */}
            <div className="mt-16 pt-8 border-t border-gray-200 flex items-center justify-between">
              
              {/* Animated Progress Line */}
              <div className="flex-1 max-w-[150px] h-[2px] bg-gray-200 relative overflow-hidden">
                <motion.div
                  key={`progress-${activeIndex}`}
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ 
                    duration: AUTOPLAY_TIME / 1000, 
                    ease: "linear",
                  }}
                  className={`absolute inset-0 bg-black ${isPaused ? 'opacity-30' : 'opacity-100'}`}
                />
              </div>

              {/* Fraction */}
              <div className="font-sans text-[10px] font-bold tracking-widest text-gray-400 mx-6">
                <span className="text-black">{String(activeIndex + 1).padStart(2, "0")}</span> / {String(total).padStart(2, "0")}
              </div>

              {/* Arrows */}
              <div className="flex gap-2">
                <button
                  onClick={goPrev}
                  className="w-12 h-12 flex items-center justify-center border border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={goNext}
                  className="w-12 h-12 flex items-center justify-center border border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}