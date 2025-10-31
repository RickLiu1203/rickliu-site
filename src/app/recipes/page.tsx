"use client";

import { ThemeToggle } from "@/components/ui/theme-toggle";
import { RecipeCard } from "@/components/recipe/RecipeCard";
import { useEffect, useState } from "react";

interface RecipeSummary {
  slug: string;
  number?: string;
  title: string;
  icon?: string;
  thumbnail?: string;
  prepTime?: string;
  cookTime?: string;
  waitTime?: string;
  servings?: string;
}

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<RecipeSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRecipes() {
      try {
        const response = await fetch("/data/recipes-index.json");
        if (!response.ok) {
          throw new Error("Failed to load recipes");
        }
        const data = await response.json();
        setRecipes(data);
      } catch (err) {
        console.error("Error loading recipes:", err);
      } finally {
        setLoading(false);
      }
    }

    loadRecipes();
  }, []);

  useEffect(() => {
    document.title = "Rick's Recipes";
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="font-mono text-muted-foreground">loading recipes...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header>
        <div className="max-w-5xl mx-auto px-6 sm:px-10 py-8 sm:py-12 flex justify-between items-center">
          <h1 className="text-2xl font-mono font-semibold tracking-tight">
            rick's recipes 👨‍🍳
          </h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 sm:px-10 py-8 sm:py-12">
        {recipes.length === 0 ? (
          <div className="text-center py-12 sm:py-24">
            <p className="text-lg font-mono text-muted-foreground mb-2">
              no recipes yet
            </p>
            <p className="text-sm font-mono text-muted-foreground">
              check back soon!
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.slug} {...recipe} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
