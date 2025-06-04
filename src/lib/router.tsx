import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate
} from 'react-router-dom';

import { SignupScreen } from '@/modules/auth/pages/SignupScreen';
import { SignupFormScreen } from '@/modules/auth/pages/SignupFormScreen';
import { EmailVerificationScreen } from '@/modules/auth/pages/EmailVerificationScreen';
import { OnboardingScreen } from '@/modules/onboarding/pages/OnboardingScreen';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { ReportsOverview } from '@/modules/report/pages/ReportsOverview';
import { ErrorBoundary } from '@/components/error/ErrorBoundary';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public Routes */}
      <Route path="/" element={<SignupScreen />} />
      <Route path="/signup/form" element={<SignupFormScreen />} />
      <Route path="/signup/verify" element={<EmailVerificationScreen />} />
      <Route path="/onboarding" element={<OnboardingScreen />} />

      {/* Dashboard Routes */}
      <Route path="/app" element={<DashboardLayout />}>
        <Route index element={<Navigate to="reports" replace />} />
        <Route path="dashboard" element={<Navigate to="reports" replace />} />
        <Route path="reports" element={<ReportsOverview />} />
        <Route path="conversations" element={<div>Conversations (Coming Soon)</div>} />
        <Route path="team" element={<div>Team (Coming Soon)</div>} />
        <Route path="settings" element={<div>Settings (Coming Soon)</div>} />
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<ErrorBoundary />} />
    </>
  )
); 