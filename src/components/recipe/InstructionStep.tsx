import { TipBox } from "./TipBox";
import { InfoBox } from "./InfoBox";

interface InstructionStepProps {
  stepNumber: number;
  description: string;
  imageUrl?: string;
  tip?: string;
  info?: string;
}

export function InstructionStep({
  stepNumber,
  description,
  imageUrl,
  tip,
  info,
}: InstructionStepProps) {
  return (
    <div className="flex gap-3 sm:gap-4">
      <div className="flex-shrink-0">
        <div className="w-8 h-8 rounded-full border border-foreground flex items-center justify-center font-mono font-bold text-sm">
          {stepNumber}
        </div>
      </div>
      <div className="flex-1 pt-1">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="w-full">
            <p className="font-mono text-sm leading-relaxed mb-3">
              {description}
            </p>
            {imageUrl && (
              <div className="sm:hidden mb-3">
                <img
                  src={imageUrl}
                  alt={`Step ${stepNumber}`}
                  className="w-full h-48 object-cover rounded-lg border"
                />
              </div>
            )}
            {info && <InfoBox content={info} />}
            {tip && <TipBox content={tip} />}
          </div>
          {imageUrl && (
            <div className="hidden sm:block w-32 flex-shrink-0">
              <img
                src={imageUrl}
                alt={`Step ${stepNumber}`}
                className="w-full h-32 object-cover rounded-lg border"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
