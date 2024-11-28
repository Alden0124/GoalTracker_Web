export const queryKeys = {
  goals: {
    getUserGoals: (userId?: string) => 
      userId ? ['goals', 'list', userId] : ['goals', 'list'],
  },
} as const;
