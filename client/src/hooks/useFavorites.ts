import { useState, useCallback, useEffect } from "react";
import type { MealSummary } from "../types/meal";

const STORAGE_KEY = "eatoh_favorites";

export function useSearch() {
  const [results, setResults]               = useState<MealSummary[]>([]);
  const [status, setStatus]                 = useState<SearchStatus>("idle");
  const [error, setError]                   = useState<string | null>(null);
  const [activeQuery, setActiveQuery]       = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const search = useCallback(async (query: string) => {
    const q = query.trim();
    if (!q) return;
    setStatus("loading"); setError(null); setActiveCategory(null); setActiveQuery(q);
    try {
      const meals = await searchMeals(q);
      setResults(meals);
      if (meals.length === 0) { setError(`No recipes found for "${q}". Try another dish name!`); setStatus("error"); }
      else setStatus("success");
    } catch {
      console.error("Failed to load favorites");
    }
  }, []);

  const browseCategory = useCallback(async (category: string) => {
    setStatus("loading"); setError(null); setActiveQuery(""); setActiveCategory(category);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      console.error("Failed to save favorites");
    }
  }, [favorites]);

  const toggle = useCallback((meal: MealSummary) => {
    setFavorites((prev) => {
      const exists = prev.find((m) => m.idMeal === meal.idMeal);
      if (exists) {
        return prev.filter((m) => m.idMeal !== meal.idMeal);
      }
      return [...prev, meal];
    });
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.some((m) => m.idMeal === id),
    [favorites]
  );

  return { favorites, toggle, isFavorite };
}