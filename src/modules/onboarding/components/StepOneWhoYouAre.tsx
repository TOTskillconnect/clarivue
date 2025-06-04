import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { OnboardingData } from '../pages/OnboardingScreen';
import { cn } from '@/lib/utils';
import { Users2, Target, UserCircle2, Sparkles } from 'lucide-react';

interface StepOneProps {
  data: OnboardingData;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
}

const roles = [
  {
    id: 'recruiter',
    title: 'Recruiter',
    icon: Users2,
    description: 'I source and screen candidates'
  },
  {
    id: 'hiring_manager',
    title: 'Hiring Manager',
    icon: Target,
    description: 'I make hiring decisions'
  },
  {
    id: 'interviewer',
    title: 'Interviewer',
    icon: UserCircle2,
    description: 'I conduct technical interviews'
  },
  {
    id: 'other',
    title: 'Other',
    icon: Sparkles,
    description: 'I have a different role'
  }
];

export const StepOneWhoYouAre: React.FC<StepOneProps> = ({
  data,
  onUpdate,
  onNext
}) => {
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  const handleRoleSelect = (roleId: string) => {
    onUpdate({ role: roleId });
    setShowAdditionalFields(true);
  };

  const isComplete = () => {
    if (!data.role) return false;
    if (showAdditionalFields) {
      return data.workStyle && data.companySize && data.referralSource;
    }
    return true;
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold mb-2">What's your role in the hiring jungle?</h1>
        <p className="text-muted-foreground">Help us tailor your experience by telling us a bit about yourself.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <Card
              key={role.id}
              className={cn(
                "p-6 cursor-pointer transition-all hover:shadow-md",
                data.role === role.id && "ring-2 ring-[#7FDCD7] bg-[#7FDCD7]/5"
              )}
              onClick={() => handleRoleSelect(role.id)}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#7FDCD7]/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#04ADA4]" />
                </div>
                <div>
                  <h3 className="font-medium">{role.title}</h3>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {showAdditionalFields && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="space-y-4">
            <label className="text-sm text-muted-foreground block">
              What's your vibe?
            </label>
            <Select
              value={data.workStyle}
              onValueChange={(value: string) => onUpdate({ workStyle: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select your work style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hands_on">Hands-on</SelectItem>
                <SelectItem value="strategic">Strategic</SelectItem>
                <SelectItem value="curious">Curious Explorer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <label className="text-sm text-muted-foreground block">
              How big is your team?
            </label>
            <Select
              value={data.companySize}
              onValueChange={(value: string) => onUpdate({ companySize: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solo">Just me (1)</SelectItem>
                <SelectItem value="small">Small team (2–10)</SelectItem>
                <SelectItem value="growing">Growing org (11–50)</SelectItem>
                <SelectItem value="medium">Medium-sized org (51–200)</SelectItem>
                <SelectItem value="large">Large org (200+)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <label className="text-sm text-muted-foreground block">
              How did you hear about us?
            </label>
            <Input
              value={data.referralSource || ''}
              onChange={(e) => onUpdate({ referralSource: e.target.value })}
              placeholder="Let us know where you found us"
            />
          </div>
        </div>
      )}

      <div className="pt-6">
        <Button
          onClick={onNext}
          disabled={!isComplete()}
          className="w-full bg-[#7FDCD7] hover:bg-[#04ADA4] text-white"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}; 