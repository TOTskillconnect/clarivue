import React from 'react';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  id: number;
  title: string;
  subtitle: string;
  emoji: string;
}

interface OnboardingLayoutProps {
  currentStep: number;
  children: React.ReactNode;
}

const steps: Step[] = [
  {
    id: 1,
    title: "Tell us about yourself",
    subtitle: "What's your role in the hiring jungle?",
    emoji: "🎯"
  },
  {
    id: 2,
    title: "Interview style",
    subtitle: "How do you run interviews?",
    emoji: "🎙️"
  },
  {
    id: 3,
    title: "Your focus",
    subtitle: "Where could Clarivue help you shine?",
    emoji: "✨"
  },
  {
    id: 4,
    title: "Setup preferences",
    subtitle: "Let's personalize your setup",
    emoji: "⚙️"
  },
  {
    id: 5,
    title: "Unlock more",
    subtitle: "You're all set! But want more firepower?",
    emoji: "🚀"
  }
];

export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  currentStep,
  children
}) => {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#acbaff]/5 via-white to-[#7FDCD7]/5">
      {/* Left Column - Stepper */}
      <div className="w-80 bg-white border-r border-border p-8 hidden lg:block">
        <div className="sticky top-8 space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-12">
            <div className="w-8 h-8 rounded-full bg-[#7FDCD7]/20 flex items-center justify-center">
              <span className="text-[#04ADA4] text-xl">✨</span>
            </div>
            <span className="font-semibold text-lg">Clarivue</span>
          </div>

          {/* Time Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#7FDCD7]/10 text-[#04ADA4] rounded-full text-sm">
            <Clock className="w-4 h-4" />
            Less than 2 mins to complete
          </div>

          {/* Steps */}
          <div className="space-y-6">
            {steps.map((step) => (
              <div
                key={step.id}
                className={cn(
                  "flex gap-4 p-4 rounded-lg transition-colors",
                  currentStep === step.id
                    ? "bg-[#7FDCD7]/10 text-[#04ADA4]"
                    : currentStep > step.id
                    ? "text-muted-foreground"
                    : "text-muted-foreground/60"
                )}
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center">
                  {currentStep > step.id ? (
                    "✓"
                  ) : (
                    <span className={currentStep === step.id ? "animate-bounce" : ""}>
                      {step.emoji}
                    </span>
                  )}
                </div>
                <div>
                  <div className="font-medium">{step.title}</div>
                  <div className="text-sm opacity-80">{step.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column - Content */}
      <div className="flex-1 min-h-screen flex flex-col">
        <div className="lg:hidden p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#7FDCD7]/20 flex items-center justify-center">
                <span className="text-[#04ADA4] text-xl">✨</span>
              </div>
              <span className="font-semibold">Clarivue</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Step {currentStep} of {steps.length}
            </div>
          </div>
        </div>
        
        <div className="flex-1 p-8 lg:p-16 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}; 