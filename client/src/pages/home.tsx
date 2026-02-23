import { useState, useMemo } from "react";
import { generateMonthlyPlan } from "@/lib/meal-generator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RefreshCw, ChefHat, CalendarDays, Coffee, Sun, Moon, Utensils } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [key, setKey] = useState(0);
  
  // Memoize plan so it doesn't regenerate on every render, only when key changes
  const plan = useMemo(() => generateMonthlyPlan(), [key]);

  const handleShuffle = () => {
    setKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-12 px-4 shadow-lg mb-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 flex items-center justify-center gap-3">
            <ChefHat className="h-10 w-10 text-accent" />
            Mlo Kenya Planner
          </h1>
          <p className="text-xl md:text-2xl font-light opacity-90">
            Affordable, diverse, and delicious Kenyan meals for 30 days.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <Card className="border-t-4 border-t-accent shadow-md bg-white">
          <CardHeader className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 pb-6 border-b border-border">
            <div className="space-y-1 text-center sm:text-left">
              <CardTitle className="text-2xl font-bold text-primary flex items-center justify-center sm:justify-start gap-2">
                <CalendarDays className="h-6 w-6" />
                30-Day Meal Prep Routine
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Automatically shuffled. Minimized repetition.
              </p>
            </div>
            <Button 
              onClick={handleShuffle} 
              size="lg" 
              className="bg-secondary hover:bg-secondary/90 text-white font-bold shadow-sm transition-all hover:scale-105"
            >
              <RefreshCw className="mr-2 h-5 w-5" />
              Shuffle Month
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead className="w-[80px] font-bold text-primary text-center">Day</TableHead>
                    <TableHead className="font-bold text-foreground min-w-[150px]">
                        <span className="flex items-center gap-2"><Sun className="h-4 w-4 text-accent" /> Breakfast</span>
                    </TableHead>
                    <TableHead className="font-bold text-foreground min-w-[150px]">
                        <span className="flex items-center gap-2"><Utensils className="h-4 w-4 text-secondary" /> Lunch</span>
                    </TableHead>
                    <TableHead className="font-bold text-foreground min-w-[150px]">
                        <span className="flex items-center gap-2"><Moon className="h-4 w-4 text-primary" /> Supper</span>
                    </TableHead>
                    <TableHead className="font-bold text-foreground min-w-[150px]">
                        <span className="flex items-center gap-2"><Coffee className="h-4 w-4 text-amber-700" /> Beverage</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plan.map((day, index) => (
                    <motion.tr 
                      key={`${key}-${day.day}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.02 }}
                      className="group hover:bg-muted/20 transition-colors border-b border-border/50 last:border-0"
                    >
                      <TableCell className="font-bold text-center text-primary/80 bg-muted/10">
                        {day.day}
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="font-medium">{day.breakfast.name}</span>
                        <div className="text-xs text-muted-foreground mt-1">Est. KES {day.breakfast.estimatedPrice}</div>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="font-medium">{day.lunch.name}</span>
                        <div className="text-xs text-muted-foreground mt-1">Est. KES {day.lunch.estimatedPrice}</div>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="font-medium">{day.supper.name}</span>
                        <div className="text-xs text-muted-foreground mt-1">Est. KES {day.supper.estimatedPrice}</div>
                      </TableCell>
                      <TableCell className="py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/20 text-accent-foreground border border-accent/30">
                          {day.beverage.name}
                        </span>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}