import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, UserPlus } from 'lucide-react';
import { TeamUsageCard } from '../components/TeamUsageCard';
import { ProUsageCard } from '../components/ProUsageCard';
import { TeamMembersTable } from '../components/TeamMembersTable';
import { useTeamManagement } from '../hooks/useTeamManagement';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SetupInterviewButton } from '@/components/ui/setup-interview-button';

export const TeamDashboard: React.FC = () => {
  const {
    activeMembers,
    archivedMembers,
    showArchived,
    setShowArchived,
    openInviteDialog,
    openBuySeatsDialog
  } = useTeamManagement();

  const handleInvite = () => {
    // TODO: Implement invite functionality
  };

  const handleBuySeats = () => {
    // TODO: Implement buy seats functionality
  };

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Team</h1>
        <div className="flex gap-3">
          <SetupInterviewButton />
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Invite Team Member
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add team members list */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add recent activity list */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team Stats</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add team stats */}
          </CardContent>
        </Card>
      </div>

      {/* Usage Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TeamUsageCard onInvite={handleInvite} />
        <ProUsageCard onBuySeats={handleBuySeats} />
      </div>

      {/* Team Members Table */}
      <div className="bg-card rounded-lg border">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold">Team Members</h2>
              <div className="flex gap-2">
                <Button 
                  variant={!showArchived ? "outline" : "ghost"}
                  onClick={() => setShowArchived(false)}
                >
                  Active {activeMembers.length}
                </Button>
                <Button 
                  variant={showArchived ? "outline" : "ghost"}
                  onClick={() => setShowArchived(true)}
                >
                  Archived {archivedMembers.length}
                </Button>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={openInviteDialog}>
                <UserPlus className="w-4 h-4 mr-2" />
                Invite team
              </Button>
              <Button onClick={openBuySeatsDialog}>
                <Plus className="w-4 h-4 mr-2" />
                Buy Pro seats
              </Button>
            </div>
          </div>
          <TeamMembersTable />
        </div>
      </div>
    </div>
  );
}; 