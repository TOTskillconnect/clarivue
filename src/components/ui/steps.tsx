import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  label: string;
  description?: string;
}

interface StepsProps {
  steps: Step[];
  currentStep: string;
  className?: string;
}

export function Steps({ steps, currentStep, className }: StepsProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="relative flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = steps.findIndex(s => s.id === currentStep) > index;
          const isCurrent = step.id === currentStep;

          return (
            <div
              key={step.id}
              className="flex flex-1 flex-col items-center"
            >
              {/* Line */}
              {index !== 0 && (
                <div
                  className={cn(
                    "absolute h-[2px] top-4 -translate-y-1/2",
                    index === 1 ? "left-0 w-1/2" : "left-1/2 w-1/2",
                    isCompleted ? "bg-primary" : "bg-muted"
                  )}
                />
              )}

              {/* Circle and Label */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2",
                    isCompleted && "border-primary bg-primary text-primary-foreground",
                    isCurrent && "border-primary",
                    !isCompleted && !isCurrent && "border-muted bg-muted"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span className="text-sm font-medium">
                      {index + 1}
                    </span>
                  )}
                </div>
                <span
                  className={cn(
                    "text-sm font-medium",
                    (isCompleted || isCurrent) && "text-primary",
                    !isCompleted && !isCurrent && "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
                {step.description && (
                  <span className="text-xs text-muted-foreground">
                    {step.description}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 