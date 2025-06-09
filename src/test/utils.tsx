import { render as rtlRender } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ScorecardProvider } from '@/contexts/ScorecardContext';
import { vi } from 'vitest';

// Mock Toaster component
vi.mock('@/components/ui/toaster', () => ({
  Toaster: () => null,
}));

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      <ScorecardProvider>
        {children}
      </ScorecardProvider>
    </BrowserRouter>
  );
}

function render(ui: React.ReactElement, options = {}) {
  return rtlRender(ui, { wrapper: Providers, ...options });
}

// re-export everything
export * from '@testing-library/react';
export { render }; 