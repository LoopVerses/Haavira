"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import { luxuryEase } from "@/lib/motion";

const slides = [
  {
    id: "haavira-dna-hoodie",
    num: "01",
    title: "DNA Embroidered Hoodie",
    category: "Born Different. Built Unstoppable.",
    price: "£69.99",
    image: "/Images/Banner_img_2.png",
    slug: "dna-hoodie",
    desc: 'Premium HAAVIRA DNA Embroidery Hoodie crafted from heavyweight cotton fleece. Featuring premium gold DNA embroidery on both sleeves and chest embroidery: "Born Different. Built Unstoppable."',
  },
  {
    id: "haavira-lion-hoodie",
    num: "02",
    title: "Lion Graphic Hoodie",
    category: "Tomorrow Belongs To The Braves",
    price: "£59.99",
    image: "/Images/Banner_img_3.png",
    slug: "lion-hoodie",
    desc: "The HAAVIRA Lion Hoodie represents courage, leadership, and confidence. Featuring premium lion artwork with the statement TOMORROW BELONGS TO THE BRAVES.",
  },
  {
    id: "haavira-time-hoodie",
    num: "03",
    title: "Time Is The Real Currency Hoodie",
    category: "Time Is The Real Currency",
    price: "£59.99",
    image: "/Images/Banner_img.png",
    slug: "time-hoodie",
    desc: "The HAAVIRA Time Hoodie represents ambition, discipline, and the value of time. Featuring premium hourglass sleeve artwork.",
  },
];

const AUTOPLAY_MS = 7000;

export default function PromoBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = (index: number, dir: number) => {
    setDirection(dir);
    setCurrentIndex((index + slides.length) % slides.length);
  };

  const nextSlide = () => goTo(currentIndex + 1, 1);
  const prevSlide = () => goTo(currentIndex - 1, -1);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

  const currentSlide = slides[currentIndex];

  const contentVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 80 : -80,
    }),
    center: {
      opacity: 1,
      x: 0,
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -80 : 80,
    }),
  };

  const imageVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 140 : -140,
      scale: 0.92,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -140 : 140,
      scale: 0.92,
    }),
  };

  return (
    <section
      className="relative flex min-h-[calc(100dvh-var(--header-height))] w-full flex-col justify-center overflow-x-clip bg-white pb-8 pt-[var(--header-height)] font-sans text-black sm:pb-10 lg:pb-0"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="site-container grid min-h-[70dvh] w-full grid-cols-1 items-center gap-8 py-8 sm:gap-10 lg:min-h-[78vh] lg:grid-cols-[1fr_1.85fr_0.7fr] lg:gap-5 xl:grid-cols-[1fr_2fr_0.75fr] xl:gap-6 lg:py-0">
        {/* Left — mobile: order 2 */}
        <div className="order-2 flex flex-col justify-between lg:order-1 lg:py-8">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`left-${currentSlide.id}`}
              custom={direction}
              variants={contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: luxuryEase }}
            >
              <p className="mb-2 text-xs font-medium text-gray-500 sm:text-sm">
                {currentSlide.category}
              </p>
              <h2 className="mb-6 text-3xl font-extrabold leading-[0.95] tracking-tighter sm:text-4xl md:text-5xl lg:mb-10 lg:text-6xl xl:text-[72px]">
                {currentSlide.title}
              </h2>
              <p className="max-w-sm text-sm leading-relaxed text-gray-600">
                {currentSlide.desc}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10 sm:gap-4">
                <Link
                  href={`/products/${currentSlide.slug}`}
                  className="flex items-center gap-2 rounded-md bg-black px-5 py-3 text-xs font-semibold text-white transition-colors hover:bg-black/80 sm:px-6 sm:py-3.5 sm:text-sm"
                >
                  <ShoppingBag size={18} />
                  Add To Cart
                </Link>
                <Link
                  href={`/products/${currentSlide.slug}`}
                  className="rounded-md border border-gray-300 px-5 py-3 text-xs font-semibold text-black transition-colors hover:bg-gray-50 sm:px-6 sm:py-3.5 sm:text-sm"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center gap-4 text-sm font-bold text-gray-400 sm:mt-12 lg:mt-16">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goTo(index, index > currentIndex ? 1 : -1)}
                className={`transition-all duration-300 ${
                  currentIndex === index
                    ? "flex h-8 w-8 items-center justify-center rounded-full bg-black text-white"
                    : "hover:text-black"
                }`}
              >
                {slide.num}
              </button>
            ))}
          </div>
        </div>

        {/* Center image — mobile: order 1 */}
        <div className="order-1 relative flex h-[42vh] min-h-[280px] w-full items-center justify-center sm:h-[48vh] md:min-h-[360px] lg:order-2 lg:h-[min(76vh,760px)] lg:min-h-[500px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentSlide.id}
              custom={direction}
              variants={imageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: luxuryEase }}
              className="relative h-full w-full"
            >
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0"
              >
                <Image
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  fill
                  sizes="(max-width: 1024px) 92vw, 48vw"
                  className="object-contain object-center drop-shadow-2xl lg:scale-[1.02] xl:scale-[1.06]"
                  priority={currentIndex === 0}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right — mobile: order 3 */}
        <div className="order-3 flex flex-col justify-between lg:py-8 lg:pl-4 xl:pl-6">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`right-${currentSlide.id}`}
              custom={direction}
              variants={contentVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease: luxuryEase }}
              className="flex flex-col"
            >
              <div className="flex justify-start">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-xl font-bold text-white sm:h-16 sm:w-16 sm:text-2xl lg:h-20 lg:w-20 lg:text-3xl">
                  {currentSlide.num}
                </div>
              </div>

              <div className="mt-8 lg:mt-16">
                <p className="mb-1 text-sm text-gray-400">Price</p>
                <h3 className="mb-2 text-2xl font-extrabold text-gold sm:text-3xl">
                  {currentSlide.price}
                </h3>
                <p className="font-mono text-[10px] uppercase tracking-widest text-gray-400">
                  Free UK Delivery
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-start gap-4 sm:mt-12 lg:mt-16 lg:justify-end lg:gap-6">
            <button
              type="button"
              onClick={prevSlide}
              className="text-black transition-colors hover:text-gray-500"
              aria-label="Previous slide"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="text-black transition-colors hover:text-gray-500"
              aria-label="Next slide"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
