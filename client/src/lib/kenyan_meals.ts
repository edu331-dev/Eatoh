export type MealCategory = 'Breakfast' | 'Lunch' | 'Supper' | 'Beverage';

export interface Meal {
  id: string;
  name: string;
  category: MealCategory;
  estimatedPrice: number; // in KES
}

export const KENYAN_MEALS: Meal[] = [
  // Breakfast
  { id: 'b1', name: 'Mandazi & Chai', category: 'Breakfast', estimatedPrice: 50 },
  { id: 'b2', name: 'Uji (Fermented Porridge)', category: 'Breakfast', estimatedPrice: 30 },
  { id: 'b3', name: 'Mahamri & Mbaazi', category: 'Breakfast', estimatedPrice: 80 },
  { id: 'b4', name: 'Sweet Potatoes (Ngwaci) & Tea', category: 'Breakfast', estimatedPrice: 60 },
  { id: 'b5', name: 'Arrowroots (Nduma) & Cocoa', category: 'Breakfast', estimatedPrice: 100 },
  { id: 'b6', name: 'Chapati & Tea', category: 'Breakfast', estimatedPrice: 50 },
  { id: 'b7', name: 'Fried Eggs & Toast', category: 'Breakfast', estimatedPrice: 80 },
  { id: 'b8', name: 'Sausages & Mandazi', category: 'Breakfast', estimatedPrice: 90 },
  { id: 'b9', name: 'Oats & Milk', category: 'Breakfast', estimatedPrice: 70 },
  { id: 'b10', name: 'Pancakes (Kenyan style)', category: 'Breakfast', estimatedPrice: 50 },
  { id: 'b11', name: 'Fruit Salad (Banana, Pawpaw)', category: 'Breakfast', estimatedPrice: 60 },
  { id: 'b12', name: 'Boiled Maize & Tea', category: 'Breakfast', estimatedPrice: 40 },
  
  // Lunch
  { id: 'l1', name: 'Githeri (Maize & Beans)', category: 'Lunch', estimatedPrice: 60 },
  { id: 'l2', name: 'Ugali & Sukuma Wiki', category: 'Lunch', estimatedPrice: 50 },
  { id: 'l3', name: 'Rice & Bean Stew (Madondo)', category: 'Lunch', estimatedPrice: 80 },
  { id: 'l4', name: 'Matoke (Plantains) Stew', category: 'Lunch', estimatedPrice: 100 },
  { id: 'l5', name: 'Chips Masala', category: 'Lunch', estimatedPrice: 150 },
  { id: 'l6', name: 'Ugali & Cabbage', category: 'Lunch', estimatedPrice: 50 },
  { id: 'l7', name: 'Pilau (Beef)', category: 'Lunch', estimatedPrice: 150 },
  { id: 'l8', name: 'Spaghetti & Minced Meat', category: 'Lunch', estimatedPrice: 120 },
  { id: 'l9', name: 'Mukimo & Beef Stew', category: 'Lunch', estimatedPrice: 150 },
  { id: 'l10', name: 'Rice & Ndengu (Green Grams)', category: 'Lunch', estimatedPrice: 80 },
  { id: 'l11', name: 'Bhajia & Kachumbari', category: 'Lunch', estimatedPrice: 100 },
  { id: 'l12', name: 'Ugali & Managu', category: 'Lunch', estimatedPrice: 80 },

  // Supper
  { id: 's1', name: 'Ugali & Omena', category: 'Supper', estimatedPrice: 90 },
  { id: 's2', name: 'Chapati & Ndengu', category: 'Supper', estimatedPrice: 100 },
  { id: 's3', name: 'Rice & Beef Stew', category: 'Supper', estimatedPrice: 150 },
  { id: 's4', name: 'Ugali & Fried Fish', category: 'Supper', estimatedPrice: 200 },
  { id: 's5', name: 'Ugali & Mala (Sour Milk)', category: 'Supper', estimatedPrice: 60 },
  { id: 's6', name: 'Chapati & Beans', category: 'Supper', estimatedPrice: 90 },
  { id: 's7', name: 'Mashed Potatoes & Chicken', category: 'Supper', estimatedPrice: 250 },
  { id: 's8', name: 'Ugali & Scrambled Eggs', category: 'Supper', estimatedPrice: 70 },
  { id: 's9', name: 'Rice & Njahi (Black Beans)', category: 'Supper', estimatedPrice: 100 },
  { id: 's10', name: 'Ugali, Kales & Avocado', category: 'Supper', estimatedPrice: 60 },
  { id: 's11', name: 'Fish Wet Fry & Ugali', category: 'Supper', estimatedPrice: 200 },
  { id: 's12', name: 'Chicken Biryani', category: 'Supper', estimatedPrice: 300 },

  // Beverages
  { id: 'd1', name: 'Masala Tea', category: 'Beverage', estimatedPrice: 20 },
  { id: 'd2', name: 'Fresh Passion Juice', category: 'Beverage', estimatedPrice: 50 },
  { id: 'd3', name: 'Mursik', category: 'Beverage', estimatedPrice: 60 },
  { id: 'd4', name: 'Dawa (Ginger/Lemon/Honey)', category: 'Beverage', estimatedPrice: 40 },
  { id: 'd5', name: 'Tamarind Juice (Ukwaju)', category: 'Beverage', estimatedPrice: 30 },
  { id: 'd6', name: 'Hibiscus Tea', category: 'Beverage', estimatedPrice: 20 },
  { id: 'd7', name: 'Mango Smoothie', category: 'Beverage', estimatedPrice: 60 },
  { id: 'd8', name: 'Camel Milk Tea', category: 'Beverage', estimatedPrice: 50 },
];