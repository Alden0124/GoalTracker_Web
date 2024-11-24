export const queryKeys = {
  users: {
    all: ["users"] as const,
    profile: () => [...queryKeys.users.all, "profile"] as const,
    publicProfile: (userId: string) => [...queryKeys.users.all, "publicProfile", userId] as const,
  },
};
