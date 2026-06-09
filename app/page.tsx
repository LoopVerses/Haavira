"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import PromoBanner from "@/components/home/PromoBanner";
import MarqueeStrip from "@/components/home/MarqueeStrip";
import NewArrivals from "@/components/home/NewArrivals";
import GenuineLeatherSection from "@/components/home/GenuineLeatherSection";
import DesignedToDefineSection from "@/components/home/DesignedToDefineSection";
import LeatherDetailGallery from "@/components/home/LeatherDetailGallery";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import SlideSection from "@/components/ui/SlideSection";
import { luxuryEase } from "@/lib/motion";

export default function Home() {
  const [email, setEmail] = useState("");

  return (
    <div className="-mt-[var(--header-height)] w-full overflow-x-clip bg-white">
      <PromoBanner />

      <SlideSection direction="up">
        <MarqueeStrip />
      </SlideSection>

      <SlideSection direction="right" delay={0.05}>
        <NewArrivals />
      </SlideSection>

      <SlideSection direction="left" delay={0.05}>
        <GenuineLeatherSection />
      </SlideSection>

      <SlideSection direction="right" delay={0.05}>
        <DesignedToDefineSection />
      </SlideSection>

      <SlideSection direction="up" delay={0.05}>
        <LeatherDetailGallery />
      </SlideSection>

      <SlideSection direction="up">
        <FeaturedProducts />
      </SlideSection>

      <SlideSection
        direction="up"
        className="border-t border-border bg-surface px-[var(--container-px)] py-16 sm:py-20 lg:py-28"
      >
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: luxuryEase }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-display text-2xl font-bold sm:text-3xl md:text-4xl">
            Subscribe to our newsletter
          </h2>
          <p className="mt-4 text-sm text-muted sm:text-base">
            Be the first to know about new drops, exclusive releases, and HAAVIRA
            stories.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setEmail("");
            }}
            className="mt-8 flex flex-col items-stretch gap-4 border-b border-foreground pb-3 sm:mt-10 sm:flex-row sm:items-end"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="min-w-0 flex-1 bg-transparent font-sans text-sm text-foreground placeholder:text-muted outline-none"
              required
            />
            <button
              type="submit"
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center self-end rounded-full bg-foreground text-white transition-opacity hover:opacity-85 sm:self-auto"
              aria-label="Subscribe"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-muted">
            Free UK delivery on all orders
          </p>
        </motion.div>
      </SlideSection>
    </div>
  );
}
