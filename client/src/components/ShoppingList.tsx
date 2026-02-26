import { X, Printer, Plus, Minus, ShoppingCart, Trash2 } from 'lucide-react';

interface ShoppingItem {
  id: string;
  ingredient: string;
  measure: string;
  quantity: number;
  recipeName: string;
}

interface Props {
  items: ShoppingItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClear: () => void;
}

export default function ShoppingList({ 
  items, 
  isOpen, 
  onClose, 
  onUpdateQuantity, 
  onRemoveItem,
  onClear 
}: Props) {
  if (!isOpen) return null;

  const handlePrint = () => window.print();

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.ingredient]) acc[item.ingredient] = [];
    acc[item.ingredient].push(item);
    return acc;
  }, {} as Record<string, ShoppingItem[]>);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={onClose}>
      <div 
        className="absolute right-0 top-0 h-full w-full max-w-lg bg-warm-white dark:bg-ink shadow-2xl flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-border dark:border-gray-800 print:hidden">
          <h2 className="font-display text-xl font-bold flex items-center gap-2 text-ink dark:text-cream">
            <ShoppingCart className="text-amber" />
            Shopping List ({items.length})
          </h2>
          <div className="flex gap-2">
            <button onClick={handlePrint} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
              <Printer size={20} className="text-ink dark:text-cream" />
            </button>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
              <X size={24} className="text-ink dark:text-cream" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-12 text-muted">
              <ShoppingCart size={48} className="mx-auto mb-4 opacity-30" />
              <p>Your shopping list is empty.</p>
              <p className="text-sm">Add ingredients from recipe details!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {Object.entries(groupedItems).map(([ingredient, occurrences]) => (
                <div
                  key={ingredient}
                  className="flex items-center justify-between p-3 bg-cream dark:bg-gray-800 rounded-xl"
                >
                  <div className="flex-1">
                    <span className="font-medium text-ink dark:text-cream">{ingredient}</span>
                    <div className="text-sm text-muted">
                      {occurrences.map(o => o.measure).join(', ')}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(occurrences[0].id, Math.max(0, occurrences[0].quantity - 1))}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                    >
                      <Minus size={16} className="text-ink dark:text-cream" />
                    </button>
                    <span className="w-8 text-center font-medium text-ink dark:text-cream">
                      {occurrences.reduce((sum, o) => sum + o.quantity, 0)}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(occurrences[0].id, occurrences[0].quantity + 1)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                    >
                      <Plus size={16} className="text-ink dark:text-cream" />
                    </button>
                    <button
                      onClick={() => onRemoveItem(occurrences[0].id)}
                      className="p-1 text-terracotta hover:bg-red-50 dark:hover:bg-red-900/30 rounded ml-2"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t border-border dark:border-gray-700 print:hidden">
            <button
              onClick={onClear}
              className="w-full py-3 text-terracotta hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-colors font-medium"
            >
              Clear All Items
            </button>
          </div>
        )}
      </div>
    </div>
  );
}