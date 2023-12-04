export type UserStats = {
    completedLevelsCount: number;
    allLevelsCount: number;
    currentLevel: {
        name: string;
        order: number;
        type: string;
    } | null;
    lastStoryTime:
        | {
              accuracy: number | null;
              wpm: number | null;
              order: number;
              completed: boolean;
          }
        | null
        | undefined;
} | null;
