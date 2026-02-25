interface Props { emoji: string; title: string; subtitle?: string; action?: { label: string; onClick: () => void }; }

export default function EmptyState({ emoji, title, subtitle, action }: Props) {
  return (
    <div className="fade-in" style={{ textAlign: "center", padding: "80px 24px" }} role="status">
      <span style={{ fontSize: 62, display: "block", marginBottom: 16 }}>{emoji}</span>
      <h2 className="font-display" style={{ fontSize: 24, fontWeight: 700, marginBottom: 8, color: "var(--ink)" }}>{title}</h2>
      {subtitle && <p style={{ color: "var(--muted)", fontSize: 15, marginBottom: action ? 24 : 0 }}>{subtitle}</p>}
      {action && (
        <button onClick={action.onClick} style={{ background: "var(--ink)", color: "var(--cream)", border: "none", borderRadius: 100, padding: "11px 28px", fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
          {action.label}
        </button>
      )}
    </div>
  );
}