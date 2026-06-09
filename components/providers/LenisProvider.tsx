"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useState, type ReactNode } from "react";
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

function usePreferNativeScroll() {
  const [preferNative, setPreferNative] = useState(false);

  useEffect(() => {
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const narrowViewport = window.innerWidth < 1024;
    setPreferNative(coarsePointer || narrowViewport);

    const onResize = () => {
      setPreferNative(
        window.matchMedia("(pointer: coarse)").matches ||
          window.innerWidth < 1024
      );
    };

    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return preferNative;
}

export default function LenisProvider({ children }: { children: ReactNode }) {
  const preferNativeScroll = usePreferNativeScroll();

  if (preferNativeScroll) {
    return <>{children}</>;
  }

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
