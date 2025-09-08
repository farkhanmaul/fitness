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
    name: 'Langkah Pertama',
    description: 'Selesaikan workout pertama Anda',
    icon: 'play',
    category: 'milestone',
    rarity: 'common',
    condition: {
      type: 'workout_count',
      target: 1
    },
    reward: {
      points: 10,
      title: 'Pemula'
    }
  },
  {
    id: 'streak-7',
    name: 'Pejuang Minggu',
    description: 'Pertahankan streak workout 7 hari',
    icon: 'fire',
    category: 'consistency',
    rarity: 'common',
    condition: {
      type: 'streak',
      target: 7
    },
    reward: {
      points: 50,
      title: 'Konsisten'
    }
  },
  {
    id: 'streak-30',
    name: 'Master Bulanan',
    description: 'Pertahankan streak workout 30 hari',
    icon: 'fire',
    category: 'consistency',
    rarity: 'rare',
    condition: {
      type: 'streak',
      target: 30
    },
    reward: {
      points: 200,
      title: 'Berdedikasi'
    }
  },
  {
    id: 'streak-100',
    name: 'Klub Seratus',
    description: 'Pertahankan streak workout 100 hari',
    icon: 'flame',
    category: 'consistency',
    rarity: 'epic',
    condition: {
      type: 'streak',
      target: 100
    },
    reward: {
      points: 500,
      title: 'Tak Terhentikan'
    }
  },
  {
    id: 'streak-365',
    name: 'Sepanjang Tahun',
    description: 'Pertahankan streak workout 365 hari',
    icon: 'crown',
    category: 'consistency',
    rarity: 'legendary',
    condition: {
      type: 'streak',
      target: 365
    },
    reward: {
      points: 1000,
      title: 'Legenda'
    }
  },

  // Milestone Achievements
  {
    id: 'workouts-10',
    name: 'Memulai Perjalanan',
    description: 'Selesaikan 10 workout',
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
    name: 'Setengah Abad',
    description: 'Selesaikan 50 workout',
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
    description: 'Selesaikan 100 workout',
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
    name: 'Penjelajah Latihan',
    description: 'Catat 100 latihan',
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
    name: 'Master Gerakan',
    description: 'Catat 500 latihan',
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
    name: 'Seribu Kilogram',
    description: 'Angkat total 1,000kg di semua latihan',
    icon: 'dumbbell',
    category: 'strength',
    rarity: 'rare',
    condition: {
      type: 'weight_lifted',
      target: 1000
    },
    reward: {
      points: 100,
      title: 'Kuat'
    }
  },
  {
    id: 'weight-5000',
    name: 'Klub Lima Ton',
    description: 'Angkat total 5,000kg di semua latihan',
    icon: 'dumbbell',
    category: 'strength',
    rarity: 'epic',
    condition: {
      type: 'weight_lifted',
      target: 5000
    },
    reward: {
      points: 300,
      title: 'Atlet Angkat Beban'
    }
  },

  // Endurance Achievements
  {
    id: 'time-10h',
    name: 'Pahlawan Sepuluh Jam',
    description: 'Berlatih total 10 jam',
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
    name: 'Penghitung Abad',
    description: 'Berlatih total 100 jam',
    icon: 'clock',
    category: 'endurance',
    rarity: 'rare',
    condition: {
      type: 'time_trained',
      target: 6000 // 100 hours in minutes
    },
    reward: {
      points: 200,
      title: 'Atlet Daya Tahan'
    }
  },

  // Exploration Achievements
  {
    id: 'all-categories',
    name: 'Ahli Segalanya',
    description: 'Coba latihan dari semua kategori',
    icon: 'grid',
    category: 'exploration',
    rarity: 'rare',
    condition: {
      type: 'category_explored',
      target: 8 // Number of exercise categories
    },
    reward: {
      points: 120,
      title: 'Serba Bisa'
    }
  },

  // Special Achievements
  {
    id: 'early-bird',
    name: 'Si Pagi',
    description: 'Selesaikan workout sebelum jam 6 pagi',
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
    name: 'Si Malam',
    description: 'Selesaikan workout setelah jam 10 malam',
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
    name: 'Pejuang Akhir Pekan',
    description: 'Selesaikan workout di Sabtu dan Minggu',
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