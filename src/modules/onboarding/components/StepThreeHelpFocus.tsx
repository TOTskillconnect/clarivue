import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { OnboardingData } from '../pages/OnboardingScreen';
import { cn } from '@/lib/utils';
import { MessageSquareText, NotebookPen, FileText, LineChart, AlertTriangle, Brain, ClipboardList } from 'lucide-react';

interface StepThreeProps {
  data: OnboardingData;
  onUpdate: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
}

const helpAreas = [
  {
    id: 'follow_up',
    title: 'Smart follow-up prompts',
    description: 'Get intelligent suggestions for follow-up questions',
    icon: MessageSquareText
  },
  {
    id: 'notes',
    title: 'Taking killer notes',
    description: 'Automated note-taking and key points capture',
    icon: NotebookPen
  },
  {
    id: 'summaries',
    title: 'Post-call summaries',
    description: 'Comprehensive interview summaries and highlights',
    icon: FileText
  },
  {
    id: 'analysis',
    title: 'Tone and emotion analysis',
    description: 'Understand candidate sentiment and engagement',
    icon: LineChart
  },
  {
    id: 'red_flags',
    title: 'Spotting red flags 👀',
    description: 'Early warning system for potential concerns',
    icon: AlertTriangle
  },
  {
    id: 'decisions',
    title: 'Making better decisions',
    description: 'Data-driven insights for hiring decisions',
    icon: Brain
  },
  {
    id: 'admin',
    title: 'Less admin work',
    description: 'Automate repetitive tasks and documentation',
    icon: ClipboardList
  }
];

export const StepThreeHelpFocus: React.FC<StepThreeProps> = ({
  data,
  onUpdate,
  onNext
}) => {
  const selectedAreas = data.helpAreas || [];

  const toggleArea = (areaId: string) => {
    const newAreas = selectedAreas.includes(areaId)
      ? selectedAreas.filter(id => id !== areaId)
      : [...selectedAreas, areaId];
    onUpdate({ helpAreas: newAreas });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Where could Clarivue help you shine?</h1>
        <p className="text-muted-foreground">
          Select the areas where you'd like Clarivue to assist you. Choose as many as you like!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {helpAreas.map((area) => {
          const Icon = area.icon;
          const isSelected = selectedAreas.includes(area.id);
          
          return (
            <Card
              key={area.id}
              className={cn(
                "p-6 cursor-pointer transition-all hover:shadow-md relative overflow-hidden",
                isSelected && "ring-2 ring-[#7FDCD7] bg-[#7FDCD7]/5"
              )}
              onClick={() => toggleArea(area.id)}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#04ADA4] text-white flex items-center justify-center">
                  ✓
                </div>
              )}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#7FDCD7]/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#04ADA4]" />
                </div>
                <div>
                  <h3 className="font-medium">{area.title}</h3>
                  <p className="text-sm text-muted-foreground">{area.description}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="pt-6">
        <Button
          onClick={onNext}
          disabled={selectedAreas.length === 0}
          className="w-full bg-[#7FDCD7] hover:bg-[#04ADA4] text-white"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}; 