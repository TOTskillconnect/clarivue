import { createBrowserRouter, Navigate } from 'react-router-dom';
import { DashboardHome } from '@/modules/dashboard/pages/DashboardHome';
import { DashboardLayout } from '@/modules/dashboard/layouts/DashboardLayout';
import { TeamDashboard } from '@/modules/team/pages/TeamDashboard';
import { ReportsOverview } from '@/modules/report/pages/ReportsOverview';
import { JDImportPage } from '@/modules/hiring/pages/JDImportPage';
import { NewInterviewFlow } from '@/modules/interview/pages/NewInterviewFlow';
import { InterviewsOverview } from '@/modules/interview/pages/InterviewsOverview';
import { InterviewDetails } from '@/modules/interview/pages/InterviewDetails';
import { HiringCriteriaFlow } from '@/modules/hiring/pages/HiringCriteriaFlow';

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
        path: 'interviews',
        children: [
          {
            index: true,
            element: <InterviewsOverview />
          },
          {
            path: 'new',
            element: <HiringCriteriaFlow />
          },
          {
            path: 'schedule/:criteriaId',
            element: <NewInterviewFlow />
          },
          {
            path: ':interviewId',
            element: <InterviewDetails />
          }
        ]
      },
      {
        path: 'reports',
        element: <ReportsOverview />
      },
      {
        path: 'team',
        element: <TeamDashboard />
      },
      {
        path: 'hiring/criteria',
        element: <JDImportPage />
      },
      {
        path: 'hiring/roles/:roleId',
        element: <div>Role Details</div>
      }
    ]
  },
  {
    path: '/hiring/jd-import',
    element: <JDImportPage />,
  },
]); 