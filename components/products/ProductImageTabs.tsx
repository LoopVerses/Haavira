"use client";

interface ProductImageTabsProps {
  labels: string[];
  activeIndex: number;
  onChange: (index: number) => void;
  variant?: "default" | "compact";
}

export default function ProductImageTabs({
  labels,
  activeIndex,
  onChange,
  variant = "default",
}: ProductImageTabsProps) {
  return (
    <div
      className={`flex gap-1 overflow-x-auto ${
        variant === "compact" ? "pb-0" : "border-b border-border pb-px"
      }`}
      role="tablist"
      aria-label="Product image views"
    >
      {labels.map((label, index) => {
        const isActive = activeIndex === index;

        return (
          <button
            key={`${label}-${index}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(index)}
            className={`shrink-0 font-mono uppercase tracking-widest transition-all duration-300 ${
              variant === "compact"
                ? `px-2.5 py-1 text-[9px] ${
                    isActive
                      ? "bg-foreground text-white"
                      : "bg-surface text-muted hover:text-foreground"
                  }`
                : `px-4 py-3 text-[10px] sm:text-[11px] ${
                    isActive
                      ? "border-b-2 border-foreground text-foreground"
                      : "border-b-2 border-transparent text-muted hover:text-foreground"
                  }`
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
