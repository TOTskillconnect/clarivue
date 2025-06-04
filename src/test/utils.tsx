import { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      {children}
      <Toaster />
    </BrowserRouter>
  );
}

function renderWithProviders(ui: ReactElement) {
  return render(ui, {
    wrapper: Providers,
  });
}

// Re-export everything
export * from '@testing-library/react';
export { renderWithProviders as render }; 