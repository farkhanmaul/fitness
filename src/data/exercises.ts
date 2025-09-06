export interface Exercise {
  id: string;
  name: string;
  category: string;
  description: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  equipment: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  instructions: string[];
  tips: string[];
  variations: string[];
  progressions?: {
    name: string;
    description: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    instructions: string[];
  }[];
}

export const exercises: Exercise[] = [
  // Upper Body - Push
  {
    id: 'push-up',
    name: 'Push-up',
    category: 'Upper Body - Push',
    description: 'A fundamental bodyweight exercise that strengthens the chest, shoulders, and triceps.',
    primaryMuscles: ['Chest', 'Triceps', 'Front Deltoids'],
    secondaryMuscles: ['Core', 'Rear Deltoids'],
    equipment: ['Bodyweight'],
    difficulty: 'Beginner',
    instructions: [
      'Start in a plank position with hands shoulder-width apart',
      'Keep your body in a straight line from head to heels',
      'Lower your chest to just above the ground',
      'Push back up to starting position',
      'Maintain tight core throughout the movement'
    ],
    tips: [
      'Keep elbows at 45-degree angle to your torso',
      'Breathe in on the way down, out on the way up',
      'Engage your glutes to maintain proper form'
    ],
    variations: ['Incline Push-up', 'Decline Push-up', 'Diamond Push-up', 'Wide-grip Push-up'],
    progressions: [
      {
        name: 'Wall Push-up',
        description: 'Standing push-up against a wall for beginners',
        difficulty: 'Beginner',
        instructions: [
          'Stand arm\'s length from wall',
          'Place palms flat against wall at shoulder height',
          'Lean in and push back with control'
        ]
      },
      {
        name: 'Incline Push-up',
        description: 'Hands elevated on bench or step',
        difficulty: 'Beginner',
        instructions: [
          'Place hands on elevated surface',
          'Assume plank position',
          'Perform push-up with reduced load'
        ]
      },
      {
        name: 'Standard Push-up',
        description: 'Full push-up from toes',
        difficulty: 'Intermediate',
        instructions: [
          'Full plank position on toes',
          'Lower chest to ground',
          'Push back to starting position'
        ]
      },
      {
        name: 'Archer Push-up',
        description: 'Single arm focus push-up variation',
        difficulty: 'Advanced',
        instructions: [
          'Start in wide push-up position',
          'Shift weight to one side during descent',
          'Push back up using primarily one arm'
        ]
      }
    ]
  },
  {
    id: 'overhead-press',
    name: 'Overhead Press (Military Press)',
    category: 'Upper Body - Push',
    description: 'A compound movement that builds shoulder strength and stability while engaging the entire core.',
    primaryMuscles: ['Shoulders', 'Triceps'],
    secondaryMuscles: ['Upper Chest', 'Core', 'Upper Back'],
    equipment: ['Barbell', 'Dumbbells', 'Kettlebell'],
    difficulty: 'Intermediate',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Hold barbell at shoulder level with hands slightly wider than shoulders',
      'Brace core and press weight directly overhead',
      'Lock out arms at the top',
      'Lower under control to starting position'
    ],
    tips: [
      'Keep core tight to prevent back extension',
      'Press the bar in a straight line',
      'Squeeze glutes at the top for stability'
    ],
    variations: ['Dumbbell Press', 'Single-arm Press', 'Push Press', 'Seated Press']
  },

  // Upper Body - Pull
  {
    id: 'pull-up',
    name: 'Pull-up',
    category: 'Upper Body - Pull',
    description: 'The king of upper body pulling exercises, targeting the lats, rhomboids, and biceps.',
    primaryMuscles: ['Lats', 'Rhomboids', 'Middle Traps'],
    secondaryMuscles: ['Biceps', 'Rear Deltoids', 'Lower Traps'],
    equipment: ['Pull-up Bar'],
    difficulty: 'Intermediate',
    instructions: [
      'Hang from pull-up bar with overhand grip',
      'Start from dead hang with arms fully extended',
      'Pull yourself up until chin clears the bar',
      'Lower yourself slowly to starting position',
      'Maintain slight forward lean'
    ],
    tips: [
      'Focus on pulling with your back, not just your arms',
      'Engage core to prevent swinging',
      'Full range of motion is key'
    ],
    variations: ['Chin-up', 'Wide-grip Pull-up', 'Neutral-grip Pull-up', 'Weighted Pull-up']
  },
  {
    id: 'row',
    name: 'Bent-over Row',
    category: 'Upper Body - Pull',
    description: 'Essential pulling exercise for building a strong, thick back and improving posture.',
    primaryMuscles: ['Lats', 'Rhomboids', 'Middle Traps'],
    secondaryMuscles: ['Rear Deltoids', 'Biceps', 'Lower Traps'],
    equipment: ['Barbell', 'Dumbbells', 'Cable'],
    difficulty: 'Intermediate',
    instructions: [
      'Stand with feet shoulder-width apart, holding barbell',
      'Hinge at hips and bend forward about 45 degrees',
      'Keep back straight and core engaged',
      'Pull bar to lower chest/upper abdomen',
      'Squeeze shoulder blades together at the top'
    ],
    tips: [
      'Keep the weight close to your body',
      'Don\'t let your lower back round',
      'Focus on squeezing your shoulder blades'
    ],
    variations: ['T-Bar Row', 'Single-arm Dumbbell Row', 'Cable Row', 'Inverted Row']
  },

  // Lower Body - Squat Pattern
  {
    id: 'squat',
    name: 'Back Squat',
    category: 'Lower Body - Squat',
    description: 'The fundamental lower body exercise that builds strength in the quads, glutes, and core.',
    primaryMuscles: ['Quadriceps', 'Glutes'],
    secondaryMuscles: ['Hamstrings', 'Calves', 'Core', 'Upper Back'],
    equipment: ['Barbell', 'Squat Rack'],
    difficulty: 'Intermediate',
    instructions: [
      'Position bar on upper back (high bar) or lower traps (low bar)',
      'Stand with feet slightly wider than shoulder-width',
      'Descend by pushing hips back and bending knees',
      'Go down until thighs are parallel to ground',
      'Drive through heels to return to starting position'
    ],
    tips: [
      'Keep knees in line with toes',
      'Maintain neutral spine throughout',
      'Breathe in at the top, hold during descent and ascent'
    ],
    variations: ['Front Squat', 'Goblet Squat', 'Bulgarian Split Squat', 'Overhead Squat']
  },
  {
    id: 'air-squat',
    name: 'Air Squat (Bodyweight Squat)',
    category: 'Lower Body - Squat',
    description: 'Perfect bodyweight movement for building lower body strength and mobility.',
    primaryMuscles: ['Quadriceps', 'Glutes'],
    secondaryMuscles: ['Hamstrings', 'Calves', 'Core'],
    equipment: ['Bodyweight'],
    difficulty: 'Beginner',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Arms can be extended forward for balance',
      'Lower by pushing hips back and bending knees',
      'Descend until thighs are parallel to ground',
      'Stand back up by driving through heels'
    ],
    tips: [
      'Keep chest up and core engaged',
      'Weight should be on heels, not toes',
      'Practice the movement pattern before adding weight'
    ],
    variations: ['Jump Squat', 'Pistol Squat', 'Cossack Squat', 'Sumo Squat']
  },

  // Lower Body - Hinge Pattern
  {
    id: 'deadlift',
    name: 'Deadlift',
    category: 'Lower Body - Hinge',
    description: 'The ultimate posterior chain exercise, building strength in the hamstrings, glutes, and back.',
    primaryMuscles: ['Hamstrings', 'Glutes', 'Lower Back'],
    secondaryMuscles: ['Lats', 'Traps', 'Rhomboids', 'Core', 'Forearms'],
    equipment: ['Barbell', 'Plates'],
    difficulty: 'Intermediate',
    instructions: [
      'Stand with feet hip-width apart, bar over mid-foot',
      'Bend at hips and knees to grip bar with hands outside legs',
      'Keep back straight, chest up, shoulders over bar',
      'Drive through heels and extend hips to lift the bar',
      'Stand tall with shoulders back, then reverse the movement'
    ],
    tips: [
      'Keep the bar close to your body throughout',
      'Lead with your hips, not your knees',
      'Engage lats to keep bar close'
    ],
    variations: ['Romanian Deadlift', 'Sumo Deadlift', 'Trap Bar Deadlift', 'Single-leg Deadlift']
  },
  {
    id: 'romanian-deadlift',
    name: 'Romanian Deadlift (RDL)',
    category: 'Lower Body - Hinge',
    description: 'Hip-hinge movement that targets the hamstrings and glutes while improving posterior chain flexibility.',
    primaryMuscles: ['Hamstrings', 'Glutes'],
    secondaryMuscles: ['Lower Back', 'Core'],
    equipment: ['Barbell', 'Dumbbells', 'Kettlebell'],
    difficulty: 'Intermediate',
    instructions: [
      'Start standing with bar at hip level',
      'Keep knees slightly bent throughout',
      'Hinge at hips by pushing them back',
      'Lower bar while keeping it close to legs',
      'Feel stretch in hamstrings, then return to standing'
    ],
    tips: [
      'This is a hip movement, not a knee movement',
      'Keep shoulders back and chest proud',
      'Go only as low as hamstring flexibility allows'
    ],
    variations: ['Single-leg RDL', 'Dumbbell RDL', 'Kettlebell RDL', 'Stiff-leg Deadlift']
  },

  // Core
  {
    id: 'plank',
    name: 'Plank',
    category: 'Core',
    description: 'Isometric core exercise that builds stability and endurance in the entire core musculature.',
    primaryMuscles: ['Core', 'Transverse Abdominis'],
    secondaryMuscles: ['Shoulders', 'Glutes', 'Quadriceps'],
    equipment: ['Bodyweight'],
    difficulty: 'Beginner',
    instructions: [
      'Start in push-up position on forearms',
      'Keep body in straight line from head to heels',
      'Engage core and squeeze glutes',
      'Hold position while breathing normally',
      'Maintain neutral spine throughout'
    ],
    tips: [
      'Don\'t let hips sag or pike up',
      'Focus on quality over duration',
      'Engage your glutes to protect lower back'
    ],
    variations: ['Side Plank', 'Plank Up-Down', 'Plank with Leg Lift', 'Bear Crawl']
  },

  // CrossFit/MetCon Movements
  {
    id: 'burpee',
    name: 'Burpee',
    category: 'MetCon/CrossFit',
    description: 'Full-body conditioning exercise combining a squat, plank, push-up, and jump.',
    primaryMuscles: ['Full Body'],
    secondaryMuscles: ['Cardiovascular System'],
    equipment: ['Bodyweight'],
    difficulty: 'Intermediate',
    instructions: [
      'Start standing, then squat down and place hands on ground',
      'Jump or step feet back into plank position',
      'Perform a push-up (optional)',
      'Jump or step feet back to squat position',
      'Jump up with arms overhead'
    ],
    tips: [
      'Maintain good form even when fatigued',
      'Step instead of jump if needed',
      'Focus on smooth, efficient movement'
    ],
    variations: ['Half Burpee', 'Burpee Box Jump', '6-count Burpee', 'Devil Press']
  },
  {
    id: 'thruster',
    name: 'Thruster',
    category: 'MetCon/CrossFit',
    description: 'Combines front squat and overhead press into one explosive movement.',
    primaryMuscles: ['Quadriceps', 'Glutes', 'Shoulders'],
    secondaryMuscles: ['Core', 'Triceps', 'Upper Back'],
    equipment: ['Barbell', 'Dumbbells', 'Kettlebell'],
    difficulty: 'Advanced',
    instructions: [
      'Start with bar in front rack position',
      'Perform a full front squat',
      'As you stand up, use momentum to press bar overhead',
      'Lower bar back to front rack position',
      'Repeat in fluid motion'
    ],
    tips: [
      'Use leg drive to help with the press',
      'Keep core tight throughout',
      'Practice front squats and overhead press separately first'
    ],
    variations: ['Dumbbell Thruster', 'Single-arm Thruster', 'Kettlebell Thruster']
  },

  // Hyrox Specific
  {
    id: 'wall-ball',
    name: 'Wall Ball',
    category: 'Hyrox/Functional',
    description: 'Functional movement combining squat and overhead throw, common in Hyrox competitions.',
    primaryMuscles: ['Quadriceps', 'Glutes', 'Shoulders'],
    secondaryMuscles: ['Core', 'Calves'],
    equipment: ['Medicine Ball', 'Wall'],
    difficulty: 'Intermediate',
    instructions: [
      'Hold medicine ball at chest level',
      'Perform squat with ball at chest',
      'Explosively stand and throw ball to target on wall',
      'Catch ball on the way down',
      'Immediately go into next squat'
    ],
    tips: [
      'Use legs to generate power, not just arms',
      'Catch the ball with soft hands',
      'Keep consistent rhythm'
    ],
    variations: ['Single-arm Wall Ball', 'Wall Ball Sit-up', 'Overhead Wall Ball']
  },
  {
    id: 'sled-push',
    name: 'Sled Push',
    category: 'Hyrox/Functional',
    description: 'Lower body power and conditioning exercise common in functional fitness and Hyrox.',
    primaryMuscles: ['Quadriceps', 'Glutes', 'Calves'],
    secondaryMuscles: ['Core', 'Shoulders', 'Triceps'],
    equipment: ['Prowler Sled', 'Weight Plates'],
    difficulty: 'Intermediate',
    instructions: [
      'Position hands on sled handles',
      'Lean forward at 45-degree angle',
      'Drive with legs, keeping arms straight',
      'Take short, quick steps',
      'Push through entire foot'
    ],
    tips: [
      'Stay low and drive with your legs',
      'Keep core engaged',
      'Don\'t let the sled stop moving'
    ],
    variations: ['High Handle Push', 'Low Handle Push', 'Single-arm Push']
  },

  // Military/Tactical
  {
    id: 'farmer-carry',
    name: 'Farmer\'s Carry',
    category: 'Military/Tactical',
    description: 'Functional strength exercise that builds grip, core, and total body stability.',
    primaryMuscles: ['Forearms', 'Traps', 'Core'],
    secondaryMuscles: ['Shoulders', 'Legs', 'Glutes'],
    equipment: ['Dumbbells', 'Kettlebells', 'Farmer Walk Handles'],
    difficulty: 'Beginner',
    instructions: [
      'Pick up heavy weights in each hand',
      'Stand tall with shoulders back',
      'Walk forward with controlled steps',
      'Keep core engaged and avoid leaning',
      'Maintain grip throughout the distance'
    ],
    tips: [
      'Start with shorter distances',
      'Focus on posture over speed',
      'Use chalk for better grip if needed'
    ],
    variations: ['Single-arm Carry', 'Front-loaded Carry', 'Mixed Carry', 'Overhead Carry']
  },
  {
    id: 'bear-crawl',
    name: 'Bear Crawl',
    category: 'Military/Tactical',
    description: 'Full-body movement pattern that builds strength, coordination, and conditioning.',
    primaryMuscles: ['Core', 'Shoulders', 'Quadriceps'],
    secondaryMuscles: ['Triceps', 'Glutes', 'Hip Flexors'],
    equipment: ['Bodyweight'],
    difficulty: 'Intermediate',
    instructions: [
      'Start on hands and feet with knees just off ground',
      'Keep hips level and core tight',
      'Move opposite hand and foot forward',
      'Take small steps, maintaining form',
      'Keep knees close to ground throughout'
    ],
    tips: [
      'Quality over speed',
      'Keep hips from swaying side to side',
      'Breathe regularly'
    ],
    variations: ['Lateral Bear Crawl', 'Reverse Bear Crawl', 'Bear Crawl Hold']
  },

  // Olympic Lifting
  {
    id: 'clean-and-jerk',
    name: 'Clean and Jerk',
    category: 'Olympic Lifting',
    description: 'Technical Olympic lift combining explosive pulling with overhead pressing power.',
    primaryMuscles: ['Full Body'],
    secondaryMuscles: ['Power', 'Coordination'],
    equipment: ['Barbell', 'Plates', 'Platform'],
    difficulty: 'Advanced',
    instructions: [
      'Start with bar over mid-foot, similar to deadlift setup',
      'First pull: lift bar to knee level',
      'Second pull: explosive extension of hips and knees',
      'Catch bar in front rack position in squat',
      'Stand up, then jerk bar overhead'
    ],
    tips: [
      'This is a very technical lift - get coaching',
      'Start with just the barbell',
      'Practice each component separately'
    ],
    variations: ['Power Clean', 'Hang Clean', 'Split Jerk', 'Push Jerk']
  },
  {
    id: 'snatch',
    name: 'Snatch',
    category: 'Olympic Lifting',
    description: 'The most technical Olympic lift, taking the bar from ground to overhead in one motion.',
    primaryMuscles: ['Full Body'],
    secondaryMuscles: ['Power', 'Mobility', 'Coordination'],
    equipment: ['Barbell', 'Plates', 'Platform'],
    difficulty: 'Advanced',
    instructions: [
      'Wide grip on barbell (snatch grip)',
      'Pull bar explosively from ground',
      'Pull yourself under the bar',
      'Catch bar overhead in squat position',
      'Stand up with bar overhead'
    ],
    tips: [
      'Extremely technical - requires coaching',
      'Work on mobility first',
      'Master overhead squat before attempting'
    ],
    variations: ['Power Snatch', 'Hang Snatch', 'Muscle Snatch']
  },

  // Gymnastics/Bodyweight
  {
    id: 'muscle-up',
    name: 'Muscle-up',
    category: 'Gymnastics',
    description: 'Advanced bodyweight movement combining pull-up and dip in one fluid motion.',
    primaryMuscles: ['Lats', 'Triceps', 'Chest'],
    secondaryMuscles: ['Core', 'Shoulders', 'Forearms'],
    equipment: ['Pull-up Bar', 'Rings'],
    difficulty: 'Advanced',
    instructions: [
      'Start hanging from bar or rings',
      'Perform explosive pull-up',
      'Transition by leaning forward and pushing',
      'Press to support position',
      'Lower under control'
    ],
    tips: [
      'Master pull-ups and dips first',
      'Practice transition separately',
      'Use false grip on rings'
    ],
    variations: ['Ring Muscle-up', 'Bar Muscle-up', 'Strict Muscle-up', 'Kipping Muscle-up']
  },
  {
    id: 'handstand-push-up',
    name: 'Handstand Push-up',
    category: 'Gymnastics',
    description: 'Advanced inverted pressing movement requiring significant shoulder strength and balance.',
    primaryMuscles: ['Shoulders', 'Triceps'],
    secondaryMuscles: ['Core', 'Upper Traps'],
    equipment: ['Wall', 'Bodyweight'],
    difficulty: 'Advanced',
    instructions: [
      'Start in handstand position against wall',
      'Lower head toward ground',
      'Press back to starting position',
      'Maintain straight body line',
      'Control the movement'
    ],
    tips: [
      'Master wall-supported handstand first',
      'Build up shoulder strength with pike push-ups',
      'Practice hollow body holds'
    ],
    variations: ['Pike Push-up', 'Wall Handstand Push-up', 'Freestanding Handstand Push-up']
  }
];

export const categories = [
  'Upper Body - Push',
  'Upper Body - Pull', 
  'Lower Body - Squat',
  'Lower Body - Hinge',
  'Core',
  'MetCon/CrossFit',
  'Hyrox/Functional',
  'Military/Tactical',
  'Olympic Lifting',
  'Gymnastics'
];

export const muscleGroups = [
  'Chest',
  'Shoulders', 
  'Triceps',
  'Biceps',
  'Lats',
  'Rhomboids',
  'Traps',
  'Core',
  'Quadriceps',
  'Hamstrings',
  'Glutes',
  'Calves',
  'Forearms'
];

export const equipment = [
  'Bodyweight',
  'Barbell',
  'Dumbbells',
  'Kettlebell',
  'Pull-up Bar',
  'Cable',
  'Medicine Ball',
  'Rings',
  'Sled',
  'Wall'
];