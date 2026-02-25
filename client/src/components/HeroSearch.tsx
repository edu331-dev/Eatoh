import SearchBar from "./SearchBar";
import CategoryChips from "./CategoryChips";

interface Props {
  categories: string[];
  activeCategory: string | null;
  loading: boolean;
  onSearch: (query: string) => void;
  onCategory: (cat: string) => void;
}

export default function HeroSearch({ categories, activeCategory, loading, onSearch, onCategory }: Props) {
  return (
    <section style={{ background: "var(--ink)", padding: "60px 24px 52px", textAlign: "center" }}>
      <p className="font-display" style={{ fontSize: 12, letterSpacing: "0.18em", color: "var(--amber)", textTransform: "uppercase", marginBottom: 14, opacity: 0.85 }}>
        Discover · Cook · Enjoy
      </p>
      <h1 className="font-display" style={{ fontSize: "clamp(34px, 6vw, 62px)", fontWeight: 900, color: "var(--cream)", lineHeight: 1.1, marginBottom: 14 }}>
        What's on the<br />
        <em style={{ color: "var(--amber-light)", fontStyle: "italic" }}>menu tonight?</em>
      </h1>
      <p style={{ color: "rgba(250,246,240,0.55)", fontSize: 16, marginBottom: 34 }}>
        Search thousands of recipes from around the world
      </p>
      <SearchBar onSearch={onSearch} loading={loading} />
      <CategoryChips categories={categories} active={activeCategory} onSelect={onCategory} />
    </section>
  );
}