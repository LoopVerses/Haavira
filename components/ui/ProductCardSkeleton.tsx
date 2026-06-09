export default function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[4/5] w-full bg-surface" />
      <div className="mt-4 h-3 w-3/4 bg-surface" />
      <div className="mt-2 h-4 w-full bg-surface" />
      <div className="mt-2 h-4 w-1/4 bg-surface" />
    </div>
  );
}
