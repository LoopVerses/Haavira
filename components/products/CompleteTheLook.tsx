"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import type { Product } from "@/lib/products";

const luxuryEase = [0.22, 1, 0.36, 1] as const;

interface CompleteTheLookProps {
  products: Product[];
  currentSlug: string;
}

export default function CompleteTheLook({
  products,
  currentSlug,
}: CompleteTheLookProps) {
  const relatedProducts = products
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 3);

  if (relatedProducts.length === 0) return null;

  return (
    <section className="mt-24 border-t border-gray-100 bg-[#fafafa] pt-20 pb-24 sm:mt-32 sm:pt-24">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div>
            <p className="mb-3 font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A84C]">
              Curated Selection
            </p>
            <h2 className="font-sans text-3xl font-black uppercase tracking-tighter text-black sm:text-4xl lg:text-5xl">
              Complete The{" "}
              <span className="text-transparent [-webkit-text-stroke:1px_black] sm:[-webkit-text-stroke:2px_black]">
                Look
              </span>
            </h2>
          </div>
          <Link
            href="/products"
            className="group mt-2 flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-black transition-colors hover:text-[#C9A84C] md:mt-0"
          >
            View All
            <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
          {relatedProducts.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: luxuryEase }}
              className="group flex flex-col"
            >
              <div className="relative mb-5 aspect-[3/4] w-full overflow-hidden bg-[#f5f5f5]">
                <Link
                  href={`/products/${item.slug}`}
                  className="relative block h-full w-full"
                >
                  <Image
                    src={item.cardImage}
                    alt={item.name}
                    fill
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </Link>

                {item.badge && (
                  <div className="absolute left-3 top-3 bg-black px-3 py-1 font-sans text-[9px] font-bold uppercase tracking-widest text-white">
                    {item.badge}
                  </div>
                )}
              </div>

              <Link href={`/products/${item.slug}`} className="flex flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="mb-1 font-sans text-[9px] uppercase tracking-widest text-gray-400">
                      {item.category}
                    </p>
                    <h3 className="font-sans text-sm font-bold uppercase tracking-wider text-black transition-colors group-hover:text-[#C9A84C]">
                      {item.name.replace("HAAVIRA ", "")}
                    </h3>
                  </div>
                  <p className="shrink-0 font-sans text-sm font-bold text-black">
                    {item.priceDisplay}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
