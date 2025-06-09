import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import '@/styles/app.css';

interface FooterUsageBannerProps {
  minutesRemaining: number;
}

export const FooterUsageBanner: React.FC<FooterUsageBannerProps> = ({
  minutesRemaining
}) => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl mx-auto px-4">
      <div className={cn(
        "relative rounded-lg p-4",
        "clarivue-gradient",
        "flex items-center justify-between",
        "clarivue-shadow"
      )}>
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
            <Clock className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-white font-medium">
              {minutesRemaining < 15 ? (
                <span className="animate-pulse">
                  Only {minutesRemaining} minutes remaining!
                </span>
              ) : (
                `${minutesRemaining} minutes remaining this month`
              )}
            </span>
            <span className="text-sm text-white/80">
              Upgrade now to continue using Clarivue without interruption
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="default"
            size="sm"
            className="bg-white hover:bg-gray-50 text-[#04ADA4] font-medium shadow-sm"
            onClick={() => window.location.href = '/dashboard/upgrade'}
          >
            Upgrade Now
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white/80 hover:text-white hover:bg-white/20"
            onClick={() => setIsDismissed(true)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}; 