export const config = {
  env: import.meta.env.MODE,
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  openaiApiKey: import.meta.env.VITE_OPENAI_API_KEY,
  baseUrl: import.meta.env.VITE_BASE_URL || window.location.origin,
}; 