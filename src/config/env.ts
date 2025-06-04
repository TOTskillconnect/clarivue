const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key];
  if (value === undefined && defaultValue === undefined) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value ?? defaultValue ?? '';
};

const getBooleanEnvVar = (key: string, defaultValue: boolean): boolean => {
  const value = import.meta.env[key];
  if (value === undefined) return defaultValue;
  return value.toLowerCase() === 'true';
};

export const env = {
  // Node environment
  MODE: import.meta.env.MODE,
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,
  
  // API Configuration
  API_URL: getEnvVar('VITE_API_URL', 'http://localhost:3001'),
  
  // OpenAI Configuration
  OPENAI_API_KEY: getEnvVar('VITE_OPENAI_API_KEY'),
  
  // Error Logging
  ERROR_LOGGING_ENDPOINT: getEnvVar(
    'VITE_ERROR_LOGGING_ENDPOINT',
    '/api/logs/error'
  ),
  
  // Feature Flags
  ENABLE_ANALYTICS: getBooleanEnvVar('VITE_ENABLE_ANALYTICS', false),
  ENABLE_ERROR_REPORTING: getBooleanEnvVar('VITE_ENABLE_ERROR_REPORTING', true),
} as const;

// Type for environment variables
export type Env = typeof env;

// Validate required environment variables
const validateEnv = () => {
  const requiredVars = ['VITE_OPENAI_API_KEY'] as const;
  const missing = requiredVars.filter(
    (key) => !import.meta.env[key]
  );

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please check your .env file and make sure all required variables are set.'
    );
  }
};

// Run validation in development
if (env.DEV) {
  validateEnv();
} 