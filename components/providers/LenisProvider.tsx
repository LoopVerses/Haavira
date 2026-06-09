"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, type ReactNode } from "react";
import { registerLenis } from "@/lib/scroll-lock";
import "lenis/dist/lenis.css";

function LenisController({ children }: { children: ReactNode }) {
  const lenis = useLenis();

  useEffect(() => {
    registerLenis(lenis ?? null);
    return () => registerLenis(null);
  }, [lenis]);

  return children;
}

export default function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        smoothWheel: true,
        syncTouch: false,
        autoRaf: true,
      }}
    >
      <LenisController>{children}</LenisController>
    </ReactLenis>
  );
}
