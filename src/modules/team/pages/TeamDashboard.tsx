import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, UserPlus } from 'lucide-react';
import { TeamUsageCard } from '../components/TeamUsageCard';
import { ProUsageCard } from '../components/ProUsageCard';
import { TeamMembersTable } from '../components/TeamMembersTable';
import { useTeamManagement } from '../hooks/useTeamManagement';

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
    <div className="space-y-8">
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