export type UserStats = {
    completedLevelsCount: number;
    allLevelsCount: number;
    currentLevel: {
        level: {
            name: string;
            order: number;
            type: string;
        };
    } | null;
    lastStoryTime:
        | {
              accuracy: number | null;
              wpm: number | null;
          }
        | null
        | undefined;
} | null;
