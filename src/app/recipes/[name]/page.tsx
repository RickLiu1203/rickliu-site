"use client";

import { Card } from "@/components/ui/card";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { RecipeMeta } from "@/components/recipe/RecipeMeta";
import { RecipeList } from "@/components/recipe/RecipeList";
import { RecipeInstructions } from "@/components/recipe/RecipeInstructions";
import { BoomerangVideo } from "@/components/recipe/BoomerangVideo";
import { useScrambleText } from "@/hooks/useScrambleText";
import { use, useEffect, useState } from "react";

interface Recipe {
  number?: string;
  title: string;
  intro: string;
  mediaUrl?: string;
  mediaType?: "video" | "image" | "gif" | "boomerang";
  mediaYOffset?: string;
  prepTime: string;
  cookTime: string;
  waitTime?: string;
  servings: string;
  subtitle?: string;
  ingredients: string[];
  ingredientsInfo?: string;
  ingredientsTip?: string;
  tools: string[];
  toolsInfo?: string;
  toolsTip?: string;
  steps: Array<{
    description: string;
    imageUrl?: string;
    tip?: string;
    info?: string;
  }>;
}

export default function RecipePage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = use(params);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { displayText: scrambledTitle } = useScrambleText(
    recipe?.title || "",
    800
  );

  useEffect(() => {
    async function loadRecipe() {
      try {
        const response = await fetch(`/data/lib/${name}.json`);
        if (!response.ok) {
          throw new Error("Recipe not found");
        }
        const data = await response.json();
        setRecipe(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load recipe");
      } finally {
        setLoading(false);
      }
    }

    loadRecipe();
  }, [name]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="font-mono text-muted-foreground">Loading recipe...</p>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="font-mono text-muted-foreground mb-4">
            {error || "Recipe not found"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header>
        <div className="max-w-4xl mx-auto px-4 sm:px-8 py-4 sm:py-6 flex justify-end">
          <ThemeToggle />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
        <div>
          {/* Title and Intro */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-mono font-bold tracking-tight mb-3 sm:mb-4">
              {recipe.number && (
                <span className="text-gray-300 mr-2 sm:mr-4">
                  {recipe.number}
                </span>
              )}
              {scrambledTitle}
            </h1>
            <p className="text-sm sm:text-base font-mono text-muted-foreground leading-relaxed max-w-3xl">
              {recipe.intro}
            </p>
          </div>

          {/* Media Section */}
          {recipe.mediaUrl && (
            <Card className="p-0 mb-6 sm:mb-8 overflow-hidden">
              <div className="aspect-video w-full">
                {recipe.mediaType === "video" ? (
                  <iframe
                    width="100%"
                    height="100%"
                    src={recipe.mediaUrl}
                    title="Recipe Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : recipe.mediaType === "boomerang" ? (
                  <BoomerangVideo
                    src={recipe.mediaUrl}
                    alt={recipe.title}
                    className="w-full h-full"
                    yOffset={recipe.mediaYOffset}
                  />
                ) : (
                  <img
                    src={recipe.mediaUrl}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </Card>
          )}

          {/* Recipe Meta Info */}
          <RecipeMeta
            prepTime={recipe.prepTime}
            cookTime={recipe.cookTime}
            waitTime={recipe.waitTime}
            servings={recipe.servings}
            subtitle={recipe.subtitle}
          />

          {/* Two Column Layout for Ingredients & Tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <RecipeList
              title="Ingredients"
              items={recipe.ingredients}
              info={recipe.ingredientsInfo}
              tip={recipe.ingredientsTip}
            />
            <RecipeList
              title="Tools"
              items={recipe.tools}
              info={recipe.toolsInfo}
              tip={recipe.toolsTip}
            />
          </div>

          {/* Instructions */}
          <RecipeInstructions steps={recipe.steps} />
        </div>
      </main>
    </div>
  );
}
