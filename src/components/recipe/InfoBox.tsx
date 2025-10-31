import { Info } from "lucide-react";

interface InfoBoxProps {
  content: string;
}

export function InfoBox({ content }: InfoBoxProps) {
  return (
    <div className="flex items-start gap-2 mb-4 p-3 bg-muted/50 rounded-lg border">
      <Info className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
      <p className="text-xs font-mono text-muted-foreground leading-relaxed">
        {content}
      </p>
    </div>
  );
}
