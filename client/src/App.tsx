import { useState, useEffect, useCallback } from "react";
import { getCategories } from "./lib/api";
import { useSearch }     from "./hooks/useSearch";
import { useFavorites }  from "./hooks/useFavorites";
import Header        from "./components/Header";
import HeroSearch    from "./components/HeroSearch";
import RecipeGrid    from "./components/RecipeGrid";
import RecipeDetails from "./components/RecipeDetails";

type View = "explore" | "favorites";

export default function App() {
  const [view, setView]             = useState<View>("explore");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    getCategories().then((cats) => setCategories(cats.slice(0, 14))).catch(() => {});
  }, []);

  const { results, status, error, activeQuery, activeCategory, search, browseCategory } = useSearch();

  useEffect(() => { search("chicken"); }, []);

  const { favorites, toggle, isFavorite } = useFavorites();
  const [selectedId, setSelectedId]       = useState<string | null>(null);
  const openRecipe  = useCallback((id: string) => setSelectedId(id), []);
  const closeRecipe = useCallback(() => setSelectedId(null), []);

  const isLoading    = status === "loading";
  const displayError = status === "error" ? error : null;
  const displayMeals = view === "favorites" ? favorites : results;

  let gridLabel: string | undefined;
  if (view === "explore" && status === "success") {
    if (activeCategory) gridLabel = `Browsing: ${activeCategory} · ${results.length} recipes`;
    else if (activeQuery) gridLabel = `${results.length} result${results.length !== 1 ? "s" : ""} for "${activeQuery}"`;
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <Header view={view} favCount={favorites.length} onViewChange={setView} />

      {view === "explore" ? (
        <HeroSearch categories={categories} activeCategory={activeCategory} loading={isLoading}
          onSearch={search} onCategory={browseCategory} />
      ) : (
        <section style={{ background: "var(--terracotta)", padding: "42px 24px 36px", textAlign: "center" }}>
          <h1 className="font-display" style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 900, color: "#fff", marginBottom: 8 }}>
            ❤️ Saved Recipes
          </h1>
          <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 15 }}>
            {favorites.length === 0 ? "No favourites yet — start exploring!" : `${favorites.length} recipe${favorites.length !== 1 ? "s" : ""} saved`}
          </p>
        </section>
      )}

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "38px 24px 80px" }}>
        <RecipeGrid meals={displayMeals} loading={view === "explore" ? isLoading : false}
          error={view === "explore" ? displayError : null} label={gridLabel}
          isFavorite={isFavorite} onOpen={openRecipe} onToggleFavorite={toggle}
          onExplore={() => setView("explore")} emptyFavorites={view === "favorites"} />
      </main>

      {selectedId && (
        <RecipeDetails mealId={selectedId} isFavorite={isFavorite(selectedId)}
          onToggleFavorite={toggle} onClose={closeRecipe} />
      )}
    </div>
  );
}