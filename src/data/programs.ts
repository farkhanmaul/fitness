export interface WorkoutProgram {
  id: string;
  name: string;
  category: 'CrossFit' | 'Hyrox' | 'Navy SEAL' | 'Military' | 'Strength' | 'Endurance';
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  objectives: string[];
  workouts: Workout[];
  equipment: string[];
  notes?: string;
}

export interface Workout {
  day: number;
  name: string;
  type: 'AMRAP' | 'For Time' | 'EMOM' | 'Tabata' | 'Strength' | 'Endurance' | 'Circuit';
  duration?: string;
  rounds?: number;
  exercises: WorkoutExercise[];
  restBetweenRounds?: string;
  notes?: string;
}

export interface WorkoutExercise {
  name: string;
  reps?: string;
  weight?: string;
  distance?: string;
  duration?: string;
  notes?: string;
}

export const workoutPrograms: WorkoutProgram[] = [
  // CrossFit WODs
  {
    id: 'murph',
    name: 'Murph',
    category: 'CrossFit',
    duration: 'Single Workout',
    difficulty: 'Advanced',
    description: 'Classic Hero WOD honoring Navy Lieutenant Michael Murphy. One of the most challenging CrossFit benchmarks.',
    objectives: ['Build mental toughness', 'Improve muscular endurance', 'Honor fallen heroes'],
    equipment: ['Pull-up Bar', 'Weighted Vest (optional)'],
    workouts: [
      {
        day: 1,
        name: 'Murph',
        type: 'For Time',
        exercises: [
          { name: 'Run', distance: '1 mile' },
          { name: 'Pull-ups', reps: '100' },
          { name: 'Push-ups', reps: '200' },
          { name: 'Air Squats', reps: '300' },
          { name: 'Run', distance: '1 mile' }
        ],
        notes: 'Partition the pull-ups, push-ups, and squats as needed. 20lb vest for men, 14lb for women (optional).'
      }
    ],
    notes: 'Scale by reducing reps or removing weighted vest. Common partition: 20 rounds of 5 pull-ups, 10 push-ups, 15 squats.'
  },
  {
    id: 'fran',
    name: 'Fran',
    category: 'CrossFit',
    duration: 'Single Workout',
    difficulty: 'Intermediate',
    description: 'Fast, intense benchmark WOD combining thrusters and pull-ups. A true test of power and technique under fatigue.',
    objectives: ['Develop power endurance', 'Master thruster technique', 'Build lactate tolerance'],
    equipment: ['Barbell', 'Plates', 'Pull-up Bar'],
    workouts: [
      {
        day: 1,
        name: 'Fran',
        type: 'For Time',
        exercises: [
          { name: 'Thrusters', reps: '21-15-9', weight: '95lb/65lb' },
          { name: 'Pull-ups', reps: '21-15-9' }
        ],
        notes: 'Complete 21 thrusters then 21 pull-ups, then 15 of each, then 9 of each. Goal time: under 5 minutes for elite athletes.'
      }
    ],
    notes: 'Scale weight and substitute pull-ups with jumping pull-ups or ring rows if needed.'
  },
  {
    id: 'cindy',
    name: 'Cindy',
    category: 'CrossFit',
    duration: 'Single Workout',
    difficulty: 'Beginner',
    description: 'Classic bodyweight AMRAP that builds endurance and teaches pacing. Perfect introduction to CrossFit methodology.',
    objectives: ['Build aerobic capacity', 'Master bodyweight movements', 'Learn pacing strategies'],
    equipment: ['Pull-up Bar'],
    workouts: [
      {
        day: 1,
        name: 'Cindy',
        type: 'AMRAP',
        duration: '20 minutes',
        exercises: [
          { name: 'Pull-ups', reps: '5' },
          { name: 'Push-ups', reps: '10' },
          { name: 'Air Squats', reps: '15' }
        ],
        notes: 'Complete as many rounds as possible in 20 minutes. Good score: 15+ rounds.'
      }
    ],
    notes: 'Scale pull-ups to jumping pull-ups or ring rows. Push-ups can be done from knees.'
  },

  // Hyrox Training
  {
    id: 'hyrox-prep-8week',
    name: 'Hyrox Preparation 8-Week',
    category: 'Hyrox',
    duration: '8 Weeks',
    difficulty: 'Intermediate',
    description: 'Comprehensive 8-week program designed to prepare for Hyrox competition. Focuses on the specific movements and energy systems.',
    objectives: ['Master Hyrox movements', 'Build hybrid fitness', 'Improve pacing strategy'],
    equipment: ['Ski Erg', 'Sled', 'Burpees', 'Rowing Machine', 'Farmers Carry', 'Sandbag', 'Wall Balls', 'Kettlebells'],
    workouts: [
      {
        day: 1,
        name: 'Hyrox Simulation (Week 1)',
        type: 'Circuit',
        exercises: [
          { name: 'Ski Erg', distance: '500m' },
          { name: 'Sled Push', distance: '25m', weight: 'Light' },
          { name: 'Burpee Broad Jumps', reps: '20' },
          { name: 'Rowing', distance: '500m' },
          { name: 'Farmers Carry', distance: '100m', weight: 'Light' },
          { name: 'Sandbag Lunges', distance: '50m' },
          { name: 'Wall Balls', reps: '50', weight: '20lb/14lb' },
          { name: 'Run', distance: '200m' }
        ],
        notes: 'Complete circuit with 2-3 minutes rest between stations. Focus on technique over speed.'
      },
      {
        day: 2,
        name: 'Running Intervals',
        type: 'Endurance',
        exercises: [
          { name: 'Warm-up Run', distance: '1km' },
          { name: 'Interval Run', distance: '400m x 6', notes: '90s rest between intervals' },
          { name: 'Cool-down Run', distance: '1km' }
        ]
      },
      {
        day: 3,
        name: 'Strength Focus',
        type: 'Strength',
        exercises: [
          { name: 'Deadlift', reps: '5x5', weight: '80%' },
          { name: 'Front Squat', reps: '4x8' },
          { name: 'Pull-ups', reps: '4x max' },
          { name: 'Overhead Press', reps: '4x6' }
        ]
      }
    ],
    notes: 'Progress weekly by increasing intensity and reducing rest periods. Week 8 should be a full Hyrox simulation.'
  },

  // Navy SEAL Training
  {
    id: 'seal-pst-prep',
    name: 'Navy SEAL PST Preparation',
    category: 'Navy SEAL',
    duration: '12 Weeks',
    difficulty: 'Advanced',
    description: 'Physical Screening Test preparation program focusing on swimming, running, and calisthenics. Builds the foundation for SEAL training.',
    objectives: ['Pass PST standards', 'Build swimming endurance', 'Master calisthenics', 'Develop mental toughness'],
    equipment: ['Pool', 'Pull-up Bar'],
    workouts: [
      {
        day: 1,
        name: 'PST Practice (Week 1)',
        type: 'For Time',
        exercises: [
          { name: 'Swim (Sidestroke/Breaststroke)', distance: '500 yards', notes: 'Goal: under 12:30' },
          { name: 'Rest', duration: '10 minutes' },
          { name: 'Push-ups', reps: 'max in 2 minutes', notes: 'Goal: 50+' },
          { name: 'Rest', duration: '2 minutes' },
          { name: 'Sit-ups', reps: 'max in 2 minutes', notes: 'Goal: 50+' },
          { name: 'Rest', duration: '2 minutes' },
          { name: 'Pull-ups', reps: 'max (no time limit)', notes: 'Goal: 10+' },
          { name: 'Rest', duration: '10 minutes' },
          { name: 'Run', distance: '1.5 miles', notes: 'Goal: under 10:30' }
        ]
      },
      {
        day: 2,
        name: 'Calisthenics Circuit',
        type: 'Circuit',
        rounds: 4,
        exercises: [
          { name: 'Push-ups', reps: '20' },
          { name: 'Sit-ups', reps: '30' },
          { name: 'Pull-ups', reps: '10' },
          { name: 'Flutter Kicks', reps: '40' },
          { name: 'Mountain Climbers', reps: '30' }
        ],
        restBetweenRounds: '2 minutes'
      },
      {
        day: 3,
        name: 'Long Swim',
        type: 'Endurance',
        exercises: [
          { name: 'Warm-up Swim', distance: '200 yards' },
          { name: 'Main Set', distance: '1000 yards', notes: 'Steady pace, focus on technique' },
          { name: 'Cool-down Swim', distance: '200 yards' }
        ]
      }
    ],
    notes: 'PST minimum standards: 500yd swim 12:30, Push-ups 50, Sit-ups 50, Pull-ups 10, 1.5mi run 10:30. Competitive standards are much higher.'
  },

  // Military Training
  {
    id: 'army-apft-prep',
    name: 'Army APFT Preparation',
    category: 'Military',
    duration: '8 Weeks',
    difficulty: 'Intermediate',
    description: 'Army Physical Fitness Test preparation focusing on push-ups, sit-ups, and 2-mile run performance.',
    objectives: ['Score 300 on APFT', 'Build muscular endurance', 'Improve running performance'],
    equipment: ['Running Track'],
    workouts: [
      {
        day: 1,
        name: 'APFT Practice',
        type: 'For Time',
        exercises: [
          { name: 'Push-ups', reps: 'max in 2 minutes' },
          { name: 'Rest', duration: '5 minutes' },
          { name: 'Sit-ups', reps: 'max in 2 minutes' },
          { name: 'Rest', duration: '5 minutes' },
          { name: 'Run', distance: '2 miles' }
        ],
        notes: 'Perfect score: Push-ups 77+, Sit-ups 82+, 2-mile run under 13:00 (varies by age/gender)'
      },
      {
        day: 2,
        name: 'Push-up Pyramid',
        type: 'Strength',
        exercises: [
          { name: 'Push-up Pyramid', reps: '1-2-3-4-5-6-7-8-9-10-9-8-7-6-5-4-3-2-1', notes: '10 seconds rest between sets' }
        ]
      },
      {
        day: 3,
        name: 'Running Intervals',
        type: 'Endurance',
        exercises: [
          { name: 'Warm-up Run', distance: '0.5 mile' },
          { name: '400m Intervals', reps: '8', notes: '90 seconds rest between' },
          { name: 'Cool-down Run', distance: '0.5 mile' }
        ]
      }
    ]
  },

  // Strength Programs
  {
    id: '5x5-strength',
    name: 'StrongLifts 5x5',
    category: 'Strength',
    duration: '12 Weeks',
    difficulty: 'Beginner',
    description: 'Simple but effective strength program focusing on compound movements. Build raw strength with progressive overload.',
    objectives: ['Increase maximal strength', 'Master compound movements', 'Build muscle mass'],
    equipment: ['Barbell', 'Squat Rack', 'Bench'],
    workouts: [
      {
        day: 1,
        name: 'Workout A',
        type: 'Strength',
        exercises: [
          { name: 'Squat', reps: '5x5' },
          { name: 'Bench Press', reps: '5x5' },
          { name: 'Barbell Row', reps: '5x5' }
        ],
        notes: 'Add 5lbs to each lift every session. Rest 3-5 minutes between sets.'
      },
      {
        day: 2,
        name: 'Workout B',
        type: 'Strength',
        exercises: [
          { name: 'Squat', reps: '5x5' },
          { name: 'Overhead Press', reps: '5x5' },
          { name: 'Deadlift', reps: '1x5' }
        ],
        notes: 'Alternate A and B workouts. Train 3x per week with rest days between.'
      }
    ],
    notes: 'Start with empty barbell or light weight. Focus on perfect form. Deload 10% if you fail 3 sessions in a row.'
  },

  // Endurance Programs
  {
    id: 'couch-to-5k',
    name: 'Couch to 5K',
    category: 'Endurance',
    duration: '9 Weeks',
    difficulty: 'Beginner',
    description: 'Progressive running program that takes you from couch to completing a 5K run. Perfect for running beginners.',
    objectives: ['Run continuous 5K', 'Build aerobic base', 'Establish running habit'],
    equipment: ['Running Shoes'],
    workouts: [
      {
        day: 1,
        name: 'Week 1 - Day 1',
        type: 'Endurance',
        exercises: [
          { name: 'Warm-up Walk', duration: '5 minutes' },
          { name: 'Run/Walk Intervals', duration: '20 minutes', notes: 'Alternate 60s run, 90s walk x 8' },
          { name: 'Cool-down Walk', duration: '5 minutes' }
        ]
      },
      {
        day: 2,
        name: 'Week 5 - Day 1',
        type: 'Endurance',
        exercises: [
          { name: 'Warm-up Walk', duration: '5 minutes' },
          { name: 'Run', duration: '5 minutes' },
          { name: 'Walk', duration: '3 minutes' },
          { name: 'Run', duration: '5 minutes' },
          { name: 'Walk', duration: '3 minutes' },
          { name: 'Run', duration: '5 minutes' },
          { name: 'Cool-down Walk', duration: '5 minutes' }
        ]
      },
      {
        day: 3,
        name: 'Week 9 - Day 3',
        type: 'Endurance',
        exercises: [
          { name: 'Warm-up Walk', duration: '5 minutes' },
          { name: 'Run', duration: '30 minutes', notes: 'Continuous run - you did it!' },
          { name: 'Cool-down Walk', duration: '5 minutes' }
        ]
      }
    ],
    notes: 'Run 3x per week with rest days. Focus on time, not speed. Repeat weeks if needed.'
  }
];

export const programCategories = [
  'CrossFit',
  'Hyrox', 
  'Navy SEAL',
  'Military',
  'Strength',
  'Endurance'
];