"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { luxuryEase } from "@/lib/motion";

type SlideDirection = "up" | "left" | "right";

interface SlideSectionProps {
  children: ReactNode;
  direction?: SlideDirection;
  delay?: number;
  className?: string;
}

const variants = {
  up: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
  right: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
};

export default function SlideSection({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: SlideSectionProps) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px", amount: 0.12 }}
      variants={variants[direction]}
      transition={{ duration: 0.55, delay, ease: luxuryEase }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
