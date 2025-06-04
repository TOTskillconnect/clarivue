import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Info, Users } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { ProUsage } from '../types';

interface ProUsageCardProps {
  usage?: ProUsage;
  onBuySeats: () => void;
}

export const ProUsageCard: React.FC<ProUsageCardProps> = ({ 
  usage = {
    assigned: 0,
    totalSeats: 0
  },
  onBuySeats
}) => {
  const hasSeats = usage.totalSeats > 0;
  const allSeatsAssigned = usage.assigned >= usage.totalSeats;
  const assignedPercentage = hasSeats ? (usage.assigned / usage.totalSeats) * 100 : 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl font-semibold text-gray-900">
              Pro Seat Allocation
            </CardTitle>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
              Pro
            </Badge>
          </div>
          <CardDescription className="mt-1">
            Unlimited conversations and AI insights
          </CardDescription>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Each seat includes unlimited conversations + AI insights</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {/* Seat Allocation Stats */}
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-medium text-gray-500">Seat Allocation</span>
              <span className="text-sm font-medium text-gray-900">
                {usage.assigned} / {usage.totalSeats} seats used
              </span>
            </div>
            
            {/* Allocation Meter */}
            <div className="space-y-1">
              <Progress 
                value={assignedPercentage} 
                className={cn(
                  "h-2",
                  !hasSeats && "bg-gray-100 [&>div]:bg-gray-300",
                  hasSeats && !allSeatsAssigned && "bg-blue-100 [&>div]:bg-blue-500",
                  hasSeats && allSeatsAssigned && "bg-orange-100 [&>div]:bg-orange-500"
                )}
              />
              {hasSeats && allSeatsAssigned && (
                <p className="text-xs text-orange-600">
                  All seats assigned. Need more?
                </p>
              )}
            </div>
          </div>

          {/* Pro Benefits */}
          <div className="bg-blue-50 rounded-lg p-4 space-y-3">
            <h4 className="font-medium text-blue-900">Pro Features Include:</h4>
            <ul className="space-y-2 text-sm text-blue-700">
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-blue-700" />
                Unlimited conversations
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-blue-700" />
                Advanced AI insights
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-blue-700" />
                Priority support
              </li>
            </ul>
          </div>

          {/* CTA */}
          <Button 
            onClick={onBuySeats}
            className="w-full bg-[#7FDCD7] hover:bg-[#04ADA4] text-white"
          >
            <Users className="w-4 h-4 mr-2" />
            {hasSeats ? 'Buy more seats' : 'Get Pro seats'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}; 