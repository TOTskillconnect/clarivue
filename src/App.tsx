import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { router } from './routes';
import { Toaster } from 'sonner';
import { ErrorBoundary } from '@/components/error/ErrorBoundary';
import { SetupInterview } from '@/modules/interviews/pages/SetupInterview';
import { CreateScorecardFlow } from '@/modules/scorecards/pages/CreateScorecardFlow';
import { InterviewSetupFlow } from '@/modules/interviews/pages/InterviewSetupFlow';
import clarivueTheme from '@/theme';

export function App() {
  return (
    <ConfigProvider theme={clarivueTheme}>
      <ErrorBoundary>
        <RouterProvider router={router} />
        <Toaster richColors position="top-right" />
      </ErrorBoundary>
    </ConfigProvider>
  );
} 