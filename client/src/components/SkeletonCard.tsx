export default function SkeletonCard() {
  return (
    <div className="recipe-card" aria-hidden="true">
      <div className="skeleton h-48" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-5 w-3/4" />
        <div className="skeleton h-4 w-1/2" />
      </div>
    </div>
  );
}