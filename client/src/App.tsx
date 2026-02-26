import { useState, useEffect, useCallback } from "react";
import { getCategories } from "./api/api";
import { useSearch } from "./hooks/useSearch";
import { useFavorites } from "./hooks/useFavorites";
import { useTheme } from "./hooks/useTheme";
import Header from "./components/Header";
import HeroSearch from "./components/HeroSearch";
import RecipeGrid from "./components/RecipeGrid";
import RecipeDetails from "./components/RecipeDetails";
import FavoritesList from "./components/FavoritesList";
import ShoppingList from "./components/ShoppingList";

type View = "explore" | "favorites";

export default function App() {
  const [view, setView] = useState<View>("explore");
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showShoppingList, setShowShoppingList] = useState(false);
  const [shoppingItems, setShoppingItems] = useState<any[]>([]);

  const { isDark, toggle: toggleTheme } = useTheme();
  const { results, status, error, activeQuery, activeCategory, search, browseCategory } = useSearch();
  const { favorites, toggle, isFavorite } = useFavorites();

  useEffect(() => {
    getCategories().then((cats) => setCategories(cats.slice(0, 14))).catch(() => {});
  }, []);

  useEffect(() => { search("chicken"); }, []);

  const openRecipe = useCallback((id: string) => setSelectedId(id), []);
  const closeRecipe = useCallback(() => setSelectedId(null), []);

  const isLoading = status === "loading";
  const displayError = status === "error" ? error : null;
  const displayMeals = view === "favorites" ? favorites : results;

  let gridLabel: string | undefined;
  if (view === "explore" && status === "success") {
    if (activeCategory) gridLabel = `Browsing: ${activeCategory} · ${results.length} recipes`;
    else if (activeQuery) gridLabel = `${results.length} result${results.length !== 1 ? "s" : ""} for "${activeQuery}"`;
  }

  const addToShoppingList = (ingredients: { ingredient: string; measure: string }[], recipeName: string) => {
    const newItems = ingredients.map((ing, idx) => ({
      id: `${Date.now()}-${idx}`,
      ingredient: ing.ingredient,
      measure: ing.measure,
      quantity: 1,
      recipeName
    }));
    setShoppingItems(prev => [...prev, ...newItems]);
    setShowShoppingList(true);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      <div className="min-h-screen bg-cream dark:bg-ink text-ink dark:text-cream transition-colors duration-200">
        <Header 
          view={view} 
          favCount={favorites.length} 
          onViewChange={setView}
          isDark={isDark}
          onToggleTheme={toggleTheme}
          onShowShoppingList={() => setShowShoppingList(true)}
          shoppingCount={shoppingItems.length}
        />

        {view === "explore" ? (
          <HeroSearch 
            categories={categories} 
            activeCategory={activeCategory} 
            loading={isLoading}
            onSearch={search} 
            onCategory={browseCategory} 
          />
        ) : (
          <section className="bg-terracotta py-10 px-6 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-2">
              ❤️ Saved Recipes
            </h1>
            <p className="text-white/80 text-lg">
              {favorites.length === 0 ? "No favourites yet — start exploring!" : `${favorites.length} recipe${favorites.length !== 1 ? "s" : ""} saved`}
            </p>
          </section>
        )}

        <main className="max-w-7xl mx-auto px-6 py-10">
          <RecipeGrid 
            meals={displayMeals} 
            loading={view === "explore" ? isLoading : false}
            error={view === "explore" ? displayError : null} 
            label={gridLabel}
            isFavorite={isFavorite} 
            onOpen={openRecipe} 
            onToggleFavorite={toggle}
            onExplore={() => setView("explore")} 
            emptyFavorites={view === "favorites"} 
          />
        </main>

        {selectedId && (
          <RecipeDetails 
            mealId={selectedId} 
            isFavorite={isFavorite(selectedId)}
            onToggleFavorite={toggle} 
            onClose={closeRecipe}
            onAddToShoppingList={addToShoppingList}
          />
        )}

        <FavoritesList
          favorites={favorites}
          isOpen={view === "favorites" && favorites.length > 0}
          onClose={() => setView("explore")}
          onSelectRecipe={openRecipe}
          onRemoveFavorite={toggle}
        />

        <ShoppingList
          items={shoppingItems}
          isOpen={showShoppingList}
          onClose={() => setShowShoppingList(false)}
          onUpdateQuantity={(id, qty) => {
            setShoppingItems(prev => prev.map(item => item.id === id ? { ...item, quantity: qty } : item));
          }}
          onRemoveItem={(id) => {
            setShoppingItems(prev => prev.filter(item => item.id !== id));
          }}
          onClear={() => setShoppingItems([])}
        />
      </div>
    </div>
  );
}