export interface ProgressionRule {
  id: string;
  name: string;
  description: string;
  type: 'linear' | 'double_progression' | 'percentage' | 'rpe_based' | 'time_based';
  parameters: {
    increment?: number;
    incrementType?: 'weight' | 'reps' | 'time' | 'percentage';
    minReps?: number;
    maxReps?: number;
    targetRPE?: number;
    restPeriod?: number; // days between progressions
    failureThreshold?: number; // attempts before deload
  };
}

export interface WorkoutProgression {
  exerciseId: string;
  currentLevel: number;
  totalLevels: number;
  progressionRule: ProgressionRule;
  history: ProgressionHistory[];
  nextProgression?: {
    weight?: number;
    reps?: number;
    sets?: number;
    duration?: number;
  };
}

export interface ProgressionHistory {
  date: string;
  level: number;
  weight?: number;
  reps?: number;
  sets?: number;
  duration?: number;
  rpe?: number; // Rate of Perceived Exertion (1-10)
  success: boolean;
  notes?: string;
}

export interface DifficultyLevel {
  level: number;
  name: string;
  description: string;
  requirements?: {
    minWorkouts?: number;
    minStreak?: number;
    prerequisiteExercises?: string[];
  };
  modifiers: {
    weightMultiplier?: number;
    repMultiplier?: number;
    timeMultiplier?: number;
    restReduction?: number; // percentage reduction in rest time
    complexityIncrease?: boolean;
  };
}

export interface AdaptiveWorkout {
  id: string;
  baseWorkoutId: string;
  userId: string;
  currentDifficulty: number;
  adaptations: {
    exerciseId: string;
    originalSets: number;
    originalReps: number;
    originalWeight?: number;
    adaptedSets: number;
    adaptedReps: number;
    adaptedWeight?: number;
    adaptedRestTime?: number;
    substitution?: string; // alternative exercise if too difficult
  }[];
  performanceMetrics: {
    completionRate: number;
    averageRPE: number;
    consistencyScore: number;
    improvementRate: number;
  };
}