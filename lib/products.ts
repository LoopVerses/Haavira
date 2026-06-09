export interface ProductImageTab {
  id: string;
  label: string;
  src: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  priceDisplay: string;
  sizes: string[];
  sizeLabels: Record<string, string>;
  badge: string | null;
  description: string;
  features: string[];
  images: string[];
  image: string;
  arrivalImage: string;
  cardImage: string;
  slug: string;
  category: string;
}

export const LEATHER_GALLERY_IMAGES = [
  "/Images/havara 24.jpeg",
  "/Images/havara 25.jpeg",
  "/Images/havara 26.jpeg",
  "/Images/havara 27.jpeg",
  "/Images/havara 28.jpeg",
  "/Images/havara 29.jpeg",
  "/Images/havara 30.jpeg",
  "/Images/havara 31.jpeg",
  "/Images/havara 32.jpeg",
] as const;

const IMAGE_TAB_LABELS = [
  "Front",
  "Angle",
  "Detail",
  "Close-Up",
  "Studio",
  "Side",
  "Back",
  "Craft",
  "Texture",
  "Fit",
  "Lifestyle",
  "Edition",
  "Profile",
  "Finish",
  "Premium",
] as const;

const SIZE_OPTIONS = ["S", "M", "L", "XL"] as const;

const sizeLabels: Record<string, string> = {
  S: "Small (S)",
  M: "Medium (M)",
  L: "Large (L)",
  XL: "Extra Large (XL)",
};

const products: Product[] = [
  {
    id: "haavira-dna-hoodie",
    name: "HAAVIRA DNA Embroidered Hoodie",
    subtitle: "Born Different. Built Unstoppable.",
    price: 6999,
    priceDisplay: "£69.99",
    sizes: [...SIZE_OPTIONS],
    sizeLabels,
    badge: "NEW DROP",
    description:
      "Premium HAAVIRA DNA Embroidery Hoodie crafted from heavyweight cotton fleece for superior comfort, durability, and style. Featuring premium gold DNA embroidery on both sleeves and the signature chest embroidery: \"Born Different. Built Unstoppable.\" Designed for those who refuse to follow the crowd and choose their own path.",
    features: [
      "Premium Heavyweight Cotton Fleece",
      "Luxury Sleeve Embroidery Design",
      "Soft Warm Interior",
      "Premium Stitching & Construction",
      "Kangaroo Pocket",
      "Adjustable Hood",
      "Free UK Delivery",
    ],
    images: [
      "/Images/Havara DNA Sleeve.jpeg",
      "/Images/havara 5.jpeg",
      "/Images/havara 6.jpeg",
      "/Images/havara 12.jpeg",
      "/Images/havara 18.jpeg",
      "/Images/havara 19.jpeg",
      "/Images/hoodie-dna.jpeg",
      "/Images/hoodie.jpeg",
    ],
    image: "/Images/Havara DNA Sleeve.jpeg",
    arrivalImage: "/Images/havara 19.jpeg",
    cardImage: "/Images/havara 12.jpeg",
    slug: "dna-hoodie",
    category: "hoodie",
  },
  {
    id: "haavira-time-hoodie",
    name: "HAAVIRA Time Is The Real Currency Hoodie",
    subtitle: "Time Is The Real Currency.",
    price: 5999,
    priceDisplay: "£59.99",
    sizes: [...SIZE_OPTIONS],
    sizeLabels,
    badge: null,
    description:
      "The HAAVIRA Time Is The Real Currency Hoodie represents ambition, discipline, and the value of time. Featuring the signature front statement TIME IS THE REAL CURRENCY with premium hourglass sleeve artwork. Built for individuals who understand that time is the most valuable asset.",
    features: [
      "Premium Cotton Fleece Material",
      "Detailed Hourglass Sleeve Design",
      "Luxury Streetwear Styling",
      "Soft Comfortable Fit",
      "Durable High Quality Print",
      "Premium Metal Zip Pocket Detail",
    ],
    images: [
      "/Images/havara 2.jpeg",
      "/Images/havara 10.jpeg",
      "/Images/havara 13.jpeg",
      "/Images/havara 17.jpeg",
      "/Images/havara 20.jpeg",
      "/Images/havara 21.jpeg",
      "/Images/hoodie-time.jpeg",
    ],
    image: "/Images/havara 2.jpeg",
    arrivalImage: "/Images/havara 13.jpeg",
    cardImage: "/Images/havara 21.jpeg",
    slug: "time-hoodie",
    category: "hoodie",
  },
  {
    id: "haavira-lion-hoodie",
    name: "HAAVIRA Lion Hoodie",
    subtitle: "Tomorrow Belongs To The Braves.",
    price: 5999,
    priceDisplay: "£59.99",
    sizes: [...SIZE_OPTIONS],
    sizeLabels,
    badge: null,
    description:
      "The HAAVIRA Lion Hoodie is designed to represent courage, leadership, and confidence. Featuring premium lion artwork and the motivational statement TOMORROW BELONGS TO THE BRAVES, along with the HAAVIRA sleeve logo. Stand out with a design built for leaders.",
    features: [
      "Premium Cotton Fleece Construction",
      "High Definition Lion Artwork",
      "Comfortable Heavyweight Material",
      "Luxury Streetwear Design",
      "Durable Long Lasting Print",
      "Kangaroo Pocket",
    ],
    images: [
      "/Images/havara 3.jpeg",
      "/Images/havara 9.jpeg",
      "/Images/havara 11.jpeg",
      "/Images/havara 14.jpeg",
      "/Images/havara 15.jpeg",
      "/Images/havara 16.jpeg",
      "/Images/hoodie-lion.jpeg",
    ],
    image: "/Images/havara 3.jpeg",
    arrivalImage: "/Images/havara 11.jpeg",
    cardImage: "/Images/havara 16.jpeg",
    slug: "lion-hoodie",
    category: "hoodie",
  },
  {
    id: "haavira-leather-jacket",
    name: "HAAVIRA Genuine Leather Jacket",
    subtitle: "Built To Last. Designed To Define You.",
    price: 17999,
    priceDisplay: "£179.99",
    sizes: [...SIZE_OPTIONS],
    sizeLabels,
    badge: "PREMIUM",
    description:
      "Experience luxury craftsmanship with the HAAVIRA Genuine Leather Jacket. Made from premium genuine leather and finished with high-quality hardware, premium lining, and durable stitching for long-lasting wear. Built to last. Designed to define you.",
    features: [
      "100% Genuine Leather",
      "Premium Handmade Construction",
      "Luxury Black Leather Finish",
      "Premium Quality Metal Zippers",
      "Soft Comfortable Inner Lining",
      "Multiple Secure Pockets",
      "Timeless Biker Inspired Design",
    ],
    images: [
      "/Images/Main_product_1.png",
      "/Images/Main_product_2.png",
      "/Images/havara 4.jpeg",
      "/Images/havara 8.jpeg",
      "/Images/haavara 7.jpeg",
      "/Images/havara 22.jpeg",
      "/Images/havara 23.jpeg",
      "/Images/havara 24.jpeg",
      "/Images/havara 25.jpeg",
      "/Images/havara 26.jpeg",
      "/Images/havara 27.jpeg",
      "/Images/havara 28.jpeg",
      "/Images/havara 29.jpeg",
      "/Images/havara 30.jpeg",
      "/Images/havara 31.jpeg",
      "/Images/havara 32.jpeg",
      "/Images/leather-jacket.jpeg",
    ],
    image: "/Images/Main_product_1.png",
    arrivalImage: "/Images/havara 24.jpeg",
    cardImage: "/Images/havara 28.jpeg",
    slug: "leather-jacket",
    category: "jacket",
  },
];

export const PRODUCT_CATEGORIES = [
  { id: "all", label: "All Products", slug: null },
  { id: "hoodie", label: "Hoodies", slug: "hoodie" },
  { id: "jacket", label: "Jackets", slug: "jacket" },
] as const;

export type SortOption = "featured" | "price-asc" | "price-desc" | "name";

export function getProductImageTabs(product: Product): ProductImageTab[] {
  return product.images.map((src, index) => ({
    id: `${product.slug}-view-${index}`,
    label:
      IMAGE_TAB_LABELS[index] ??
      `View ${String(index + 1).padStart(2, "0")}`,
    src,
  }));
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
}

export function sortProducts(
  items: Product[],
  sort: SortOption = "featured"
): Product[] {
  const list = [...items];

  switch (sort) {
    case "price-asc":
      return list.sort((a, b) => a.price - b.price);
    case "price-desc":
      return list.sort((a, b) => b.price - a.price);
    case "name":
      return list.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return list;
  }
}

export default products;
