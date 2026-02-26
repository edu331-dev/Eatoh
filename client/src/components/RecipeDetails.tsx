import { useEffect, useState } from "react";
import { X, Heart, ExternalLink, Plus, ChefHat } from 'lucide-react';
import { getMealById } from "../api/api";
import { getIngredients, parseSteps, getYouTubeId } from "../lib/utils";
import type { Meal, MealSummary } from "../types/meal";

interface Props { 
  mealId: string; 
  isFavorite: boolean; 
  onToggleFavorite: (meal: MealSummary) => void; 
  onClose: () => void;
  onAddToShoppingList?: (ingredients: { ingredient: string; measure: string }[], recipeName: string) => void;
}

export default function RecipeDetails({ 
  mealId, 
  isFavorite, 
  onToggleFavorite, 
  onClose,
  onAddToShoppingList 
}: Props) {
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => { 
    document.body.style.overflow = "hidden"; 
    return () => { document.body.style.overflow = ""; }; 
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getMealById(mealId)
      .then((m) => { if (!m) throw new Error("Not found"); setMeal(m); })
      .catch(() => setError("Failed to load the recipe. Please try again."))
      .finally(() => setLoading(false));
  }, [mealId]);

  const ingredients = meal ? getIngredients(meal) : [];
  const steps = meal ? parseSteps(meal.strInstructions) : [];
  const ytId = meal ? getYouTubeId(meal.strYoutube) : null;

  if (loading) {
    return (
      <div className="modal-overlay">
        <div className="modal p-16 text-center">
          <div className="spinner mx-auto mb-4" />
          <p className="text-muted">Loading recipe...</p>
        </div>
      </div>
    );
  }

  if (error || !meal) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal p-16 text-center">
          <p className="text-terracotta text-lg mb-4">{error || "Recipe not found"}</p>
          <button onClick={onClose} className="btn-primary">Close</button>
        </div>
      </div>
    );
  }

  const summary: MealSummary = {
    idMeal: meal.idMeal,
    strMeal: meal.strMeal,
    strMealThumb: meal.strMealThumb,
    strCategory: meal.strCategory,
    strArea: meal.strArea
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="relative">
          <img 
            src={meal.strMealThumb} 
            alt={meal.strMeal}
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">{meal.strMeal}</h2>
                <div className="flex flex-wrap gap-2">
                  {meal.strCategory && <span className="tag tag-amber">{meal.strCategory}</span>}
                  {meal.strArea && <span className="tag tag-sage">🌍 {meal.strArea}</span>}
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => onAddToShoppingList?.(ingredients, meal.strMeal)}
                  className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                  title="Add to shopping list"
                >
                  <Plus size={20} />
                </button>
                <button
                  onClick={() => onToggleFavorite(summary)}
                  className={`p-3 rounded-full transition-colors ${isFavorite ? 'bg-red-500' : 'bg-white/20 hover:bg-white/30'}`}
                >
                  <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          <section>
            <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2 text-brown dark:text-amber">
              <ChefHat size={20} />
              Ingredients
            </h3>
            <div className="flex flex-wrap gap-2">
              {ingredients.map(({ ingredient, measure }, i) => (
                <div key={i} className="ing-pill">
                  {measure && <strong className="text-ink dark:text-cream">{measure}</strong>}
                  <span className="text-muted">{ingredient}</span>
                </div>
              ))}
            </div>
          </section>

          {steps.length > 0 && (
            <section>
              <h3 className="font-display text-xl font-bold mb-4 text-brown dark:text-amber">Instructions</h3>
              <div className="space-y-0">
                {steps.map((step, i) => (
                  <div key={i} className="recipe-step">
                    <div className="step-num">{i + 1}</div>
                    <p className="text-ink dark:text-cream leading-relaxed pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {ytId && (
            <section>
              <h3 className="font-display text-xl font-bold mb-4 text-brown dark:text-amber">Video Tutorial</h3>
              <div className="aspect-video rounded-xl overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${ytId}`}
                  title={`${meal.strMeal} video`}
                  allowFullScreen
                />
              </div>
            </section>
          )}

          {meal.strSource && (
            <a 
              href={meal.strSource} 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-amber hover:text-amber-light font-medium transition-colors"
            >
              <ExternalLink size={16} />
              View full recipe on TheMealDB
            </a>
          )}
        </div>
      </div>
    </div>
  );
}