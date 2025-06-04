import { useToast } from '@/hooks/use-toast';
import { errorLogger } from '@/lib/error-logging';

interface APIError extends Error {
  status?: number;
  code?: string;
}

export function useErrorHandler() {
  const { toast } = useToast();

  const handleError = async (error: unknown, context?: string) => {
    const errorMessage = getErrorMessage(error);
    
    // Log the error
    if (error instanceof Error) {
      await errorLogger.logErrorWithContext(error, { context });
    }

    // Show user-friendly toast
    toast({
      title: 'An error occurred',
      description: errorMessage,
      variant: 'destructive',
    });
  };

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      const apiError = error as APIError;
      
      // Handle specific API error codes
      if (apiError.code === 'UNAUTHORIZED') {
        return 'Please sign in to continue';
      }
      if (apiError.code === 'FORBIDDEN') {
        return 'You do not have permission to perform this action';
      }

      // Handle HTTP status codes
      const status = apiError.status;
      if (status) {
        if (status === 404) {
          return 'The requested resource was not found';
        }
        if (status === 429) {
          return 'Too many requests. Please try again later';
        }
        if (status >= 500) {
          return 'A server error occurred. Please try again later';
        }
      }

      // Return the error message if it's user-friendly
      if (apiError.message && !apiError.message.includes('Error:')) {
        return apiError.message;
      }
    }

    // Default error message
    return 'Something went wrong. Please try again';
  };

  return {
    handleError,
    getErrorMessage,
  };
} 