export const queryKeys = {
  goals: {
    all: ["goals"] as const,
    createGoal: () => [...queryKeys.goals.all, "createGoal"] as const,
  },
};
