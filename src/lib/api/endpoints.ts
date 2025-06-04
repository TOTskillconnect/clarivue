export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
  },
  criteria: {
    analyze: '/criteria/analyze',
    list: '/criteria',
    create: '/criteria',
    get: (id: string) => `/criteria/${id}`,
    update: (id: string) => `/criteria/${id}`,
    delete: (id: string) => `/criteria/${id}`,
  },
  interviews: {
    list: '/interviews',
    create: '/interviews',
    get: (id: string) => `/interviews/${id}`,
    update: (id: string) => `/interviews/${id}`,
    delete: (id: string) => `/interviews/${id}`,
  },
  team: {
    list: '/team',
    create: '/team',
    get: (id: string) => `/team/${id}`,
    update: (id: string) => `/team/${id}`,
    delete: (id: string) => `/team/${id}`,
  },
  reports: {
    list: '/reports',
    create: '/reports',
    get: (id: string) => `/reports/${id}`,
    generate: '/reports/generate',
  },
} as const; 