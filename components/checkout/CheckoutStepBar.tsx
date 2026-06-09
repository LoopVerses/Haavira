import { Check, Lock } from "lucide-react";

interface CheckoutStepBarProps {
  step: "details" | "payment";
}

export default function CheckoutStepBar({ step }: CheckoutStepBarProps) {
  const detailsDone = step === "payment";

  return (
    <div className="mb-8 grid grid-cols-2 gap-2 sm:mb-10 sm:gap-3">
      <div
        className={`border p-3 sm:p-4 ${
          detailsDone ? "border-black bg-black text-white" : "border-black bg-white text-black"
        }`}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <span
            className={`flex h-6 w-6 shrink-0 items-center justify-center text-[10px] font-bold sm:h-7 sm:w-7 sm:text-[11px] ${
              detailsDone ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            {detailsDone ? <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : "1"}
          </span>
          <div className="min-w-0">
            <p className="font-sans text-[9px] font-bold uppercase tracking-[0.15em] opacity-70 sm:text-[10px] sm:tracking-[0.2em]">
              Step 1
            </p>
            <p className="truncate font-sans text-[10px] font-bold uppercase tracking-wider sm:text-xs">
              Your Information
            </p>
          </div>
        </div>
      </div>

      <div
        className={`border p-3 sm:p-4 ${
          step === "payment"
            ? "border-black bg-white text-black"
            : "border-gray-200 bg-gray-50 text-gray-400"
        }`}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-gray-200 text-gray-500 sm:h-7 sm:w-7">
            {step === "payment" ? (
              "2"
            ) : (
              <Lock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            )}
          </span>
          <div className="min-w-0">
            <p className="font-sans text-[9px] font-bold uppercase tracking-[0.15em] sm:text-[10px] sm:tracking-[0.2em]">
              Step 2
            </p>
            <p className="truncate font-sans text-[10px] font-bold uppercase tracking-wider sm:text-xs">
              Payment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
