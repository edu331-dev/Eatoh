import type { MealSummary } from "../types/meal";

interface Props { meal: MealSummary; index: number; isFavorite: boolean; onOpen: (id: string) => void; onToggleFavorite: (meal: MealSummary) => void; }

export default function RecipeCard({ meal, index, isFavorite, onOpen, onToggleFavorite }: Props) {
  return (
    <article className="recipe-card fade-up" style={{ animationDelay: `${Math.min(index, 12) * 55}ms` }}
      onClick={() => onOpen(meal.idMeal)} role="button" tabIndex={0}
      aria-label={`View ${meal.strMeal} recipe`}
      onKeyDown={(e) => e.key === "Enter" && onOpen(meal.idMeal)}>
      <div style={{ position: "relative" }}>
        <img src={`${meal.strMealThumb}/preview`} alt={meal.strMeal} loading="lazy"
          style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }} />
        <button className={`fav-btn${isFavorite ? " is-fav" : ""}`}
          style={{ position: "absolute", top: 10, right: 10 }}
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(meal); }}
          aria-label={isFavorite ? "Remove from favourites" : "Add to favourites"}>
          {isFavorite ? "❤️" : "🤍"}
        </button>
        {meal.strCategory && (
          <span className="tag tag-amber" style={{ position: "absolute", bottom: 10, left: 10 }}>{meal.strCategory}</span>
        )}
      </div>
      <div style={{ padding: "13px 16px 16px" }}>
        <h3 className="font-display" style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.3, marginBottom: 6, color: "var(--ink)" }}>{meal.strMeal}</h3>
        {meal.strArea && (
          <span style={{ fontSize: 12, color: "var(--muted)", display: "flex", alignItems: "center", gap: 4 }}>🌍 {meal.strArea} Cuisine</span>
        )}
      </div>
    </article>
  );
}