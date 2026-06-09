"use client";

interface SizeSelectorProps {
  sizes: string[];
  sizeLabels?: Record<string, string>;
  selected: string | null;
  onSelect: (size: string) => void;
}

export default function SizeSelector({
  sizes,
  sizeLabels,
  selected,
  onSelect,
}: SizeSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
          Select Size
        </p>
        {selected && sizeLabels?.[selected] && (
          <p className="font-mono text-[10px] uppercase tracking-widest text-gold">
            {sizeLabels[selected]}
          </p>
        )}
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {sizes.map((size) => {
          const isSelected = selected === size;

          return (
            <button
              key={size}
              type="button"
              onClick={() => onSelect(size)}
              className={`flex flex-col items-center justify-center border px-3 py-3 transition-all duration-300 sm:py-4 ${
                isSelected
                  ? "border-foreground bg-foreground text-white"
                  : "border-border bg-white text-foreground hover:border-foreground"
              }`}
            >
              <span className="font-mono text-sm font-bold">{size}</span>
              {sizeLabels?.[size] && (
                <span
                  className={`mt-1 hidden text-[9px] uppercase tracking-wider sm:block ${
                    isSelected ? "text-white/70" : "text-muted"
                  }`}
                >
                  {sizeLabels[size].replace(` (${size})`, "")}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
