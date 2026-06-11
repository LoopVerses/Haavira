"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-start justify-between gap-4 py-5 text-left transition-colors hover:text-foreground"
              aria-expanded={isOpen}
            >
              <span className="font-sans text-sm font-semibold text-foreground sm:text-base">
                {item.question}
              </span>
              <ChevronDown
                className={`mt-0.5 h-5 w-5 flex-shrink-0 text-muted transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <p className="pb-5 pr-8 text-sm leading-relaxed text-muted sm:text-base">
                {item.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
