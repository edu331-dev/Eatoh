import { Heart, ShoppingCart, Moon, Sun, UtensilsCrossed } from 'lucide-react';

type View = "explore" | "favorites";

interface Props {
  view: View;
  favCount: number;
  onViewChange: (v: View) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onShowShoppingList: () => void;
  shoppingCount: number;
}

export default function Header({ 
  view, 
  favCount, 
  onViewChange, 
  isDark, 
  onToggleTheme,
  onShowShoppingList,
  shoppingCount
}: Props) {
  return (
    <header className="bg-warm-white dark:bg-ink border-b border-border dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button 
          onClick={() => onViewChange("explore")} 
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <UtensilsCrossed className="w-8 h-8 text-amber" />
          <div className="hidden sm:block">
            <h1 className="font-display text-2xl font-bold text-ink dark:text-cream">Eatoh</h1>
            <p className="text-xs text-muted">Discover · Cook · Enjoy</p>
          </div>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={onShowShoppingList}
            className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Shopping list"
          >
            <ShoppingCart className="w-5 h-5 text-ink dark:text-cream" />
            {shoppingCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber text-white text-xs rounded-full flex items-center justify-center font-medium">
                {shoppingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onViewChange("favorites")}
            className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Favorites"
          >
            <Heart className={`w-5 h-5 ${view === 'favorites' ? 'fill-terracotta text-terracotta' : 'text-ink dark:text-cream'}`} />
            {favCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-terracotta text-white text-xs rounded-full flex items-center justify-center font-medium">
                {favCount}
              </span>
            )}
          </button>

          <button
            onClick={onToggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={isDark ? 'Light mode' : 'Dark mode'}
          >
            {isDark ? <Sun className="w-5 h-5 text-amber" /> : <Moon className="w-5 h-5 text-ink" />}
          </button>

          <nav className="hidden sm:flex items-center gap-2 ml-4">
            <NavBtn active={view === "explore"} onClick={() => onViewChange("explore")}>Explore</NavBtn>
            <NavBtn active={view === "favorites"} onClick={() => onViewChange("favorites")}>Saved{favCount > 0 && ` (${favCount})`}</NavBtn>
          </nav>
        </div>
      </div>
    </header>
  );
}

function NavBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button 
      onClick={onClick} 
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
        active 
          ? 'bg-ink text-cream dark:bg-cream dark:text-ink' 
          : 'text-muted hover:text-ink dark:hover:text-cream'
      }`}
    >
      {children}
    </button>
  );
}