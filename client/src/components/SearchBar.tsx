import { useState, type KeyboardEvent, type FormEvent } from "react";

interface Props { onSearch: (query: string) => void; loading?: boolean; }

export default function SearchBar({ onSearch, loading = false }: Props) {
  const [query, setQuery] = useState("");

  function handleSubmit(e: FormEvent) { e.preventDefault(); if (query.trim()) onSearch(query.trim()); }
  function handleKey(e: KeyboardEvent<HTMLInputElement>) { if (e.key === "Enter") onSearch(query.trim()); }

  return (
    <form onSubmit={handleSubmit} style={{ position: "relative", maxWidth: 560, margin: "0 auto" }}>
      <input className="search-input" type="text" placeholder='Search recipes, e.g. "pasta", "chicken curry"…'
        value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKey}
        aria-label="Search recipes" disabled={loading} />
      <button type="submit" disabled={loading || !query.trim()}
        style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", background: loading ? "var(--muted)" : "var(--amber)", border: "none", borderRadius: 100, padding: "9px 22px", color: "#fff", fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 14, cursor: loading ? "not-allowed" : "pointer", transition: "background 0.2s", whiteSpace: "nowrap" }}>
        {loading ? "…" : "Search"}
      </button>
    </form>
  );
}