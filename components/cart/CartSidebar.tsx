"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { useCartStore } from "@/lib/store";
import { formatPrice } from "@/lib/stripe";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/scroll-lock";

// Apple-like smooth easing
const luxuryEase = [0.22, 1, 0.36, 1] as const;

export default function CartSidebar() {
  const items = useCartStore((s) => s.items);
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const total = useCartStore((s) =>
    s.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  useEffect(() => {
    if (isOpen) {
      lockBodyScroll();
      return () => unlockBodyScroll();
    }
    unlockBodyScroll();
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={closeCart}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          />

          {/* Sidebar Container */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: luxuryEase }}
            className="fixed right-0 top-0 z-[110] flex h-[100dvh] w-full max-w-[440px] flex-col bg-white shadow-[0_0_40px_rgba(0,0,0,0.1)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
              <h2 className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-black">
                Shopping Bag <span className="text-gray-400">({items.length})</span>
              </h2>
              <button 
                onClick={closeCart} 
                className="p-2 -mr-2 text-black hover:rotate-90 transition-transform duration-500" 
                aria-label="Close bag"
              >
                <X className="h-6 w-6" strokeWidth={1} />
              </button>
            </div>

            {/* Cart Items Area */}
            <div className="flex-1 overflow-y-auto px-8">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="font-sans text-3xl font-black uppercase tracking-tighter text-gray-200">
                    Your bag is empty
                  </p>
                  <button 
                    onClick={closeCart} 
                    className="mt-8 border-b border-black pb-1 font-sans text-[10px] font-bold uppercase tracking-widest text-black hover:text-gray-500 hover:border-gray-500 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <ul className="py-6">
                  <AnimatePresence mode="popLayout">
                    {items.map((item, idx) => (
                      <motion.li
                        layout // Enables smooth sliding when sibling is removed
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                        transition={{ duration: 0.4, delay: idx * 0.05, ease: luxuryEase }}
                        key={`${item.id}-${item.size}`}
                        className="flex gap-6 border-b border-gray-100 py-6 last:border-0"
                      >
                        {/* Product Image */}
                        <div className="relative h-[120px] w-[90px] flex-shrink-0 bg-[#f5f5f5] overflow-hidden">
                          <Image 
                            src={item.image} 
                            alt={item.name} 
                            fill 
                            className="object-cover object-center" 
                            sizes="90px" 
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex min-w-0 flex-1 flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start gap-2">
                              <h3 className="truncate font-sans text-sm font-bold uppercase tracking-wider text-black">
                                {item.name.replace("HAAVIRA ", "")}
                              </h3>
                              <button 
                                onClick={() => removeItem(item.id, item.size)} 
                                className="font-sans text-[9px] font-bold uppercase tracking-widest text-gray-400 hover:text-red-500 underline underline-offset-4 transition-colors" 
                                aria-label="Remove"
                              >
                                Remove
                              </button>
                            </div>
                            <p className="mt-1 font-sans text-[11px] font-medium uppercase tracking-widest text-gray-500">
                              Size: {item.size}
                            </p>
                          </div>

                          <div className="flex items-end justify-between mt-4">
                            {/* Quantity Selector Minimalist */}
                            <div className="flex items-center border border-gray-200 bg-white">
                              <button 
                                onClick={() => updateQuantity(item.id, item.size, Math.max(1, item.quantity - 1))} 
                                className="px-3 py-2 text-gray-400 hover:text-black hover:bg-gray-50 transition-colors"
                              >
                                <Minus className="h-3 w-3" strokeWidth={2} />
                              </button>
                              <span className="w-6 text-center font-sans text-xs font-bold text-black">
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} 
                                className="px-3 py-2 text-gray-400 hover:text-black hover:bg-gray-50 transition-colors"
                              >
                                <Plus className="h-3 w-3" strokeWidth={2} />
                              </button>
                            </div>

                            {/* Price */}
                            <p className="font-sans text-sm font-bold text-black">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="bg-[#fafafa] px-8 py-8 border-t border-gray-200"
              >
                <div className="mb-6 flex items-end justify-between">
                  <span className="font-sans text-[11px] font-bold uppercase tracking-widest text-gray-500">
                    Estimated Total
                  </span>
                  <span className="font-sans text-2xl font-black text-black leading-none">
                    {formatPrice(total)}
                  </span>
                </div>
                
                <p className="mb-6 font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-[#C9A84C]">
                  Complimentary UK Shipping Applied
                </p>

                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="group relative flex w-full items-center justify-center overflow-hidden bg-black py-5 text-white"
                >
                  <span className="relative z-10 flex items-center gap-2 font-sans text-[11px] font-bold uppercase tracking-[0.2em] transition-transform duration-500 group-hover:-translate-y-[150%]">
                    Proceed To Checkout
                  </span>
                  <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 bg-[#C9A84C] font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-black translate-y-[150%] transition-transform duration-500 group-hover:translate-y-0">
                    Secure Checkout <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </motion.div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}