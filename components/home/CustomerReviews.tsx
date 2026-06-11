"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { luxuryEase } from "@/lib/motion";

const REVIEWS = [
  {
    name: "James M.",
    location: "London, UK",
    rating: 5,
    product: "DNA Embroidered Hoodie",
    text: "Quality is insane. Heavyweight fleece, embroidery is clean, and it fits exactly as described. Will definitely order again.",
  },
  {
    name: "Sarah K.",
    location: "Manchester, UK",
    rating: 5,
    product: "Lion Hoodie",
    text: "Fast delivery and the hoodie exceeded my expectations. Premium feel and the design stands out without being over the top.",
  },
  {
    name: "Daniel R.",
    location: "Birmingham, UK",
    rating: 5,
    product: "Leather Jacket",
    text: "The leather jacket is genuinely premium. Great craftsmanship and packaging felt luxury from unboxing to wearing it.",
  },
  {
    name: "Amira H.",
    location: "Leeds, UK",
    rating: 5,
    product: "Time Hoodie",
    text: "True to size with a perfect streetwear fit. Customer support replied quickly when I had a sizing question before ordering.",
  },
] as const;

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-gold text-gold" />
      ))}
    </div>
  );
}

export default function CustomerReviews() {
  return (
    <section className="border-t border-border bg-surface py-16 sm:py-24 lg:py-28">
      <div className="site-container mx-auto max-w-[1600px]">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: luxuryEase }}
          className="mb-12 text-center lg:mb-16"
        >
          <p className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-gold">
            Customer Reviews
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            Loved by Our Community
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted sm:text-base">
            Real feedback from HAAVIRA customers across the UK.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((review, index) => (
            <motion.article
              key={review.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: luxuryEase }}
              className="flex flex-col border border-border bg-white p-6 shadow-sm"
            >
              <Stars count={review.rating} />
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="mt-6 border-t border-border pt-4">
                <p className="font-sans text-sm font-bold text-foreground">
                  {review.name}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted">
                  {review.location}
                </p>
                <p className="mt-2 text-xs text-gold">{review.product}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
