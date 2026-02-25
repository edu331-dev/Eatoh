export default function SkeletonCard() {
  return (
    <div style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }} aria-hidden="true">
      <div className="skeleton" style={{ height: 200 }} />
      <div style={{ padding: 16 }}>
        <div className="skeleton" style={{ height: 17, width: "72%", marginBottom: 10 }} />
        <div className="skeleton" style={{ height: 13, width: "45%" }} />
      </div>
    </div>
  );
}