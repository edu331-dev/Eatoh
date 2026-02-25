import { useState, useCallback, useEffect } from "react";
import type { MealSummary } from "../types/meal";

const STORAGE_KEY = "eatoh_favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<MealSummary[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setFavorites(JSON.parse(saved));
    } catch {
      console.error("Failed to load favorites");
    }
  }, []);

  // Save to localStorage when favorites change
  useEffect(() => {
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