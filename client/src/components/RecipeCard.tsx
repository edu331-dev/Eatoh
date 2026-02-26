import { Heart } from 'lucide-react';
import type { MealSummary } from "../types/meal";

interface Props { 
  meal: MealSummary; 
  index: number; 
  isFavorite: boolean; 
  onOpen: (id: string) => void; 
  onToggleFavorite: (meal: MealSummary) => void; 
}

export default function RecipeCard({ meal, index, isFavorite, onOpen, onToggleFavorite }: Props) {
  return (
    <article 
      className="recipe-card fade-up" 
      style={{ animationDelay: `${Math.min(index, 12) * 55}ms` }}
      onClick={() => onOpen(meal.idMeal)} 
      role="button" 
      tabIndex={0}
      aria-label={`View ${meal.strMeal} recipe`}
      onKeyDown={(e) => e.key === "Enter" && onOpen(meal.idMeal)}
    >
      <div className="relative">
        <img 
          src={`${meal.strMealThumb}/preview`} 
          alt={meal.strMeal} 
          loading="lazy"
          className="w-full h-48 object-cover"
        />
        <button 
          className={`fav-btn absolute top-2 right-2 ${isFavorite ? "is-fav" : ""}`}
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(meal); }}
          aria-label={isFavorite ? "Remove from favourites" : "Add to favourites"}
        >
          <Heart size={18} className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'} />
        </button>
        
        {meal.strCategory && (
          <span className="tag tag-amber absolute bottom-2 left-2">{meal.strCategory}</span>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-display text-lg font-bold mb-1 text-ink dark:text-cream line-clamp-2">
          {meal.strMeal}
        </h3>
        {meal.strArea && (
          <p className="text-sm text-muted flex items-center gap-1">
            🌍 {meal.strArea} Cuisine
          </p>
        )}
      </div>
    </article>
  );
}