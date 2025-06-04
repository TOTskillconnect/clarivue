import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FooterUsageBannerProps {
  minutesRemaining: number;
  totalMinutes: number;
  onUpgrade: () => void;
}

export const FooterUsageBanner: React.FC<FooterUsageBannerProps> = ({
  minutesRemaining,
  totalMinutes,
  onUpgrade
}) => {
  const usagePercentage = ((totalMinutes - minutesRemaining) / totalMinutes) * 100;
  const isLowUsage = minutesRemaining <= 10;

  if (!isLowUsage) return null;

  return (
    <Alert 
      className={cn(
        "fixed bottom-4 left-4 right-4 max-w-2xl mx-auto border-orange-200 bg-orange-50",
        isLowUsage && "animate-pulse"
      )}
    >
      <AlertTriangle className="h-5 w-5 text-orange-500" />
      <AlertTitle className="text-orange-900">
        Running Low on Minutes
      </AlertTitle>
      <AlertDescription className="mt-2">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-orange-800">
            <span>Minutes Remaining</span>
            <span className="font-medium">{minutesRemaining} of {totalMinutes}</span>
          </div>
          <Progress 
            value={usagePercentage} 
            className="bg-orange-200 h-2 [&>div]:bg-orange-500"
          />
          <div className="flex items-center justify-between pt-1">
            <p className="text-sm text-orange-700">
              Upgrade now to avoid interruptions in service
            </p>
            <Button 
              variant="outline"
              size="sm"
              onClick={onUpgrade}
              className="bg-white hover:bg-orange-50 border-orange-200 text-orange-700"
            >
              Upgrade Plan
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
}; 