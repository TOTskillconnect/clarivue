import { config } from './config';

interface ErrorMetadata {
  componentStack?: string;
  userId?: string;
  url?: string;
  timestamp: string;
  additionalContext?: string;
}

interface ErrorLog {
  message: string;
  stack?: string;
  metadata: ErrorMetadata;
}

class ErrorLoggingService {
  private static instance: ErrorLoggingService;
  private readonly endpoint: string;

  private constructor() {
    this.endpoint = '/api/logs/error';
  }

  public static getInstance(): ErrorLoggingService {
    if (!ErrorLoggingService.instance) {
      ErrorLoggingService.instance = new ErrorLoggingService();
    }
    return ErrorLoggingService.instance;
  }

  public async logError(error: Error, metadata: Partial<ErrorMetadata> = {}): Promise<void> {
    const errorLog: ErrorLog = {
      message: error.message,
      stack: error.stack,
      metadata: {
        timestamp: new Date().toISOString(),
        url: window.location.href,
        ...metadata,
      },
    };

    try {
      // In development, log to console
      if (config.isDevelopment) {
        console.error('Error logged:', errorLog);
        return;
      }

      // In production, send to logging service
      const response = await fetch(`${config.apiUrl}${this.endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorLog),
      });

      if (!response.ok) {
        console.error('Failed to log error:', await response.text());
      }
    } catch (loggingError) {
      // Fallback to console if logging fails
      console.error('Error logging failed:', loggingError);
      console.error('Original error:', errorLog);
    }
  }

  public async logErrorWithContext(
    error: Error,
    context: { [key: string]: any } = {}
  ): Promise<void> {
    await this.logError(error, {
      ...context,
      additionalContext: JSON.stringify(context),
    });
  }
}

export const errorLogger = ErrorLoggingService.getInstance(); 