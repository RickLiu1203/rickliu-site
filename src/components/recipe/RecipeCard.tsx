import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

interface RecipeCardProps {
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

export function RecipeCard({
  slug,
  number,
  title,
  icon,
  thumbnail,
  prepTime,
  cookTime,
  waitTime,
  servings,
}: RecipeCardProps) {
  return (
    <Link href={`/recipes/${slug}`} className="block group">
      <Card className="overflow-hidden cursor-pointer hover:border-foreground transition-all duration-200 active:scale-[0.98]">
        {thumbnail && (
          <div className="aspect-4/3 w-full overflow-hidden bg-muted">
            <Image
              src={thumbnail}
              alt={title}
              width={800}
              height={800}
              className="w-full h-full object-cover transition-transform duration-300"
            />
          </div>
        )}
        <div className="flex flex-col gap-2 p-4 sm:p-6 transition-colors duration-200 group-hover:bg-foreground group-hover:text-background">
          <div className="flex flex-col items-start mb-2">
            {number && (
              <span className="text-base sm:text-lg font-mono font-bold text-gray-300 group-hover:text-gray-500">
                {number}
              </span>
            )}
            <h3 className="text-base sm:text-lg font-mono font-semibold">
              {title}
              <span className="ms-3">{icon}</span>
            </h3>
          </div>
          <div className="flex flex-col gap-2 text-sm font-mono text-muted-foreground group-hover:text-background/70">
            {prepTime && <span>Prep - {prepTime}</span>}
            {cookTime && <span>Cook - {cookTime}</span>}
            {waitTime && <span>Wait - {waitTime}</span>}
            <div className="font-bold text-foreground group-hover:text-background mt-3">
              {servings && <span>{servings}</span>}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
