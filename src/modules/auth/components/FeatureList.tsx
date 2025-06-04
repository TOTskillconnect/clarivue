import React from 'react';
import { Puzzle, Timer, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Feature {
  text: string;
  type: 'integration' | 'speed' | 'free';
}

interface FeatureListProps {
  features: Feature[];
}

export const FeatureList: React.FC<FeatureListProps> = ({ features }) => {
  const getIcon = (type: Feature['type']) => {
    switch (type) {
      case 'integration':
        return <Puzzle className="w-5 h-5 text-primary" />;
      case 'speed':
        return <Timer className="w-5 h-5 text-accent" />;
      case 'free':
        return <CreditCard className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <div className="space-y-3">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className={cn(
            "w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center",
            feature.type === 'speed' ? "from-accent/20 to-primary/20" : "from-primary/20 to-accent/20"
          )}>
            {getIcon(feature.type)}
          </div>
          <span className="text-text-secondary">{feature.text}</span>
        </div>
      ))}
    </div>
  );
}; 