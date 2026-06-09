import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import TopBar from "@/components/layout/TopBar";
import Footer from "@/components/layout/Footer";
import CartSidebar from "@/components/cart/CartSidebar";
import PageTransition from "@/components/layout/PageTransition";
import LenisProvider from "@/components/providers/LenisProvider";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: "HAAVIRA | Born Different. Built Unstoppable.",
  description:
    "Premium luxury streetwear. Born different. Built unstoppable. Shop hoodies, jackets and limited edition drops.",
  openGraph: {
    title: "HAAVIRA | Born Different. Built Unstoppable.",
    description:
      "Premium luxury streetwear. Born different. Built unstoppable.",
    type: "website",
    images: [
      {
        url: "/Images/Banner_img_2.png",
        width: 1200,
        height: 1500,
        alt: "HAAVIRA DNA Embroidered Hoodie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HAAVIRA | Born Different. Built Unstoppable.",
    description:
      "Premium luxury streetwear. Born different. Built unstoppable.",
    images: ["/Images/Banner_img_2.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body
        suppressHydrationWarning
        className="flex min-h-screen flex-col bg-background text-foreground"
      >
        <LenisProvider>
          <TopBar />
          <Navbar />
          <main className="flex w-full min-w-0 flex-1 flex-col overflow-x-clip pt-[var(--header-height)]">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <CartSidebar />
        </LenisProvider>
      </body>
    </html>
  );
}
