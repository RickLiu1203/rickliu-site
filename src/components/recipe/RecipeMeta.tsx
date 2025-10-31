import { Clock, Users } from "lucide-react";

interface RecipeMetaProps {
  prepTime: string;
  cookTime: string;
  waitTime?: string;
  servings: string;
  subtitle?: string;
}

function parseDuration(timeStr: string): number {
  const match = timeStr.match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

export function RecipeMeta({
  prepTime,
  cookTime,
  waitTime,
  servings,
  subtitle,
}: RecipeMetaProps) {
  const prepMinutes = parseDuration(prepTime);
  const cookMinutes = parseDuration(cookTime);
  const totalMinutes = prepMinutes + cookMinutes;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
      <div className="flex gap-3 p-4 sm:p-6 border rounded-lg">
        <Clock className="h-5 w-5 text-muted-foreground" />
        <div className="flex-1">
          <div className="text-xs sm:text-sm font-mono text-muted-foreground uppercase tracking-wide mb-2">
            Time
          </div>
          <div className="text-lg sm:text-xl font-mono font-semibold mb-1">
            {totalMinutes} min{waitTime && "*"}
          </div>
          <div className="text-xs sm:text-sm font-mono text-muted-foreground space-y-0.5">
            <div>prep - {prepTime}</div>
            <div>cook - {cookTime}</div>
            {waitTime && <div>wait - {waitTime}*</div>}
          </div>
        </div>
      </div>
      <div className="flex gap-3 p-4 sm:p-6 border rounded-lg">
        <Users className="h-5 w-5 text-muted-foreground" />
        <div className="flex-1">
          <div className="text-xs sm:text-sm font-mono text-muted-foreground uppercase tracking-wide mb-1">
            Servings
          </div>
          <div className="text-lg sm:text-xl font-mono font-semibold mb-1">
            {servings}
          </div>
          {subtitle && (
            <div className="text-xs sm:text-sm font-mono text-muted-foreground">
              {subtitle}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
