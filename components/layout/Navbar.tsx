"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/store";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/scroll-lock";
import { SOCIAL_LINKS } from "@/lib/social-links";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/checkout", label: "Checkout" },
];

// Custom Easing for premium smooth animations
const transitionEase = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  
  // Aapke existing store connections
  const openCart = useCartStore((s) => s.openCart);
  const itemCount = useCartStore((s) =>
    s.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      lockBodyScroll();
      return () => unlockBodyScroll();
    }
    unlockBodyScroll();
  }, [mobileOpen]);

  // Check active link logic
  const checkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <motion.header
        className="fixed left-0 right-0 top-[var(--navbar-offset)] z-50 transition-all duration-500"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: transitionEase }}
        style={{
          marginTop: "var(--header-margin-top)",
          paddingLeft: "var(--safe-left)",
          paddingRight: "var(--safe-right)",
          backgroundColor: scrolled ? "rgba(255, 255, 255, 0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.05)" : "1px solid transparent",
        }}
      >
        <nav className="mx-auto flex h-[68px] max-w-[1600px] items-center justify-between px-4 sm:px-6 md:h-[80px] lg:px-12">
          
          {/* LOGO */}
          <Link href="/" className="flex-shrink-0 z-50 group">
            <span className="relative font-sans text-lg font-black uppercase tracking-[0.2em] text-black sm:text-xl sm:tracking-[0.25em]">
              Haavira
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </span>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => {
              const isActive = checkActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative group py-2"
                >
                  <span
                    className={`font-sans text-[11px] font-bold uppercase tracking-[0.15em] transition-colors duration-300 ${
                      isActive ? "text-black" : "text-gray-400 group-hover:text-black"
                    }`}
                  >
                    {link.label}
                  </span>
                  
                  {/* Animated Underline */}
                  <span
                    className={`absolute bottom-0 left-0 h-[1px] bg-black transition-transform duration-500 origin-left ${
                      isActive ? "w-full scale-x-100" : "w-full scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* ACTIONS (Cart & Menu) */}
          <div className="flex items-center gap-6 z-50">
            <button
              onClick={openCart}
              className="relative group flex cursor-pointer items-center justify-center p-2 transition-transform duration-300 hover:scale-110"
              aria-label="Open bag"
            >
              <ShoppingBag className="h-5 w-5 text-black" strokeWidth={1.5} />
              
              {/* Cart Badge with Pop Animation */}
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white shadow-md"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 text-black hover:opacity-70 transition-opacity"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* MOBILE MENU FULLSCREEN OVERLAY */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: transitionEase }}
            className="fixed inset-0 z-[100] flex flex-col bg-white"
          >
            {/* Mobile Header */}
            <div className="flex h-[68px] items-center justify-between border-b border-gray-100 px-4 sm:px-6 md:h-[80px]">
              <span className="font-sans text-xl font-black tracking-[0.25em] text-black uppercase">
                Haavira
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-black hover:rotate-90 transition-transform duration-500"
                aria-label="Close menu"
              >
                <X className="h-7 w-7" strokeWidth={1.5} />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex flex-1 flex-col items-center justify-center gap-10 px-6">
              {navLinks.map((link, i) => {
                const isActive = checkActive(link.href);
                return (
                  <div key={link.href} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{
                        duration: 0.6,
                        delay: 0.2 + i * 0.1, // Stagger effect
                        ease: transitionEase,
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`text-4xl font-black uppercase tracking-tighter transition-colors duration-300 sm:text-5xl md:text-7xl ${
                          isActive ? "text-black" : "text-gray-300 hover:text-black"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  </div>
                );
              })}
            </nav>

            {/* Mobile Footer Meta */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="py-10 px-8 flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 border-t border-gray-100"
            >
              <span>Est. 2024</span>
              <div className="flex gap-4">
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black transition-colors"
                >
                  Instagram
                </a>
                <a
                  href={SOCIAL_LINKS.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black transition-colors"
                >
                  TikTok
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}