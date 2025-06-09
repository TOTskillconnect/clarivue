import { createBrowserRouter, Navigate } from 'react-router-dom';
import { DashboardHome } from '@/modules/dashboard/pages/DashboardHome';
import { DashboardLayout } from '@/modules/dashboard/layouts/DashboardLayout';
import { TeamDashboard } from '@/modules/team/pages/TeamDashboard';
import { ReportsOverview } from '@/modules/report/pages/ReportsOverview';
import { JDImportPage } from '@/modules/hiring/pages/JDImportPage';
import { ScorecardOverview } from '@/modules/scorecard/pages/ScorecardOverview';
import { ScorecardDetails } from '@/modules/scorecard/pages/ScorecardDetails';
import { ScorecardFlow } from '@/modules/scorecards/pages/ScorecardFlow';
import { SetupScorecard } from '@/modules/scorecard/pages/SetupScorecard';
import { ScorecardPage } from '@/modules/hiring/pages/ScorecardPage';
import { HiringLayout } from '@/modules/hiring/layouts/HiringLayout';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { InterviewReportPage } from '@/modules/report/pages/InterviewReportPage';
import { InterviewSetupFlow } from '@/modules/interviews/pages/InterviewSetupFlow';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <DashboardHome />
      },
      {
        path: 'scorecards',
        children: [
          {
            index: true,
            element: <ScorecardOverview />
          },
          {
            path: 'new',
            element: <ScorecardFlow />
          },
          {
            path: 'setup/:criteriaId?',
            element: <SetupScorecard />
          },
          {
            path: ':scorecardId',
            element: <ScorecardDetails />
          }
        ]
      },
      {
        path: 'interviews',
        children: [
          {
            path: 'new',
            element: <InterviewSetupFlow />
          }
        ]
      },
      {
        path: 'reports',
        children: [
          {
            index: true,
            element: <ReportsOverview />
          },
          {
            path: ':reportId',
            element: <InterviewReportPage />
          }
        ]
      },
      {
        path: 'team',
        element: <TeamDashboard />
      },
      {
        path: 'hiring',
        element: <HiringLayout />,
        errorElement: <ErrorBoundary />,
        children: [
          {
            path: 'criteria',
            element: <JDImportPage />
          },
          {
            path: 'scorecard/new',
            element: <ScorecardPage />
          },
          {
            path: 'scorecard/:scorecardId',
            element: <ScorecardPage />
          },
          {
            path: 'roles/:roleId',
            element: <div>Role Details</div>
          }
        ]
      }
    ]
  },
  {
    path: '/hiring/jd-import',
    element: <JDImportPage />,
    errorElement: <ErrorBoundary />,
  },
]); 