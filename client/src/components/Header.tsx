type View = "explore" | "favorites";

interface Props {
  view: View;
  favCount: number;
  onViewChange: (v: View) => void;
}

export default function Header({ view, favCount, onViewChange }: Props) {
  return (
    <header style={{ background: "var(--warm-white)", borderBottom: "1px solid var(--border)", position: "sticky", top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "13px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <button onClick={() => onViewChange("explore")} style={{ display: "flex", alignItems: "center", gap: 9, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <span style={{ fontSize: 26 }}>🍽️</span>
          <span className="font-display" style={{ fontSize: 21, fontWeight: 900, color: "var(--ink)" }}>Eatoh</span>
        </button>
        <nav style={{ display: "flex", gap: 8 }}>
          <NavBtn active={view === "explore"}   onClick={() => onViewChange("explore")}>Explore</NavBtn>
          <NavBtn active={view === "favorites"} onClick={() => onViewChange("favorites")}>❤️ Saved{favCount > 0 && ` (${favCount})`}</NavBtn>
        </nav>
      </div>
    </header>
  );
}

function NavBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} style={{ background: active ? "var(--ink)" : "transparent", color: active ? "var(--cream)" : "var(--muted)", border: `1.5px solid ${active ? "var(--ink)" : "var(--border)"}`, borderRadius: 100, padding: "8px 18px", fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.18s", whiteSpace: "nowrap" }}>
      {children}
    </button>
  );
}