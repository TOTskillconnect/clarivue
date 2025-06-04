import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { OnboardingData } from '../pages/OnboardingScreen';
import { cn } from '@/lib/utils';
import { Calendar, BellRing } from 'lucide-react';

interface StepFourProps {
  data: OnboardingData;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
}

const calendarOptions = [
  {
    id: 'google',
    title: 'Google Calendar',
    icon: '/icons/google-calendar.svg'
  },
  {
    id: 'outlook',
    title: 'Microsoft Outlook',
    icon: '/icons/outlook.svg'
  }
];

export const StepFourSetup: React.FC<StepFourProps> = ({
  data,
  onUpdate,
  onNext
}) => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Let's personalize your setup</h1>
        <p className="text-muted-foreground">
          Connect your calendar and customize how Clarivue works with your interviews.
        </p>
      </div>

      {/* Calendar Integration */}
      <div className="space-y-4">
        <label className="text-sm font-medium">Calendar sync options</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {calendarOptions.map((option) => (
            <Card
              key={option.id}
              className={cn(
                "p-6 cursor-pointer transition-all hover:shadow-md",
                data.calendarIntegration === option.id && "ring-2 ring-[#7FDCD7] bg-[#7FDCD7]/5"
              )}
              onClick={() => onUpdate({ calendarIntegration: option.id })}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                  <img src={option.icon} alt={option.title} className="w-6 h-6" />
                </div>
                <span className="font-medium">{option.title}</span>
              </div>
            </Card>
          ))}
        </div>
        <Button
          variant="ghost"
          className="w-full text-muted-foreground hover:text-foreground"
          onClick={() => onUpdate({ calendarIntegration: 'skip' })}
        >
          Skip for now
        </Button>
      </div>

      {/* Auto-join Settings */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="font-medium">Auto-join Clarivue to upcoming interviews</div>
              <p className="text-sm text-muted-foreground">
                Clarivue will automatically join your scheduled interviews
              </p>
            </div>
            <Switch
              checked={data.autoJoin || false}
              onCheckedChange={(checked: boolean) => onUpdate({ autoJoin: checked })}
            />
          </div>

          {data.autoJoin && (
            <div className="flex items-start justify-between pt-4 border-t">
              <div className="space-y-1">
                <div className="font-medium">Notify me before joining</div>
                <p className="text-sm text-muted-foreground">
                  Get a notification 5 minutes before Clarivue joins
                </p>
              </div>
              <Switch
                checked={data.notifyBefore || false}
                onCheckedChange={(checked: boolean) => onUpdate({ notifyBefore: checked })}
              />
            </div>
          )}
        </div>
      </Card>

      <div className="pt-6">
        <Button
          onClick={onNext}
          className="w-full bg-[#7FDCD7] hover:bg-[#04ADA4] text-white"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}; 