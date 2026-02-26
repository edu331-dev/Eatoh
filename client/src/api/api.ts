import type { Meal, MealSummary } from "../types/meal";

const BASE = "https://www.themealdb.com/api/json/v1/1";

async function get<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  return res.json() as Promise<T>;
}

export async function searchMeals(query: string): Promise<MealSummary[]> {
  const data = await get<{ meals: MealSummary[] | null }>(
    `${BASE}/search.php?s=${encodeURIComponent(query.trim())}`
  );
  return data.meals ?? [];
}

export async function getMealsByCategory(category: string): Promise<MealSummary[]> {
  const data = await get<{ meals: MealSummary[] | null }>(
    `${BASE}/filter.php?c=${encodeURIComponent(category)}`
  );
  return data.meals ?? [];
}

export async function getMealById(id: string): Promise<Meal | null> {
  const data = await get<{ meals: Meal[] | null }>(`${BASE}/lookup.php?i=${id}`);
  return data.meals?.[0] ?? null;
}

export async function getCategories(): Promise<string[]> {
  const data = await get<{ meals: { strCategory: string }[] | null }>(
    `${BASE}/list.php?c=list`
  );
  return (data.meals ?? []).map((m) => m.strCategory);
}
