import { ProgressionRule, DifficultyLevel } from '@/types/progression';

export const progressionRules: ProgressionRule[] = [
  {
    id: 'linear-weight',
    name: 'Linear Weight Progression',
    description: 'Increase weight by a fixed amount each successful session',
    type: 'linear',
    parameters: {
      increment: 2.5,
      incrementType: 'weight',
      failureThreshold: 3
    }
  },
  {
    id: 'linear-reps',
    name: 'Linear Rep Progression',
    description: 'Increase reps by 1-2 each session until max, then increase weight',
    type: 'linear',
    parameters: {
      increment: 1,
      incrementType: 'reps',
      failureThreshold: 2
    }
  },
  {
    id: 'double-progression',
    name: 'Double Progression',
    description: 'Increase reps first, then weight when rep range is maxed',
    type: 'double_progression',
    parameters: {
      minReps: 8,
      maxReps: 12,
      increment: 5,
      incrementType: 'weight',
      failureThreshold: 3
    }
  },
  {
    id: 'percentage-based',
    name: 'Percentage-Based Progression',
    description: 'Increase weight based on percentage of current max',
    type: 'percentage',
    parameters: {
      increment: 2.5,
      incrementType: 'percentage',
      failureThreshold: 2
    }
  },
  {
    id: 'rpe-based',
    name: 'RPE-Based Progression',
    description: 'Progress based on Rate of Perceived Exertion feedback',
    type: 'rpe_based',
    parameters: {
      targetRPE: 8,
      increment: 2.5,
      incrementType: 'weight',
      failureThreshold: 2
    }
  },
  {
    id: 'time-progression',
    name: 'Time-Based Progression',
    description: 'Increase duration or reduce rest time progressively',
    type: 'time_based',
    parameters: {
      increment: 15,
      incrementType: 'time',
      failureThreshold: 3
    }
  }
];

export const difficultyLevels: DifficultyLevel[] = [
  {
    level: 1,
    name: 'Beginner',
    description: 'New to fitness, focus on form and consistency',
    requirements: {
      minWorkouts: 0,
      minStreak: 0
    },
    modifiers: {
      weightMultiplier: 0.6,
      repMultiplier: 0.8,
      timeMultiplier: 0.7,
      restReduction: 0,
      complexityIncrease: false
    }
  },
  {
    level: 2,
    name: 'Novice',
    description: 'Building foundation, comfortable with basic movements',
    requirements: {
      minWorkouts: 10,
      minStreak: 7
    },
    modifiers: {
      weightMultiplier: 0.75,
      repMultiplier: 0.9,
      timeMultiplier: 0.8,
      restReduction: 5,
      complexityIncrease: false
    }
  },
  {
    level: 3,
    name: 'Intermediate',
    description: 'Good form, ready for moderate challenges',
    requirements: {
      minWorkouts: 25,
      minStreak: 14
    },
    modifiers: {
      weightMultiplier: 0.85,
      repMultiplier: 1.0,
      timeMultiplier: 0.9,
      restReduction: 10,
      complexityIncrease: true
    }
  },
  {
    level: 4,
    name: 'Advanced Beginner',
    description: 'Consistent training, ready for progression challenges',
    requirements: {
      minWorkouts: 50,
      minStreak: 21
    },
    modifiers: {
      weightMultiplier: 0.95,
      repMultiplier: 1.1,
      timeMultiplier: 1.0,
      restReduction: 15,
      complexityIncrease: true
    }
  },
  {
    level: 5,
    name: 'Intermediate',
    description: 'Strong foundation, ready for complex movements',
    requirements: {
      minWorkouts: 100,
      minStreak: 30
    },
    modifiers: {
      weightMultiplier: 1.0,
      repMultiplier: 1.2,
      timeMultiplier: 1.1,
      restReduction: 20,
      complexityIncrease: true
    }
  },
  {
    level: 6,
    name: 'Advanced Intermediate',
    description: 'Experienced trainee, handles high volume well',
    requirements: {
      minWorkouts: 200,
      minStreak: 45
    },
    modifiers: {
      weightMultiplier: 1.1,
      repMultiplier: 1.3,
      timeMultiplier: 1.2,
      restReduction: 25,
      complexityIncrease: true
    }
  },
  {
    level: 7,
    name: 'Advanced',
    description: 'High-level training, maximum intensity and complexity',
    requirements: {
      minWorkouts: 365,
      minStreak: 60
    },
    modifiers: {
      weightMultiplier: 1.2,
      repMultiplier: 1.4,
      timeMultiplier: 1.3,
      restReduction: 30,
      complexityIncrease: true
    }
  }
];

export const exerciseProgressionMaps: { [exerciseId: string]: string } = {
  'push-ups': 'linear-reps',
  'squats': 'double-progression',
  'deadlifts': 'percentage-based',
  'pull-ups': 'linear-reps',
  'bench-press': 'double-progression',
  'overhead-press': 'percentage-based',
  'rows': 'double-progression',
  'lunges': 'linear-reps',
  'planks': 'time-progression',
  'burpees': 'linear-reps'
};

export function getProgressionRule(exerciseId: string): ProgressionRule {
  const ruleId = exerciseProgressionMaps[exerciseId] || 'linear-reps';
  return progressionRules.find(rule => rule.id === ruleId) || progressionRules[0];
}

export function getUserDifficultyLevel(userStats: {
  totalWorkouts: number;
  currentStreak: number;
  longestStreak: number;
}): DifficultyLevel {
  // Find the highest level the user qualifies for
  for (let i = difficultyLevels.length - 1; i >= 0; i--) {
    const level = difficultyLevels[i];
    const meetsWorkoutRequirement = userStats.totalWorkouts >= (level.requirements?.minWorkouts || 0);
    const meetsStreakRequirement = userStats.longestStreak >= (level.requirements?.minStreak || 0);
    
    if (meetsWorkoutRequirement && meetsStreakRequirement) {
      return level;
    }
  }
  
  return difficultyLevels[0]; // Default to beginner
}

export function calculateNextProgression(
  currentStats: {
    weight?: number;
    reps: number;
    sets: number;
    rpe?: number;
  },
  rule: ProgressionRule,
  isSuccess: boolean
): {
  weight?: number;
  reps?: number;
  sets?: number;
  shouldProgress: boolean;
  deload?: boolean;
} {
  if (!isSuccess) {
    // Handle failure - could implement deload logic here
    return {
      weight: currentStats.weight,
      reps: currentStats.reps,
      sets: currentStats.sets,
      shouldProgress: false,
      deload: false
    };
  }

  switch (rule.type) {
    case 'linear':
      if (rule.parameters.incrementType === 'weight') {
        return {
          weight: (currentStats.weight || 0) + (rule.parameters.increment || 0),
          reps: currentStats.reps,
          sets: currentStats.sets,
          shouldProgress: true
        };
      } else if (rule.parameters.incrementType === 'reps') {
        return {
          weight: currentStats.weight,
          reps: currentStats.reps + (rule.parameters.increment || 1),
          sets: currentStats.sets,
          shouldProgress: true
        };
      }
      break;

    case 'double_progression':
      const minReps = rule.parameters.minReps || 8;
      const maxReps = rule.parameters.maxReps || 12;
      
      if (currentStats.reps < maxReps) {
        // Increase reps first
        return {
          weight: currentStats.weight,
          reps: Math.min(currentStats.reps + 1, maxReps),
          sets: currentStats.sets,
          shouldProgress: true
        };
      } else {
        // Max reps reached, increase weight and reset to min reps
        return {
          weight: (currentStats.weight || 0) + (rule.parameters.increment || 5),
          reps: minReps,
          sets: currentStats.sets,
          shouldProgress: true
        };
      }

    case 'percentage':
      const currentWeight = currentStats.weight || 0;
      const percentageIncrease = (rule.parameters.increment || 2.5) / 100;
      return {
        weight: currentWeight * (1 + percentageIncrease),
        reps: currentStats.reps,
        sets: currentStats.sets,
        shouldProgress: true
      };

    case 'rpe_based':
      const currentRPE = currentStats.rpe || 7;
      const targetRPE = rule.parameters.targetRPE || 8;
      
      if (currentRPE < targetRPE - 1) {
        // RPE too low, increase intensity
        return {
          weight: (currentStats.weight || 0) + (rule.parameters.increment || 2.5),
          reps: currentStats.reps,
          sets: currentStats.sets,
          shouldProgress: true
        };
      } else if (currentRPE > targetRPE + 1) {
        // RPE too high, maintain or slightly reduce
        return {
          weight: currentStats.weight,
          reps: currentStats.reps,
          sets: currentStats.sets,
          shouldProgress: false
        };
      } else {
        // RPE in target range, small progression
        return {
          weight: (currentStats.weight || 0) + ((rule.parameters.increment || 2.5) * 0.5),
          reps: currentStats.reps,
          sets: currentStats.sets,
          shouldProgress: true
        };
      }

    default:
      return {
        weight: currentStats.weight,
        reps: currentStats.reps,
        sets: currentStats.sets,
        shouldProgress: false
      };
  }

  return {
    weight: currentStats.weight,
    reps: currentStats.reps,
    sets: currentStats.sets,
    shouldProgress: false
  };
}