import { useState, useCallback } from "react";
import { searchMeals, getMealsByCategory } from "../lib/api";
import type { MealSummary } from "../types/meal";

export type SearchStatus = "idle" | "loading" | "success" | "error";

export function useSearch() {
  const [results, setResults] = useState<MealSummary[]>([]);
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [activeQuery, setActiveQuery] = useState<string>("");
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
      setError("Something went wrong. Please check your connection and try again.");
      setStatus("error");
    }
  }, []);

  const browseCategory = useCallback(async (category: string) => {
    setStatus("loading"); setError(null); setActiveQuery(""); setActiveCategory(category);
    try {
      const meals = await getMealsByCategory(category);
      setResults(meals);
      setStatus(meals.length > 0 ? "success" : "error");
      if (meals.length === 0) setError(`No recipes found in "${category}".`);
    } catch {
      setError("Failed to load category. Please try again.");
      setStatus("error");
    }
  }, []);

  const reset = useCallback(() => {
    setResults([]); setStatus("idle"); setError(null);
    setActiveQuery(""); setActiveCategory(null);
  }, []);

  return { results, status, error, activeQuery, activeCategory, search, browseCategory, reset };
}