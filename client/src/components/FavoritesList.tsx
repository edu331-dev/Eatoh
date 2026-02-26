import { X, Heart } from 'lucide-react';
import type { MealSummary } from '../types/meal';

interface Props {
  favorites: MealSummary[];
  isOpen: boolean;
  onClose: () => void;
  onSelectRecipe: (id: string) => void;
  onRemoveFavorite: (meal: MealSummary) => void;
}

export default function FavoritesList({ 
  favorites, 
  isOpen, 
  onClose, 
  onSelectRecipe, 
  onRemoveFavorite 
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={onClose}>
      <div 
        className="absolute right-0 top-0 h-full w-full max-w-md bg-warm-white dark:bg-ink shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-border dark:border-gray-800">
          <h2 className="font-display text-xl font-bold flex items-center gap-2 text-ink dark:text-cream">
            <Heart className="text-terracotta" fill="currentColor" />
            My Favorites ({favorites.length})
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
            <X size={24} className="text-ink dark:text-cream" />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-80px)] p-4">
          {favorites.length === 0 ? (
            <div className="text-center py-12 text-muted">
              <Heart size={48} className="mx-auto mb-4 opacity-30" />
              <p>No favorites yet.</p>
              <p className="text-sm">Start adding recipes you love!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {favorites.map((recipe) => (
                <div
                  key={recipe.idMeal}
                  className="flex items-center gap-3 p-3 bg-cream dark:bg-gray-800 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                  onClick={() => { onSelectRecipe(recipe.idMeal); onClose(); }}
                >
                  <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-ink dark:text-cream truncate">{recipe.strMeal}</h3>
                    <p className="text-sm text-muted">{recipe.strCategory}</p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); onRemoveFavorite(recipe); }}
                    className="p-2 text-terracotta opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}