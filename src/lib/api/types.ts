export interface APIErrorResponse {
  error: {
    message: string;
    code?: string;
    details?: unknown;
  };
}

export class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'APIError';
  }

  static fromResponse(response: Response, data?: APIErrorResponse): APIError {
    const message = data?.error?.message || 'An unexpected error occurred';
    const code = data?.error?.code;
    const details = data?.error?.details;
    return new APIError(message, response.status, code, details);
  }
}

export interface RequestConfig extends RequestInit {
  params?: Record<string, string>;
  timeout?: number;
}

export interface APIResponse<T> {
  data: T;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
} 