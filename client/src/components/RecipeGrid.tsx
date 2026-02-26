import RecipeCard from "./RecipeCard";
import SkeletonCard from "./SkeletonCard";
import EmptyState from "./EmptyState";
import type { MealSummary } from "../types/meal";

interface Props { 
  meals: MealSummary[]; 
  loading: boolean; 
  error: string | null; 
  label?: string; 
  isFavorite: (id: string) => boolean; 
  onOpen: (id: string) => void; 
  onToggleFavorite: (meal: MealSummary) => void; 
  onExplore?: () => void; 
  emptyFavorites?: boolean; 
}

export default function RecipeGrid({ 
  meals, 
  loading, 
  error, 
  label, 
  isFavorite, 
  onOpen, 
  onToggleFavorite, 
  onExplore, 
  emptyFavorites = false 
}: Props) {
  if (loading) {
    return (
      <div className="recipe-grid" aria-busy="true">
        {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }
  
  if (error) return <EmptyState emoji="🔍" title="No results" subtitle={error} />;
  
  if (emptyFavorites && meals.length === 0) {
    return (
      <EmptyState 
        emoji="🤍" 
        title="No saved recipes yet" 
        subtitle="Tap the heart on any recipe to save it here"
        action={onExplore ? { label: "Explore recipes", onClick: onExplore } : undefined} 
      />
    );
  }
  
  if (meals.length === 0) return null;
  
  return (
    <>
      {label && <p className="text-muted text-sm mb-5">{label}</p>}
      <div className="recipe-grid">
        {meals.map((meal, i) => (
          <RecipeCard 
            key={meal.idMeal} 
            meal={meal} 
            index={i}
            isFavorite={isFavorite(meal.idMeal)} 
            onOpen={onOpen} 
            onToggleFavorite={onToggleFavorite} 
          />
        ))}
      </div>
    </>
  );
}