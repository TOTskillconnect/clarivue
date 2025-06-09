import { createBrowserRouter } from 'react-router-dom';
import { SignupScreen } from '@/modules/auth/pages/SignupScreen';
import { DashboardHome } from '@/modules/dashboard/pages/DashboardHome';
import { SetupInterview } from '@/modules/interviews/pages/SetupInterview';
import { InterviewLiveView } from '@/modules/interview/pages/InterviewLiveView';
import { SummaryReportView } from '@/modules/report/pages/SummaryReportView';
import { UserSettings } from '@/modules/settings/pages/UserSettings';
import { ReportsOverviewPage } from '@/modules/reports/pages/ReportsOverviewPage';
import { InterviewsOverview } from '@/modules/interview/pages/InterviewsOverview';
import { InterviewDetails } from '@/modules/interview/pages/InterviewDetails';
import { Navigate } from 'react-router-dom';
import { ScorecardsList } from '@/modules/scorecards/pages/ScorecardsList';
import { NewScorecard } from '@/modules/scorecards/pages/NewScorecard';
import { DashboardLayout } from '@/modules/dashboard/layouts/DashboardLayout';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SignupScreen />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/signup',
    element: <SignupScreen />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '',
        element: <DashboardHome />,
      },
      {
        path: 'interviews',
        element: <InterviewsOverview />,
      },
      {
        path: 'interviews/schedule',
        element: <SetupInterview />,
      },
      {
        path: 'interviews/schedule/:scorecardId',
        element: <SetupInterview />,
      },
      {
        path: 'interviews/:interviewId',
        element: <InterviewDetails />,
      },
      {
        path: 'interview/:id',
        element: <InterviewLiveView />,
      },
      {
        path: 'scorecards',
        element: <ScorecardsList />,
      },
      {
        path: 'scorecards/new',
        element: <NewScorecard />,
      },
      {
        path: 'reports',
        element: <ReportsOverviewPage />,
      },
      {
        path: 'reports/:id',
        element: <SummaryReportView />,
      },
      {
        path: 'settings',
        element: <UserSettings />,
      },
    ],
  },
  // Catch-all route should be last
  {
    path: '*',
    element: <ErrorBoundary />,
  },
]); 