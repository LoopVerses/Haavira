"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Loader2, Lock } from "lucide-react";
import { formatPrice } from "@/lib/stripe";

function PayoneerTestContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const email = searchParams.get("email") ?? "customer@example.com";
  const total = Number(searchParams.get("total") ?? "0");

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      router.push(`/success?method=payoneer&test=true&session_id=test_payoneer_${Date.now()}`);
    }, 1200);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f7f7] px-6 py-16">
      <div className="w-full max-w-md border border-gray-200 bg-white p-8 shadow-lg">
        <div className="mb-8 flex justify-center">
          <Image
            src="/Images/payments/payoneer.svg"
            alt="Payoneer"
            width={120}
            height={28}
            className="h-7 w-auto"
            unoptimized
          />
        </div>

        <p className="text-center font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-[#FF4800]">
          Test Mode — Simulated Payoneer Checkout
        </p>

        <h1 className="mt-4 text-center font-sans text-2xl font-black uppercase tracking-tight text-black">
          Confirm Payment
        </h1>

        <div className="mt-8 space-y-3 border border-gray-200 bg-[#fafafa] p-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Account</span>
            <span className="font-medium text-black">{email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Amount</span>
            <span className="font-bold text-black">{formatPrice(total)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Merchant</span>
            <span className="font-medium text-black">HAAVIRA</span>
          </div>
        </div>

        <p className="mt-6 text-center text-xs leading-relaxed text-gray-500">
          This is a development test screen. No real Payoneer charge is made.
          Connect live Payoneer merchant API later for production.
        </p>

        <button
          type="button"
          onClick={handleConfirm}
          disabled={loading}
          className="mt-8 flex w-full items-center justify-center gap-2 bg-[#FF4800] py-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-90 disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Lock className="h-4 w-4" />
              Confirm Test Payment
            </>
          )}
        </button>

        <Link
          href="/checkout"
          className="mt-4 block text-center font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black"
        >
          Cancel and return
        </Link>
      </div>
    </div>
  );
}

export default function PayoneerTestPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f7f7f7]" />}>
      <PayoneerTestContent />
    </Suspense>
  );
}
