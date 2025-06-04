import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { Toaster } from 'sonner';
import { ErrorBoundary } from '@/components/error/ErrorBoundary';

export function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
    </ErrorBoundary>
  );
} 