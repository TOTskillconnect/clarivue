import { useCallback } from 'react';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/api/config';
import { env } from '@/config/env';

export const useErrorHandler = () => {
  const handleError = useCallback((error: unknown) => {
    const message = getErrorMessage(error);
    
    // Show user-friendly error message
    toast.error(message);
    
    // Log error if enabled
    if (env.ENABLE_ERROR_REPORTING) {
      console.error('[Error]:', {
        message,
        timestamp: new Date().toISOString(),
        error,
      });
      
      // You can implement server-side error logging here
      fetch(env.ERROR_LOGGING_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          timestamp: new Date().toISOString(),
          error: JSON.stringify(error),
        }),
      }).catch(console.error); // Silently handle logging errors
    }
  }, []);

  return { handleError };
}; 