import { ExerciseLibraryItem } from '@/types/workoutBuilder';

export const exerciseLibrary: ExerciseLibraryItem[] = [
  // Chest Exercises
  {
    id: 'bench-press',
    name: 'Barbell Bench Press',
    category: 'Strength',
    muscleGroups: ['Chest', 'Shoulders', 'Triceps'],
    equipment: ['Barbell', 'Bench'],
    difficulty: 'intermediate',
    instructions: [
      'Lie on bench with eyes under the bar',
      'Grip bar slightly wider than shoulder-width',
      'Lower bar to chest with control',
      'Press bar up in straight line',
      'Lock out arms at top'
    ],
    tips: ['Keep shoulder blades retracted', 'Maintain slight arch in back'],
    variations: ['Incline Bench Press', 'Decline Bench Press', 'Dumbbell Bench Press']
  },
  {
    id: 'push-ups',
    name: 'Push-ups',
    category: 'Bodyweight',
    muscleGroups: ['Chest', 'Shoulders', 'Triceps'],
    equipment: [],
    difficulty: 'beginner',
    instructions: [
      'Start in plank position',
      'Lower body until chest nearly touches ground',
      'Push back up to starting position',
      'Keep core engaged throughout'
    ],
    tips: ['Maintain straight line from head to heels', 'Control the descent'],
    variations: ['Incline Push-ups', 'Diamond Push-ups', 'Decline Push-ups']
  },
  
  // Back Exercises
  {
    id: 'deadlift',
    name: 'Conventional Deadlift',
    category: 'Strength',
    muscleGroups: ['Back', 'Glutes', 'Hamstrings', 'Core'],
    equipment: ['Barbell'],
    difficulty: 'advanced',
    instructions: [
      'Stand with feet hip-width apart',
      'Grip bar outside legs',
      'Keep back straight, chest up',
      'Drive through heels to lift',
      'Extend hips and knees simultaneously'
    ],
    tips: ['Keep bar close to body', 'Engage lats to protect spine'],
    variations: ['Sumo Deadlift', 'Romanian Deadlift', 'Trap Bar Deadlift']
  },
  {
    id: 'pull-ups',
    name: 'Pull-ups',
    category: 'Bodyweight',
    muscleGroups: ['Back', 'Biceps'],
    equipment: ['Pull-up Bar'],
    difficulty: 'intermediate',
    instructions: [
      'Hang from bar with overhand grip',
      'Pull body up until chin over bar',
      'Lower with control',
      'Maintain engaged core'
    ],
    tips: ['Avoid swinging', 'Focus on lat engagement'],
    variations: ['Chin-ups', 'Wide Grip Pull-ups', 'Assisted Pull-ups']
  },

  // Leg Exercises
  {
    id: 'squat',
    name: 'Back Squat',
    category: 'Strength',
    muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: ['Barbell', 'Squat Rack'],
    difficulty: 'intermediate',
    instructions: [
      'Position bar on upper traps',
      'Stand with feet shoulder-width apart',
      'Lower by bending knees and hips',
      'Descend until thighs parallel to ground',
      'Drive up through heels'
    ],
    tips: ['Keep knees aligned with toes', 'Maintain upright torso'],
    variations: ['Front Squat', 'Goblet Squat', 'Bulgarian Split Squat']
  },
  {
    id: 'lunges',
    name: 'Walking Lunges',
    category: 'Strength',
    muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings'],
    equipment: [],
    difficulty: 'beginner',
    instructions: [
      'Step forward into lunge position',
      'Lower back knee toward ground',
      'Push off front foot to step forward',
      'Alternate legs with each step'
    ],
    tips: ['Keep front knee over ankle', 'Maintain upright posture'],
    variations: ['Reverse Lunges', 'Lateral Lunges', 'Weighted Lunges']
  },

  // Shoulder Exercises
  {
    id: 'overhead-press',
    name: 'Overhead Press',
    category: 'Strength',
    muscleGroups: ['Shoulders', 'Triceps', 'Core'],
    equipment: ['Barbell'],
    difficulty: 'intermediate',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Hold bar at shoulder height',
      'Press bar straight overhead',
      'Lower with control to shoulders'
    ],
    tips: ['Keep core tight', 'Press in straight line'],
    variations: ['Dumbbell Press', 'Seated Press', 'Push Press']
  },
  {
    id: 'lateral-raises',
    name: 'Lateral Raises',
    category: 'Isolation',
    muscleGroups: ['Shoulders'],
    equipment: ['Dumbbells'],
    difficulty: 'beginner',
    instructions: [
      'Hold dumbbells at sides',
      'Raise arms out to sides',
      'Lift to shoulder height',
      'Lower with control'
    ],
    tips: ['Slight bend in elbows', 'Control the weight'],
    variations: ['Front Raises', 'Rear Delt Flyes', 'Cable Lateral Raises']
  },

  // Arm Exercises
  {
    id: 'bicep-curls',
    name: 'Bicep Curls',
    category: 'Isolation',
    muscleGroups: ['Biceps'],
    equipment: ['Dumbbells'],
    difficulty: 'beginner',
    instructions: [
      'Hold dumbbells with arms extended',
      'Curl weights toward shoulders',
      'Squeeze biceps at top',
      'Lower with control'
    ],
    tips: ['Keep elbows stationary', 'Full range of motion'],
    variations: ['Hammer Curls', 'Preacher Curls', 'Cable Curls']
  },
  {
    id: 'tricep-dips',
    name: 'Tricep Dips',
    category: 'Bodyweight',
    muscleGroups: ['Triceps', 'Shoulders'],
    equipment: ['Bench'],
    difficulty: 'beginner',
    instructions: [
      'Position hands on bench behind you',
      'Lower body by bending elbows',
      'Descend until arms at 90 degrees',
      'Push back up to starting position'
    ],
    tips: ['Keep body close to bench', 'Control the descent'],
    variations: ['Parallel Bar Dips', 'Assisted Dips', 'Weighted Dips']
  },

  // Core Exercises
  {
    id: 'plank',
    name: 'Plank',
    category: 'Core',
    muscleGroups: ['Core', 'Shoulders'],
    equipment: [],
    difficulty: 'beginner',
    instructions: [
      'Start in push-up position',
      'Lower to forearms',
      'Hold straight line from head to heels',
      'Engage core throughout'
    ],
    tips: ['Breathe normally', 'Keep hips level'],
    variations: ['Side Plank', 'Plank Up-Downs', 'Plank with Leg Lifts']
  },
  {
    id: 'mountain-climbers',
    name: 'Mountain Climbers',
    category: 'Cardio',
    muscleGroups: ['Core', 'Shoulders', 'Legs'],
    equipment: [],
    difficulty: 'intermediate',
    instructions: [
      'Start in plank position',
      'Bring one knee toward chest',
      'Quickly switch legs',
      'Maintain plank position throughout'
    ],
    tips: ['Keep core engaged', 'Maintain steady rhythm'],
    variations: ['Slow Mountain Climbers', 'Cross-body Mountain Climbers']
  }
];

export const exerciseCategories = [
  'All',
  'Strength',
  'Bodyweight',
  'Isolation', 
  'Core',
  'Cardio'
];

export const muscleGroups = [
  'All',
  'Chest',
  'Back', 
  'Shoulders',
  'Biceps',
  'Triceps',
  'Quadriceps',
  'Hamstrings',
  'Glutes',
  'Core',
  'Legs'
];

export const equipment = [
  'All',
  'None',
  'Barbell',
  'Dumbbells', 
  'Bench',
  'Pull-up Bar',
  'Squat Rack',
  'Cable Machine'
];