import React from 'react';
import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { AlertCircle } from 'lucide-react';

export function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  // Handle 404 errors specifically
  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md">
          <div className="bg-red-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mx-auto">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">Page Not Found</h1>
          <p className="text-gray-600">
            Sorry, we couldn't find the page you're looking for. Please check the URL or return to the dashboard.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
            <Button
              onClick={() => navigate('/dashboard')}
            >
              Return to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Handle other errors
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-4 max-w-md">
        <div className="bg-red-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mx-auto">
          <AlertCircle className="h-6 w-6 text-red-600" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-900">Unexpected Error</h1>
        <p className="text-gray-600">
          An unexpected error occurred. Our team has been notified and we're working to fix it.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </Button>
          <Button
            onClick={() => navigate('/dashboard')}
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
} 