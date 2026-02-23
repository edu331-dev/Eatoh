import { Meal, KENYAN_MEALS } from "./kenyan_meals";

export interface DailyPlan {
  day: number;
  breakfast: Meal;
  lunch: Meal;
  supper: Meal;
  beverage: Meal;
}

export function generateMonthlyPlan(): DailyPlan[] {
  const days = 30;
  const plan: DailyPlan[] = [];

  // Helper to shuffle array (Fisher-Yates)
  const shuffle = <T>(array: T[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Get categories
  const breakfasts = KENYAN_MEALS.filter(m => m.category === 'Breakfast');
  const lunches = KENYAN_MEALS.filter(m => m.category === 'Lunch');
  const suppers = KENYAN_MEALS.filter(m => m.category === 'Supper');
  const beverages = KENYAN_MEALS.filter(m => m.category === 'Beverage');

  // Initialize pools with shuffled data
  let bPool = shuffle([...breakfasts]);
  let lPool = shuffle([...lunches]);
  let sPool = shuffle([...suppers]);
  let dPool = shuffle([...beverages]);

  for (let i = 1; i <= days; i++) {
    // Refill pools if empty to ensure 30 days are covered
    if (bPool.length === 0) bPool = shuffle([...breakfasts]);
    if (lPool.length === 0) lPool = shuffle([...lunches]);
    if (sPool.length === 0) sPool = shuffle([...suppers]);
    if (dPool.length === 0) dPool = shuffle([...beverages]);

    plan.push({
      day: i,
      breakfast: bPool.pop()!,
      lunch: lPool.pop()!,
      supper: sPool.pop()!,
      beverage: dPool.pop()!,
    });
  }

  return plan;
}