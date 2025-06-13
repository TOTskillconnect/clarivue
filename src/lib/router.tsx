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
import { DashboardLayout } from '@/modules/dashboard/layouts/DashboardLayout';
import { DashboardHome } from '@/modules/dashboard/pages/DashboardHome';
import { ErrorBoundary } from '@/components/error/ErrorBoundary';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Root redirects to dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Auth Routes */}
      <Route path="/signup/form" element={<SignupFormScreen />} />
      <Route path="/signup/verify" element={<EmailVerificationScreen />} />
      <Route path="/onboarding" element={<OnboardingScreen />} />

      {/* Dashboard Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="interviews/:id" element={<div>Interview Details (Coming Soon)</div>} />
        <Route path="scorecards" element={<div>Scorecards (Coming Soon)</div>} />
        <Route path="scorecards/:id" element={<div>Scorecard Details (Coming Soon)</div>} />
        <Route path="team" element={<div>Team (Coming Soon)</div>} />
        <Route path="messages" element={<div>Messages (Coming Soon)</div>} />
        <Route path="settings" element={<div>Settings (Coming Soon)</div>} />
      </Route>

      {/* Redirect /app to /dashboard */}
      <Route path="/app/*" element={<Navigate to="/dashboard" replace />} />

      {/* 404 Route */}
      <Route path="*" element={<div>Page not found</div>} />
    </>
  )
); 