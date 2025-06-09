export const endpoints = {
  auth: {
    login: '/api/auth/login',
    signup: '/api/auth/signup',
    logout: '/api/auth/logout',
  },
  scorecards: {
    list: '/scorecards',
    get: (id: string) => `/scorecards/${id}`,
    create: '/scorecards',
    update: (id: string) => `/scorecards/${id}`,
    delete: (id: string) => `/scorecards/${id}`,
    analyze: '/scorecards/analyze',
  },
  interviews: {
    list: '/api/interviews',
    create: '/api/interviews',
    get: (id: string) => `/api/interviews/${id}`,
    update: (id: string) => `/api/interviews/${id}`,
    delete: (id: string) => `/api/interviews/${id}`,
  },
  team: {
    list: '/api/team',
    create: '/api/team',
    get: (id: string) => `/api/team/${id}`,
    update: (id: string) => `/api/team/${id}`,
    delete: (id: string) => `/api/team/${id}`,
  },
  reports: {
    list: '/api/reports',
    create: '/api/reports',
    get: (id: string) => `/api/reports/${id}`,
    generate: '/api/reports/generate',
  },
} as const; 