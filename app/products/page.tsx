"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import products, {
  PRODUCT_CATEGORIES,
  getProductsByCategory,
  sortProducts,
  type SortOption,
} from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";
import ProductCardSkeleton from "@/components/ui/ProductCardSkeleton";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name A–Z" },
];

function ProductsGridSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="mb-12 animate-pulse space-y-3">
        <div className="h-3 w-16 bg-surface" />
        <div className="h-10 w-64 bg-surface" />
        <div className="h-4 w-96 max-w-full bg-surface" />
      </div>
      <div className="grid grid-cols-1 gap-8 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const sortParam = (searchParams.get("sort") as SortOption) ?? "featured";

  const [sort, setSort] = useState<SortOption>(sortParam);

  const activeCategory =
    categoryParam && ["hoodie", "jacket"].includes(categoryParam)
      ? categoryParam
      : "all";

  const filtered = useMemo(() => {
    const byCategory = getProductsByCategory(activeCategory);
    return sortProducts(byCategory, sort);
  }, [activeCategory, sort]);

  const activeCategoryLabel =
    PRODUCT_CATEGORIES.find((c) =>
      activeCategory === "all" ? c.id === "all" : c.slug === activeCategory
    )?.label ?? "All Products";

  const buildHref = (category: string | null, nextSort = sort) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (nextSort !== "featured") params.set("sort", nextSort);
    const query = params.toString();
    return query ? `/products?${query}` : "/products";
  };

  return (
    <div className="site-container mx-auto max-w-7xl py-12 sm:py-16 lg:py-20">
      <div className="mb-12 border-b border-border pb-10">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.35em] text-gold">
          Shop Collection
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
          {activeCategoryLabel}
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
          Premium luxury streetwear crafted with intention. Every piece designed
          to define you.
        </p>
      </div>

      <div className="mb-10 flex flex-col gap-5 sm:gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {PRODUCT_CATEGORIES.map((cat) => {
            const isActive =
              activeCategory === cat.id ||
              (cat.slug && activeCategory === cat.slug);
            const href = buildHref(cat.slug);

            return (
              <Link
                key={cat.id}
                href={href}
                className={`px-4 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-widest transition-all duration-300 sm:px-5 sm:text-[11px] ${
                  isActive
                    ? "bg-foreground text-white"
                    : "bg-surface text-muted hover:bg-border hover:text-foreground"
                }`}
              >
                {cat.label}
              </Link>
            );
          })}
        </div>

        <div className="flex w-full items-center gap-3 sm:w-auto">
          <label
            htmlFor="sort-products"
            className="font-mono text-[10px] uppercase tracking-widest text-muted"
          >
            Sort by
          </label>
          <select
            id="sort-products"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="border border-border bg-white px-4 py-2.5 font-mono text-[11px] uppercase tracking-wider text-foreground outline-none transition-colors focus:border-foreground"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mb-8 font-mono text-[10px] uppercase tracking-widest text-muted">
        {filtered.length} {filtered.length === 1 ? "Product" : "Products"}
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeCategory}-${sort}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 gap-8 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <p className="py-24 text-center font-mono text-sm text-muted">
          No products found in this category.
        </p>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsGridSkeleton />}>
      <ProductsContent />
    </Suspense>
  );
}
