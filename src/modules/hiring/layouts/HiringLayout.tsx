import { Outlet } from 'react-router-dom';
import { ScorecardProvider } from '@/contexts/ScorecardContext';

export function HiringLayout() {
  return (
    <ScorecardProvider>
      <Outlet />
    </ScorecardProvider>
  );
} 