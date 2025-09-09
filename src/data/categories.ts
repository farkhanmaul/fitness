export interface ExerciseCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  subcategories: string[];
}

export const exerciseCategories: ExerciseCategory[] = [
  {
    id: 'hybrid',
    name: 'Hybrid Training',
    description: 'Latihan kombinasi yang menggabungkan berbagai elemen fitness',
    color: 'bg-purple-500',
    icon: '⚡',
    subcategories: [
      'Functional Movement',
      'CrossTraining', 
      'Circuit Training',
      'HIIT Kombinasi'
    ]
  },
  {
    id: 'navy',
    name: 'Naval Training',
    description: 'Program latihan militer dan angkatan laut untuk ketahanan dan kekuatan',
    color: 'bg-blue-600',
    icon: '⚓',
    subcategories: [
      'Navy SEAL Workout',
      'Boot Camp',
      'Military PT',
      'Tactical Fitness'
    ]
  },
  {
    id: 'martial-arts',
    name: 'Martial Arts',
    description: 'Latihan seni bela diri untuk kekuatan, kelincahan, dan teknik',
    color: 'bg-red-600',
    icon: '🥋',
    subcategories: [
      'Boxing Training',
      'Muay Thai',
      'Karate Conditioning',
      'MMA Training'
    ]
  },
  {
    id: 'strength',
    name: 'Strength Training',
    description: 'Program latihan fokus pada peningkatan kekuatan otot',
    color: 'bg-orange-600',
    icon: '💪',
    subcategories: [
      'Powerlifting',
      'Olympic Lifting',
      'Bodybuilding',
      'Functional Strength'
    ]
  },
  {
    id: 'endurance',
    name: 'Endurance Training', 
    description: 'Latihan untuk meningkatkan daya tahan kardiovaskular dan otot',
    color: 'bg-green-600',
    icon: '🏃',
    subcategories: [
      'Running Programs',
      'Cycling Training',
      'Swimming Workouts',
      'Cardio Conditioning'
    ]
  },
  {
    id: 'flexibility',
    name: 'Flexibility & Mobility',
    description: 'Program untuk meningkatkan fleksibilitas dan mobilitas tubuh',
    color: 'bg-pink-500',
    icon: '🧘',
    subcategories: [
      'Yoga Flows',
      'Stretching Routines',
      'Mobility Work',
      'Recovery Sessions'
    ]
  },
  {
    id: 'sports-specific',
    name: 'Sport Specific',
    description: 'Latihan khusus untuk performa olahraga tertentu',
    color: 'bg-indigo-600',
    icon: '⚽',
    subcategories: [
      'Football Training',
      'Basketball Drills',
      'Tennis Conditioning',
      'Swimming Technique'
    ]
  },
  {
    id: 'rehabilitation',
    name: 'Rehabilitation',
    description: 'Program pemulihan dan pencegahan cedera',
    color: 'bg-teal-600',
    icon: '🏥',
    subcategories: [
      'Injury Prevention',
      'Post-Injury Recovery',
      'Corrective Exercise',
      'Physical Therapy'
    ]
  }
];

export const getExercisesByCategory = (categoryId: string) => {
  // This will be implemented to filter exercises by category
  return [];
};

export const getCategoryById = (categoryId: string) => {
  return exerciseCategories.find(cat => cat.id === categoryId);
};