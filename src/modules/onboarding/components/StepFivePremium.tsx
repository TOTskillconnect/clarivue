import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { OnboardingData } from '../pages/OnboardingScreen';
import { Clock, Sparkles, MessageSquare, Gauge } from 'lucide-react';

interface StepFiveProps {
  data: OnboardingData;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
}

const premiumFeatures = [
  {
    icon: Clock,
    title: '5 hours of transcription',
    description: 'More time to focus on what matters'
  },
  {
    icon: Sparkles,
    title: 'Enhanced detection',
    description: 'Advanced tone and emotion analysis'
  },
  {
    icon: MessageSquare,
    title: 'Priority support',
    description: '24/7 dedicated assistance'
  },
  {
    icon: Gauge,
    title: 'Faster processing',
    description: 'Get insights in real-time'
  }
];

export const StepFivePremium: React.FC<StepFiveProps> = ({
  data,
  onUpdate,
  onNext
}) => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold mb-2">You're all set! But want more firepower?</h1>
        <p className="text-muted-foreground">
          You've got 60 minutes of Clarivue interview magic to start — on us.
          When you're ready to go further, our Premium Minutes Pack has your back.
        </p>
      </div>

      {/* Current Minutes Card */}
      <Card className="p-6 bg-gradient-to-r from-[#7FDCD7]/20 to-[#04ADA4]/10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#7FDCD7]/20 flex items-center justify-center">
            <Clock className="w-6 h-6 text-[#04ADA4]" />
          </div>
          <div>
            <div className="text-sm text-muted-foreground">You currently have</div>
            <div className="text-2xl font-semibold text-[#04ADA4]">60 Free Minutes</div>
          </div>
        </div>
      </Card>

      {/* Premium Features */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Premium Minutes Pack</h3>
              <p className="text-muted-foreground">$49/month or one-time top-up</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#7FDCD7]/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#04ADA4]" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {premiumFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#7FDCD7]/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-[#04ADA4]" />
                  </div>
                  <div>
                    <div className="font-medium">{feature.title}</div>
                    <div className="text-sm text-muted-foreground">{feature.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      <div className="pt-6 space-y-4">
        <Button
          onClick={onNext}
          className="w-full bg-[#7FDCD7] hover:bg-[#04ADA4] text-white"
        >
          Explore Premium
        </Button>
        <Button
          variant="ghost"
          onClick={onNext}
          className="w-full text-muted-foreground hover:text-foreground"
        >
          Maybe later
        </Button>
      </div>
    </div>
  );
}; 