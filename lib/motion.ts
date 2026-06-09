export const luxuryEase = [0.22, 1, 0.36, 1] as const;
export const smoothEase = [0.76, 0, 0.24, 1] as const;

export const slideUp = {
  initial: { opacity: 0, y: 48 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: luxuryEase },
};

export const slideLeft = {
  initial: { opacity: 0, x: -64 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: luxuryEase },
};

export const slideRight = {
  initial: { opacity: 0, x: 64 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: luxuryEase },
};

export function horizontalSlide(direction: number) {
  return {
    initial: { opacity: 0, x: direction > 0 ? 120 : -120 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: direction > 0 ? -120 : 120 },
    transition: { duration: 0.55, ease: luxuryEase },
  };
}
