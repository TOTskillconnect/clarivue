import { createBrowserRouter } from 'react-router-dom';
import { SignupScreen } from '../modules/auth/pages/SignupScreen';
import { DashboardHome } from '../modules/dashboard/pages/DashboardHome';
import { ScheduleInterview } from '../modules/scheduling/pages/ScheduleInterview';
import { InterviewLiveView } from '../modules/interview/pages/InterviewLiveView';
import { SummaryReportView } from '../modules/report/pages/SummaryReportView';
import { UserSettings } from '../modules/settings/pages/UserSettings';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SignupScreen />,
  },
  {
    path: '/signup',
    element: <SignupScreen />,
  },
  {
    path: '/dashboard',
    element: <DashboardHome />,
  },
  {
    path: '/schedule',
    element: <ScheduleInterview />,
  },
  {
    path: '/interview/:id',
    element: <InterviewLiveView />,
  },
  {
    path: '/report/:id',
    element: <SummaryReportView />,
  },
  {
    path: '/settings',
    element: <UserSettings />,
  },
]); 