import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { UserPlus, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { TeamUsage } from '../types';

interface TeamUsageCardProps {
  usage?: TeamUsage;
  onInvite: () => void;
}

export const TeamUsageCard: React.FC<TeamUsageCardProps> = ({ 
  usage = {
    totalConversations: 0,
    monthlyLimit: 60,
    members: { active: 1, archived: 0 }
  },
  onInvite
}) => {
  const usagePercentage = (usage.totalConversations / usage.monthlyLimit) * 100;
  const isLowUsage = usagePercentage < 30;
  const isHighUsage = usagePercentage > 80;

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-xl font-semibold text-gray-900">
            Team Usage (Free Tier)
          </CardTitle>
          <CardDescription className="mt-1">
            Track your team's conversation minutes
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
              <p>Add team members to increase free usage limit</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {/* Usage Stats */}
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <Label className="text-sm font-medium text-gray-500">Monthly Usage</Label>
              <span className="text-sm font-medium text-gray-900">
                {usage.totalConversations} / {usage.monthlyLimit} minutes
              </span>
            </div>
            
            {/* Usage Meter */}
            <div className="space-y-1">
              <Progress 
                value={usagePercentage} 
                className={cn(
                  "h-2",
                  isLowUsage && "bg-emerald-100 [&>div]:bg-emerald-500",
                  !isLowUsage && !isHighUsage && "bg-blue-100 [&>div]:bg-blue-500",
                  isHighUsage && "bg-orange-100 [&>div]:bg-orange-500"
                )}
              />
              {isHighUsage && (
                <p className="text-xs text-orange-600 animate-pulse">
                  Running low on minutes! Consider upgrading.
                </p>
              )}
            </div>
          </div>

          {/* Team Stats */}
          <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900">Active Members</p>
              <p className="text-2xl font-semibold text-gray-900">{usage.members.active}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Minutes/Member</p>
              <p className="text-2xl font-semibold text-gray-900">
                {Math.floor(usage.monthlyLimit / Math.max(usage.members.active, 1))}
              </p>
            </div>
          </div>

          {/* CTA */}
          <Button 
            onClick={onInvite}
            className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-200"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Invite team members
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}; 