interface Props { 
  categories: string[]; 
  active: string | null; 
  onSelect: (category: string) => void; 
}

export default function CategoryChips({ categories, active, onSelect }: Props) {
  if (categories.length === 0) return null;
  
  return (
    <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
      {categories.map((cat) => (
        <button 
          key={cat} 
          className={`category-chip ${active === cat ? "active" : ""}`}
          onClick={() => onSelect(cat)} 
          aria-pressed={active === cat}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}