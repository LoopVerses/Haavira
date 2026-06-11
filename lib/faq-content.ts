import type { FaqItem } from "@/components/info/FaqAccordion";

export const FAQ_SECTIONS: { title: string; items: FaqItem[] }[] = [
  {
    title: "Orders & Shipping",
    items: [
      {
        question: "How long does shipping take?",
        answer:
          "Orders are processed within 1–3 business days. UK deliveries typically arrive within 2–5 business days. International delivery times vary depending on destination.",
      },
      {
        question: "Do you offer international shipping?",
        answer:
          "Yes. HAAVIRA ships worldwide. Shipping times and costs are calculated at checkout.",
      },
      {
        question: "Will I receive tracking information?",
        answer:
          "Yes. Once your order has been dispatched, you will receive tracking details via email.",
      },
      {
        question: "Can I change or cancel my order?",
        answer:
          "If your order has not yet been processed, please contact us as soon as possible. Once dispatched, orders cannot be cancelled.",
      },
    ],
  },
  {
    title: "Products & Sizing",
    items: [
      {
        question: "How do I choose the correct size?",
        answer:
          "Please refer to our Size Guide for detailed measurements. If you're between sizes, we recommend sizing up for a more relaxed fit.",
      },
      {
        question: "Are your hoodies true to size?",
        answer:
          "Yes. Our hoodies are designed with a regular streetwear fit. Check the size guide before ordering.",
      },
      {
        question: "What materials do you use?",
        answer:
          "Our hoodies are made from premium heavyweight cotton fleece, while our jackets are crafted from genuine leather and high-quality materials.",
      },
      {
        question: "Are your designs embroidered or printed?",
        answer:
          "Depending on the design, products may feature premium embroidery, high-quality DTF printing, or a combination of both. Product descriptions specify the exact details.",
      },
    ],
  },
  {
    title: "Returns & Exchanges",
    items: [
      {
        question: "What is your return policy?",
        answer:
          "We accept returns within 30 days of delivery. Items must be unworn, unused, and returned in their original condition.",
      },
      {
        question: "Can I exchange my item for a different size?",
        answer:
          "Yes. If the requested size is available, we can arrange an exchange. Contact our support team for assistance.",
      },
      {
        question: "When will I receive my refund?",
        answer:
          "Approved refunds are typically processed within 5–10 business days after we receive and inspect the returned item.",
      },
    ],
  },
  {
    title: "Payments & Security",
    items: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept major credit and debit cards (Visa, Mastercard, Amex) and secure Stripe checkout, including Apple Pay and Google Pay where available.",
      },
      {
        question: "Is my payment information secure?",
        answer:
          "Yes. All payments are processed through secure, encrypted payment providers. HAAVIRA does not store your payment details.",
      },
    ],
  },
  {
    title: "Brand & Support",
    items: [
      {
        question: "What does HAAVIRA stand for?",
        answer:
          "HAAVIRA represents confidence, individuality, ambition, and premium craftsmanship. Every product is designed to help you stand out and define your own path.",
      },
      {
        question: "How can I contact customer support?",
        answer:
          "You can contact us through our Contact page or by emailing support@haavira.com.",
      },
      {
        question: "How can I stay updated on new releases?",
        answer:
          "Follow us on Instagram and TikTok and subscribe to our newsletter for new product launches, offers, and updates.",
      },
    ],
  },
];
