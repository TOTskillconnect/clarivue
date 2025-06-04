import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

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
        "relative rounded-lg shadow-lg p-4",
        "bg-gradient-to-r from-orange-500/90 to-red-500/90 backdrop-blur-sm",
        "flex items-center justify-between",
        "border border-orange-400/20"
      )}>
        <div className="flex items-center gap-4">
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
            <span className="text-sm text-orange-100">
              Upgrade now to continue using Clarivue without interruption
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="default"
            size="sm"
            className="bg-white hover:bg-orange-50 text-orange-600 shadow-sm"
            onClick={() => window.location.href = '/dashboard/upgrade'}
          >
            Upgrade Now
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-orange-100 hover:text-white hover:bg-orange-500/20"
            onClick={() => setIsDismissed(true)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}; 