interface Props { categories: string[]; active: string | null; onSelect: (category: string) => void; }

export default function CategoryChips({ categories, active, onSelect }: Props) {
  if (categories.length === 0) return null;
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", maxWidth: 820, margin: "22px auto 0" }}>
      {categories.map((cat) => (
        <button key={cat} className={`category-chip${active === cat ? " active" : ""}`}
          onClick={() => onSelect(cat)} aria-pressed={active === cat}>
          {cat}
        </button>
      ))}
    </div>
  );
}