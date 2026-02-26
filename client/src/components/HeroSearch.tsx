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
    <section className="bg-ink py-16 px-6 text-center">
      <p className="text-amber text-sm font-medium tracking-widest uppercase mb-4 opacity-85">
        Discover · Cook · Enjoy
      </p>
      <h1 className="font-display text-4xl md:text-6xl font-bold text-cream mb-2 leading-tight">
        What's on the<br />
        <em className="text-amber-light italic">menu tonight?</em>
      </h1>
      <p className="text-cream/60 text-lg mb-8 max-w-xl mx-auto">
        Search thousands of recipes from around the world
      </p>
      
      <div className="max-w-2xl mx-auto space-y-6">
        <SearchBar onSearch={onSearch} loading={loading} />
        <CategoryChips categories={categories} active={activeCategory} onSelect={onCategory} />
      </div>
    </section>
  );
}