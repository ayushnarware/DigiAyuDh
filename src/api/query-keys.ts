export const queryKeys = {
  auth: {
    all: ['auth'] as const,
    user: () => [...queryKeys.auth.all, 'user'] as const,
  },
  clients: {
    all: ['clients'] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.clients.all, 'list', filters] as const,
    detail: (id: string) => [...queryKeys.clients.all, 'detail', id] as const,
  },
  projects: {
    all: ['projects'] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.projects.all, 'list', filters] as const,
    detail: (id: string) => [...queryKeys.projects.all, 'detail', id] as const,
  },
  employees: {
    all: ['employees'] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.employees.all, 'list', filters] as const,
  },
  notifications: {
    all: ['notifications'] as const,
    unread: () => [...queryKeys.notifications.all, 'unread'] as const,
  },
} as const;
