import type { Meal, IngredientEntry } from "../types/meal";

export function getIngredients(meal: Meal): IngredientEntry[] {
  const list: IngredientEntry[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = (meal[`strIngredient${i}` as keyof Meal] as string | null)?.trim();
    const measure = (meal[`strMeasure${i}` as keyof Meal] as string | null)?.trim();
    if (ingredient) list.push({ ingredient, measure: measure ?? "" });
  }
  return list;
}

export function parseSteps(instructions: string | null): string[] {
  if (!instructions) return [];
  return instructions
    .split(/\r\n|\r|\n/)
    .map((s) => s.replace(/^\d+[\.\)]\s*/, "").trim())
    .filter((s) => s.length > 20);
}

export function getYouTubeId(url: string | null): string | null {
  if (!url) return null;
  const match = url.match(/[?&]v=([^&]+)/);
  return match?.[1] ?? null;
}

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}