import { Check, Lock } from "lucide-react";

interface CheckoutStepBarProps {
  step: "details" | "payment";
}

export default function CheckoutStepBar({ step }: CheckoutStepBarProps) {
  const detailsDone = step === "payment";

  return (
    <div className="mb-10 grid grid-cols-2 gap-3">
      <div
        className={`border p-4 ${
          detailsDone ? "border-black bg-black text-white" : "border-black bg-white text-black"
        }`}
      >
        <div className="flex items-center gap-3">
          <span
            className={`flex h-7 w-7 items-center justify-center text-[11px] font-bold ${
              detailsDone ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            {detailsDone ? <Check className="h-4 w-4" /> : "1"}
          </span>
          <div>
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] opacity-70">
              Step 1
            </p>
            <p className="font-sans text-xs font-bold uppercase tracking-wider">
              Your Information
            </p>
          </div>
        </div>
      </div>

      <div
        className={`border p-4 ${
          step === "payment"
            ? "border-black bg-white text-black"
            : "border-gray-200 bg-gray-50 text-gray-400"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center bg-gray-200 text-gray-500">
            {step === "payment" ? (
              "2"
            ) : (
              <Lock className="h-3.5 w-3.5" />
            )}
          </span>
          <div>
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em]">
              Step 2
            </p>
            <p className="font-sans text-xs font-bold uppercase tracking-wider">
              Payment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
