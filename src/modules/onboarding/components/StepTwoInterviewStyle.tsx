import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { OnboardingData } from '../pages/OnboardingScreen';
import { cn } from '@/lib/utils';
import { Video, Phone } from 'lucide-react';

interface StepTwoProps {
  data: OnboardingData;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
}

const interviewStyles = [
  {
    id: 'video',
    title: 'Video conference',
    description: 'I often use tools like Zoom, Microsoft Teams, or Google Meet to conduct my interviews.',
    icon: Video
  },
  {
    id: 'phone',
    title: 'Phone',
    description: 'I tend to use my mobile or a landline to conduct my interviews.',
    icon: Phone
  }
];

export const StepTwoInterviewStyle: React.FC<StepTwoProps> = ({
  data,
  onUpdate,
  onNext
}) => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold mb-2">How do you usually conduct your interviews?</h1>
        <p className="text-muted-foreground">
          To help us get you set up as quickly as possible, tell us where you most commonly conduct your interviews.
          If you use a mix, just pick the one you use most often. Or, pick the one where your next interview will be.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {interviewStyles.map((style) => {
          const Icon = style.icon;
          return (
            <Card
              key={style.id}
              className={cn(
                "p-6 cursor-pointer transition-all hover:shadow-md",
                data.interviewStyle === style.id && "ring-2 ring-[#7FDCD7] bg-[#7FDCD7]/5"
              )}
              onClick={() => onUpdate({ interviewStyle: style.id })}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#7FDCD7]/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#04ADA4]" />
                </div>
                <div>
                  <h3 className="font-medium">{style.title}</h3>
                  <p className="text-sm text-muted-foreground">{style.description}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="pt-6">
        <Button
          onClick={onNext}
          disabled={!data.interviewStyle}
          className="w-full bg-[#7FDCD7] hover:bg-[#04ADA4] text-white"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}; 