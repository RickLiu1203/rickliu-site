interface TipBoxProps {
  content: string;
}

export function TipBox({ content }: TipBoxProps) {
  return (
    <div className="p-3 bg-accent/50 rounded-lg border-l-2 border-foreground">
      <p className="text-xs font-mono font-semibold mb-1">Tip:</p>
      <p className="text-xs font-mono text-muted-foreground leading-relaxed">
        {content}
      </p>
    </div>
  );
}
