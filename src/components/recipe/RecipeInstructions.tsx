import { InstructionStep } from "./InstructionStep";

interface Step {
  description: string;
  imageUrl?: string;
  tip?: string;
  info?: string;
}

interface RecipeInstructionsProps {
  steps: Step[];
}

export function RecipeInstructions({ steps }: RecipeInstructionsProps) {
  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-mono font-bold mb-6 sm:mb-8 tracking-tight">
        Instructions
      </h2>
      <div className="space-y-6 sm:space-y-8">
        {steps.map((step, index) => (
          <InstructionStep
            key={index}
            stepNumber={index + 1}
            description={step.description}
            imageUrl={step.imageUrl}
            tip={step.tip}
            info={step.info}
          />
        ))}
      </div>
    </div>
  );
}
