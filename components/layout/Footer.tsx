import Link from "next/link";
import { SOCIAL_LINKS } from "@/lib/social-links";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-white">
      <div className="site-container mx-auto max-w-7xl py-12 sm:py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-display text-[18px] font-semibold" style={{ letterSpacing: "0.3em" }}>
              HAAVIRA
            </h3>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Born different. Built unstoppable. Premium luxury streetwear designed to define you.
            </p>
            <a
              href="mailto:support@haavira.com"
              className="mt-3 inline-block text-sm text-muted transition-colors hover:text-foreground"
            >
              support@haavira.com
            </a>
            <div className="mt-6 flex items-center gap-4">
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-gold" aria-label="Follow HAAVIRA on Instagram">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="text-muted transition-colors hover:text-gold" aria-label="Follow HAAVIRA on TikTok">
                <TikTokIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground">Shop</h4>
            <ul className="mt-4 space-y-3">
              <li><Link href="/products" className="text-sm text-muted transition-colors hover:text-foreground">All Products</Link></li>
              <li><Link href="/products?category=hoodie" className="text-sm text-muted transition-colors hover:text-foreground">Hoodies</Link></li>
              <li><Link href="/products?category=jacket" className="text-sm text-muted transition-colors hover:text-foreground">Jackets</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground">Company</h4>
            <ul className="mt-4 space-y-3">
              <li><Link href="/about" className="text-sm text-muted transition-colors hover:text-foreground">About Us</Link></li>
              <li><Link href="/faq" className="text-sm text-muted transition-colors hover:text-foreground">FAQ</Link></li>
              <li><Link href="/contact" className="text-sm text-muted transition-colors hover:text-foreground">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground">Legal</h4>
            <ul className="mt-4 space-y-3">
              <li><Link href="/privacy" className="text-sm text-muted transition-colors hover:text-foreground">Privacy</Link></li>
              <li><Link href="/returns" className="text-sm text-muted transition-colors hover:text-foreground">Returns</Link></li>
              <li><Link href="/shipping" className="text-sm text-muted transition-colors hover:text-foreground">Shipping</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-border pt-8 md:flex-row">
          <p className="font-mono text-xs text-muted">© 2026 HAAVIRA. All rights reserved.</p>
          <p className="font-mono text-xs tracking-wide text-muted">Designed By Loopverses.</p>
        </div>
      </div>
    </footer>
  );
}
