import { InfoBox } from "./InfoBox";
import { TipBox } from "./TipBox";

interface RecipeListProps {
  title: string;
  items: string[];
  info?: string;
  tip?: string;
}

export function RecipeList({ title, items, info, tip }: RecipeListProps) {
  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-mono font-bold mb-3 tracking-tight">
        {title}
      </h2>
      {info && <InfoBox content={info} />}
      <div className="space-y-2 sm:space-y-3 mb-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-2 sm:gap-3 font-mono text-sm"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-foreground mt-1.5 sm:mt-2 flex-shrink-0" />
            <span className="leading-relaxed">{item}</span>
          </div>
        ))}
      </div>
      {tip && <TipBox content={tip} />}
    </div>
  );
}
