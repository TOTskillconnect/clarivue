import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { UserPlus, Link2, Star, Users, Clock, Sparkles } from 'lucide-react';

interface AdminToolsProps {
  teamSize: number;
  unusedProSeats: number;
  minutesRemaining: number;
  onInvite: () => void;
  onCreateInviteLink: () => void;
  onAssignProSeat: () => void;
}

export const AdminTools: React.FC<AdminToolsProps> = ({
  teamSize,
  unusedProSeats,
  minutesRemaining,
  onInvite,
  onCreateInviteLink,
  onAssignProSeat
}) => {
  return (
    <Card className="w-full lg:w-72">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Admin Tools</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quick Actions */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">Quick Actions</h3>
          <div className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              onClick={onInvite}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Add teammate
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={onAssignProSeat}
            >
              <Star className="mr-2 h-4 w-4" />
              Assign Pro seat
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={onCreateInviteLink}
            >
              <Link2 className="mr-2 h-4 w-4" />
              Create invite link
            </Button>
          </div>
        </div>

        <Separator />

        {/* Team Summary */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">Team Summary</h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Users className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Team Size</p>
                <p className="text-2xl font-semibold">{teamSize}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Sparkles className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Unused Pro Seats</p>
                <p className="text-2xl font-semibold">{unusedProSeats}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
              <Clock className="h-5 w-5 text-emerald-500" />
              <div>
                <p className="text-sm font-medium">Minutes Left</p>
                <p className="text-2xl font-semibold">{minutesRemaining}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 