export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'strength' | 'endurance' | 'consistency' | 'milestone' | 'exploration';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  condition: {
    type: 'workout_count' | 'exercise_count' | 'streak' | 'weight_lifted' | 'time_trained' | 'category_explored' | 'custom';
    target: number;
    metric?: string;
    timeframe?: 'daily' | 'weekly' | 'monthly' | 'all_time';
  };
  reward: {
    points: number;
    title?: string;
  };
}

export interface UserProgress {
  totalWorkouts: number;
  totalExercises: number;
  currentStreak: number;
  longestStreak: number;
  totalTimeMinutes: number;
  totalWeightLifted: number;
  categoriesExplored: string[];
  lastWorkoutDate?: string;
  achievements: string[];
  points: number;
}

export const achievements: Achievement[] = [
  // Consistency Achievements
  {
    id: 'first-workout',
    name: 'First Steps',
    description: 'Complete your first workout',
    icon: 'play',
    category: 'milestone',
    rarity: 'common',
    condition: {
      type: 'workout_count',
      target: 1
    },
    reward: {
      points: 10,
      title: 'Beginner'
    }
  },
  {
    id: 'streak-7',
    name: 'Week Warrior',
    description: 'Maintain a 7-day workout streak',
    icon: 'fire',
    category: 'consistency',
    rarity: 'common',
    condition: {
      type: 'streak',
      target: 7
    },
    reward: {
      points: 50,
      title: 'Consistent'
    }
  },
  {
    id: 'streak-30',
    name: 'Monthly Master',
    description: 'Maintain a 30-day workout streak',
    icon: 'fire',
    category: 'consistency',
    rarity: 'rare',
    condition: {
      type: 'streak',
      target: 30
    },
    reward: {
      points: 200,
      title: 'Dedicated'
    }
  },
  {
    id: 'streak-100',
    name: 'Century Club',
    description: 'Maintain a 100-day workout streak',
    icon: 'flame',
    category: 'consistency',
    rarity: 'epic',
    condition: {
      type: 'streak',
      target: 100
    },
    reward: {
      points: 500,
      title: 'Unstoppable'
    }
  },
  {
    id: 'streak-365',
    name: 'Year Round',
    description: 'Maintain a 365-day workout streak',
    icon: 'crown',
    category: 'consistency',
    rarity: 'legendary',
    condition: {
      type: 'streak',
      target: 365
    },
    reward: {
      points: 1000,
      title: 'Legend'
    }
  },

  // Milestone Achievements
  {
    id: 'workouts-10',
    name: 'Getting Started',
    description: 'Complete 10 workouts',
    icon: 'target',
    category: 'milestone',
    rarity: 'common',
    condition: {
      type: 'workout_count',
      target: 10
    },
    reward: {
      points: 25
    }
  },
  {
    id: 'workouts-50',
    name: 'Half Century',
    description: 'Complete 50 workouts',
    icon: 'award',
    category: 'milestone',
    rarity: 'rare',
    condition: {
      type: 'workout_count',
      target: 50
    },
    reward: {
      points: 100
    }
  },
  {
    id: 'workouts-100',
    name: 'Centurion',
    description: 'Complete 100 workouts',
    icon: 'trophy',
    category: 'milestone',
    rarity: 'epic',
    condition: {
      type: 'workout_count',
      target: 100
    },
    reward: {
      points: 250
    }
  },
  {
    id: 'exercises-100',
    name: 'Exercise Explorer',
    description: 'Log 100 exercises',
    icon: 'compass',
    category: 'exploration',
    rarity: 'common',
    condition: {
      type: 'exercise_count',
      target: 100
    },
    reward: {
      points: 30
    }
  },
  {
    id: 'exercises-500',
    name: 'Movement Master',
    description: 'Log 500 exercises',
    icon: 'star',
    category: 'exploration',
    rarity: 'rare',
    condition: {
      type: 'exercise_count',
      target: 500
    },
    reward: {
      points: 150
    }
  },

  // Strength Achievements
  {
    id: 'weight-1000',
    name: 'Thousand Pounds',
    description: 'Lift a total of 1,000kg across all exercises',
    icon: 'dumbbell',
    category: 'strength',
    rarity: 'rare',
    condition: {
      type: 'weight_lifted',
      target: 1000
    },
    reward: {
      points: 100,
      title: 'Strong'
    }
  },
  {
    id: 'weight-5000',
    name: 'Five Ton Club',
    description: 'Lift a total of 5,000kg across all exercises',
    icon: 'dumbbell',
    category: 'strength',
    rarity: 'epic',
    condition: {
      type: 'weight_lifted',
      target: 5000
    },
    reward: {
      points: 300,
      title: 'Powerlifter'
    }
  },

  // Endurance Achievements
  {
    id: 'time-10h',
    name: 'Ten Hour Hero',
    description: 'Train for a total of 10 hours',
    icon: 'clock',
    category: 'endurance',
    rarity: 'common',
    condition: {
      type: 'time_trained',
      target: 600 // 10 hours in minutes
    },
    reward: {
      points: 50
    }
  },
  {
    id: 'time-100h',
    name: 'Century Timer',
    description: 'Train for a total of 100 hours',
    icon: 'clock',
    category: 'endurance',
    rarity: 'rare',
    condition: {
      type: 'time_trained',
      target: 6000 // 100 hours in minutes
    },
    reward: {
      points: 200,
      title: 'Endurance Athlete'
    }
  },

  // Exploration Achievements
  {
    id: 'all-categories',
    name: 'Jack of All Trades',
    description: 'Try exercises from all categories',
    icon: 'grid',
    category: 'exploration',
    rarity: 'rare',
    condition: {
      type: 'category_explored',
      target: 8 // Number of exercise categories
    },
    reward: {
      points: 120,
      title: 'Well-Rounded'
    }
  },

  // Special Achievements
  {
    id: 'early-bird',
    name: 'Early Bird',
    description: 'Complete a workout before 6 AM',
    icon: 'sunrise',
    category: 'milestone',
    rarity: 'common',
    condition: {
      type: 'custom',
      target: 1
    },
    reward: {
      points: 25
    }
  },
  {
    id: 'night-owl',
    name: 'Night Owl',
    description: 'Complete a workout after 10 PM',
    icon: 'moon',
    category: 'milestone',
    rarity: 'common',
    condition: {
      type: 'custom',
      target: 1
    },
    reward: {
      points: 25
    }
  },
  {
    id: 'weekend-warrior',
    name: 'Weekend Warrior',
    description: 'Complete workouts on both Saturday and Sunday',
    icon: 'calendar',
    category: 'consistency',
    rarity: 'common',
    condition: {
      type: 'custom',
      target: 1
    },
    reward: {
      points: 30
    }
  }
];

export function getRarityColor(rarity: Achievement['rarity']): string {
  switch (rarity) {
    case 'common': return 'text-gray-600 dark:text-gray-400';
    case 'rare': return 'text-blue-600 dark:text-blue-400';
    case 'epic': return 'text-purple-600 dark:text-purple-400';
    case 'legendary': return 'text-yellow-600 dark:text-yellow-400';
    default: return 'text-gray-600 dark:text-gray-400';
  }
}

export function getRarityBgColor(rarity: Achievement['rarity']): string {
  switch (rarity) {
    case 'common': return 'bg-gray-100 dark:bg-gray-700';
    case 'rare': return 'bg-blue-100 dark:bg-blue-900/30';
    case 'epic': return 'bg-purple-100 dark:bg-purple-900/30';
    case 'legendary': return 'bg-yellow-100 dark:bg-yellow-900/30';
    default: return 'bg-gray-100 dark:bg-gray-700';
  }
}

export function getCategoryIcon(category: Achievement['category']): string {
  switch (category) {
    case 'strength': return 'dumbbell';
    case 'endurance': return 'activity';
    case 'consistency': return 'calendar';
    case 'milestone': return 'flag';
    case 'exploration': return 'compass';
    default: return 'award';
  }
}

export function checkAchievements(progress: UserProgress): string[] {
  const newAchievements: string[] = [];

  achievements.forEach(achievement => {
    // Skip if already earned
    if (progress.achievements.includes(achievement.id)) {
      return;
    }

    let conditionMet = false;

    switch (achievement.condition.type) {
      case 'workout_count':
        conditionMet = progress.totalWorkouts >= achievement.condition.target;
        break;
      case 'exercise_count':
        conditionMet = progress.totalExercises >= achievement.condition.target;
        break;
      case 'streak':
        conditionMet = progress.currentStreak >= achievement.condition.target;
        break;
      case 'weight_lifted':
        conditionMet = progress.totalWeightLifted >= achievement.condition.target;
        break;
      case 'time_trained':
        conditionMet = progress.totalTimeMinutes >= achievement.condition.target;
        break;
      case 'category_explored':
        conditionMet = progress.categoriesExplored.length >= achievement.condition.target;
        break;
      case 'custom':
        // Custom achievements need to be checked separately in the main app
        conditionMet = false;
        break;
    }

    if (conditionMet) {
      newAchievements.push(achievement.id);
    }
  });

  return newAchievements;
}