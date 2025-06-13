import { createBrowserRouter, Navigate } from 'react-router-dom';
import { DashboardHome } from '@/modules/dashboard/pages/DashboardHome';
import { DashboardLayout } from '@/modules/dashboard/layouts/DashboardLayout';
import { ReportsOverviewPage } from '@/modules/reports/pages/ReportsOverviewPage';
import { SummaryReportView } from '@/modules/report/pages/SummaryReportView';
import { ScorecardsList } from '@/modules/scorecards/pages/ScorecardsList';
import { NewScorecard } from '@/modules/scorecards/pages/NewScorecard';
import { ScorecardPage } from '@/modules/scorecards/pages/ScorecardPage';
import { SetupInterview } from '@/modules/interviews/pages/SetupInterview';
import { TeamMembersTable } from '@/modules/team/components/TeamMembersTable';
import { useTeamManagement } from '@/modules/team/hooks/useTeamManagement';

// Simple Team Overview Component
function TeamOverview() {
  const { activeMembers, updateMember, archiveMember } = useTeamManagement();
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Team Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage your team members and their access
          </p>
        </div>
      </div>
      <TeamMembersTable 
        members={activeMembers}
        onUpdateMember={updateMember}
        onRemoveMember={archiveMember}
      />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardHome />
      },
      {
        path: 'interviews/schedule',
        element: <SetupInterview />
      },
      {
        path: 'interviews/schedule/:scorecardId',
        element: <SetupInterview />
      },
      {
        path: 'interviews/:id',
        element: <div>Interview Details (Coming Soon)</div>
      },
      {
        path: 'scorecards',
        element: <ScorecardsList />
      },
      {
        path: 'scorecards/new',
        element: <NewScorecard />
      },
      {
        path: 'scorecards/:id',
        element: <ScorecardPage />
      },
      {
        path: 'reports',
        element: <ReportsOverviewPage />
      },
      {
        path: 'reports/:id',
        element: <SummaryReportView />
      },
      {
        path: 'team',
        element: <TeamOverview />
      },
      {
        path: 'messages',
        element: <div>Messages (Coming Soon)</div>
      },
      {
        path: 'settings',
        element: <div>Settings (Coming Soon)</div>
      }
    ]
  },
  {
    path: '/app/*',
    element: <Navigate to="/dashboard" replace />
  },
  {
    path: '*',
    element: <div>Page not found</div>
  }
]); 