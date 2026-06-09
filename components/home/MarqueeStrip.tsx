"use client";

import { motion } from "framer-motion";
import React from "react";

// Combined and refined items for a single impactful strip
const marqueeItems = [
  "BORN DIFFERENT",
  "BUILT UNSTOPPABLE",
  "HAAVIRA DROP 01",
  "PREMIUM STREETWEAR",
  "LIMITED EDITION",
  "DESIGNED TO DEFINE YOU",
  "NO COMPROMISE",
];

export default function MarqueeStrip() {
  // Duplicate array for seamless infinite scroll
  const duplicatedItems = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <section
      aria-label="Brand marquee"
      className="relative flex h-[140px] w-full items-center justify-center overflow-hidden border-y border-white/10 bg-[#0a0a0a] sm:h-[180px] md:h-[220px]"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C9A84C]/10 via-transparent to-transparent opacity-50 blur-2xl" />

      {/* Tilted Marquee Container */}
      <div className="absolute w-[110vw] -rotate-2 origin-center flex py-6 bg-black shadow-[0_0_40px_rgba(0,0,0,0.8)] border-y border-[#C9A84C]/20">
        <motion.div
          className="flex w-max items-center gap-8 md:gap-16 px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 45, // Slow and luxurious speed
          }}
        >
          {duplicatedItems.map((item, index) => {
            // Alternate between Solid text and Hollow (Outlined) text
            const isOutline = index % 2 !== 0;

            return (
              <React.Fragment key={`marquee-item-${index}`}>
                <motion.span
                  whileHover={{ scale: 1.05, color: "#C9A84C" }}
                  className={`flex shrink-0 cursor-default items-center font-sans text-2xl font-black uppercase tracking-[0.1em] transition-colors duration-300 sm:text-4xl md:text-[70px] ${
                    isOutline
                      ? "text-transparent [-webkit-text-stroke:1px_#ffffff] md:[-webkit-text-stroke:2px_#ffffff] hover:[-webkit-text-stroke:2px_#C9A84C]"
                      : "text-white"
                  }`}
                >
                  {item}
                </motion.span>

                {/* Spinning Star Separator */}
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 5,
                  }}
                  className="flex shrink-0 items-center justify-center text-[#C9A84C] text-2xl md:text-4xl"
                  aria-hidden="true"
                >
                  ✦
                </motion.span>
              </React.Fragment>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}