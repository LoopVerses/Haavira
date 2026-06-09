"use client";

import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCartStore } from "@/lib/store";

interface AddToCartButtonProps {
  product: Product;
  selectedSize: string | null;
}

export default function AddToCartButton({
  product,
  selectedSize,
}: AddToCartButtonProps) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    if (!selectedSize) return;

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      priceDisplay: product.priceDisplay,
      size: selectedSize,
      quantity: 1,
      image: product.image,
    });
  };

  return (
    <motion.button
      onClick={handleAdd}
      disabled={!selectedSize}
      whileHover={selectedSize ? { scale: 1.02 } : {}}
      whileTap={selectedSize ? { scale: 0.98 } : {}}
      className={`group flex w-full items-center justify-center gap-3 py-4 font-mono text-sm tracking-wide transition-all duration-300 ${
        selectedSize
          ? "bg-gold text-background hover:bg-white"
          : "cursor-not-allowed border border-border bg-surface text-muted"
      }`}
    >
      <ShoppingBag className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
      {selectedSize ? "ADD TO CART" : "SELECT A SIZE"}
    </motion.button>
  );
}
