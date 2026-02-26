import { useState, type KeyboardEvent, type FormEvent } from "react";
import { Search } from 'lucide-react';

interface Props { 
  onSearch: (query: string) => void; 
  loading?: boolean; 
}

export default function SearchBar({ onSearch, loading = false }: Props) {
  const [query, setQuery] = useState("");

  function handleSubmit(e: FormEvent) { 
    e.preventDefault(); 
    if (query.trim()) onSearch(query.trim()); 
  }
  
  function handleKey(e: KeyboardEvent<HTMLInputElement>) { 
    if (e.key === "Enter") onSearch(query.trim()); 
  }

  return (
    <form onSubmit={handleSubmit} className="relative max-w-xl mx-auto">
      <input 
        className="search-input w-full" 
        type="text" 
        placeholder='Search recipes, e.g. "pasta", "chicken curry"...'
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        onKeyDown={handleKey}
        aria-label="Search recipes" 
        disabled={loading} 
      />
      <button 
        type="submit" 
        disabled={loading || !query.trim()}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-amber hover:bg-amber-light disabled:bg-muted text-white px-5 py-2 rounded-full font-medium text-sm transition-colors flex items-center gap-2"
      >
        <Search size={16} />
        {loading ? "..." : "Search"}
      </button>
    </form>
  );
}