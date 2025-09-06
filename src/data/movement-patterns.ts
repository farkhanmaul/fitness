export interface MovementPattern {
  id: string;
  name: string;
  description: string;
  primaryMuscles: string[];
  keyPrinciples: string[];
  commonMistakes: string[];
  formCues: string[];
  progressions: Progression[];
  exercises: string[];
  benefits: string[];
}

export interface Progression {
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  exercises: string[];
  focus: string[];
}

export const movementPatterns: MovementPattern[] = [
  {
    id: 'squat-pattern',
    name: 'Squat Pattern',
    description: 'Fundamental human movement involving hip and knee flexion. The foundation of athletic performance and daily activities like sitting and standing.',
    primaryMuscles: ['Quadriceps', 'Glutes', 'Core', 'Calves'],
    keyPrinciples: [
      'Hips move back and down simultaneously',
      'Knees track over toes',
      'Chest stays up and proud',
      'Weight distributed across whole foot',
      'Spine maintains neutral curve'
    ],
    formCues: [
      '"Sit back into a chair"',
      '"Push the floor apart with your feet"',
      '"Big chest, proud posture"',
      '"Drive through your heels"',
      '"Knees out, not in"'
    ],
    commonMistakes: [
      'Knees caving inward (valgus collapse)',
      'Forward lean with chest dropping',
      'Rising onto toes/heels lifting',
      'Not reaching adequate depth',
      'Rounding of lower back',
      'Weight shifting to toes'
    ],
    progressions: [
      {
        level: 'Beginner',
        description: 'Master bodyweight movement with proper depth and control',
        exercises: ['Box Squat', 'Goblet Squat', 'Wall Squat', 'Supported Squat'],
        focus: ['Mobility', 'Basic pattern', 'Depth achievement', 'Balance']
      },
      {
        level: 'Intermediate',
        description: 'Add external load while maintaining perfect form',
        exercises: ['Front Squat', 'Back Squat', 'Overhead Squat', 'Bulgarian Split Squat'],
        focus: ['Load progression', 'Unilateral strength', 'Core stability', 'Power development']
      },
      {
        level: 'Advanced',
        description: 'Complex variations and maximal strength development',
        exercises: ['Pistol Squat', 'Jump Squat', 'Single-leg Box Squat', 'Pause Squats'],
        focus: ['Unilateral mastery', 'Explosive power', 'Advanced stability', 'Sport-specific applications']
      }
    ],
    exercises: [
      'Air Squat',
      'Goblet Squat', 
      'Front Squat',
      'Back Squat',
      'Overhead Squat',
      'Bulgarian Split Squat',
      'Jump Squat',
      'Pistol Squat'
    ],
    benefits: [
      'Builds lower body strength and power',
      'Improves hip and ankle mobility',
      'Enhances core stability',
      'Transfers to athletic performance',
      'Essential for daily activities',
      'Develops posterior chain'
    ]
  },
  {
    id: 'hinge-pattern',
    name: 'Hip Hinge Pattern',
    description: 'Movement characterized by hip flexion with minimal knee bend. Essential for lifting objects from the ground and developing posterior chain strength.',
    primaryMuscles: ['Hamstrings', 'Glutes', 'Lower Back', 'Core'],
    keyPrinciples: [
      'Hips move back first and lead the movement',
      'Minimal knee bend throughout',
      'Maintain neutral spine curve',
      'Load the posterior chain',
      'Keep weight in heels'
    ],
    formCues: [
      '"Push your hips back to the wall behind you"',
      '"Bow at the hips, not the waist"',
      '"Feel a stretch in your hamstrings"',
      '"Chest up, shoulders back"',
      '"Drive hips forward to stand"'
    ],
    commonMistakes: [
      'Rounding the back instead of hinging at hips',
      'Too much knee bend (turning into squat)',
      'Weight shifting to toes',
      'Not reaching full hip extension at top',
      'Hyperextending back at top position',
      'Leading with knees instead of hips'
    ],
    progressions: [
      {
        level: 'Beginner',
        description: 'Learn proper hip hinge mechanics without load',
        exercises: ['Hip Hinge to Wall', 'Glute Bridge', 'Bird Dog', 'Good Morning (unweighted)'],
        focus: ['Hip mobility', 'Posterior chain activation', 'Movement pattern', 'Core stability']
      },
      {
        level: 'Intermediate', 
        description: 'Add load while maintaining perfect hinge pattern',
        exercises: ['Romanian Deadlift', 'Kettlebell Swing', 'Deadlift', 'Single-leg RDL'],
        focus: ['Load progression', 'Unilateral stability', 'Power development', 'Hamstring strength']
      },
      {
        level: 'Advanced',
        description: 'Complex variations and maximal strength development',
        exercises: ['Sumo Deadlift', 'Deficit Deadlift', 'Single-leg Deadlift', 'Snatch-grip Deadlift'],
        focus: ['Maximal strength', 'Advanced variations', 'Speed and power', 'Sport-specific applications']
      }
    ],
    exercises: [
      'Deadlift',
      'Romanian Deadlift',
      'Good Morning',
      'Kettlebell Swing',
      'Hip Thrust',
      'Single-leg Deadlift',
      'Glute Bridge'
    ],
    benefits: [
      'Develops posterior chain strength',
      'Improves hip mobility and flexibility',
      'Prevents lower back injuries',
      'Essential for athletic performance',
      'Builds functional strength',
      'Enhances posture'
    ]
  },
  {
    id: 'push-pattern',
    name: 'Push Pattern',
    description: 'Movement involving pushing objects away from the body. Fundamental for upper body strength and pressing power in horizontal and vertical planes.',
    primaryMuscles: ['Chest', 'Shoulders', 'Triceps', 'Core'],
    keyPrinciples: [
      'Maintain stable base of support',
      'Core engaged throughout movement',
      'Full range of motion',
      'Control both eccentric and concentric phases',
      'Proper scapular movement'
    ],
    formCues: [
      '"Push the floor away from you"',
      '"Keep your body in a straight line"',
      '"Drive through your palms"',
      '"Squeeze your glutes"',
      '"Press in a straight line"'
    ],
    commonMistakes: [
      'Elbow flare too wide (90 degrees)',
      'Sagging hips or piking up',
      'Partial range of motion',
      'Pressing in curved path',
      'Not engaging core properly',
      'Head position (looking up/down)'
    ],
    progressions: [
      {
        level: 'Beginner',
        description: 'Build basic pushing strength and movement pattern',
        exercises: ['Wall Push-up', 'Incline Push-up', 'Knee Push-up', 'Assisted Dip'],
        focus: ['Movement pattern', 'Basic strength', 'Core stability', 'Range of motion']
      },
      {
        level: 'Intermediate',
        description: 'Progress to full bodyweight and add external load',
        exercises: ['Push-up', 'Dip', 'Overhead Press', 'Bench Press'],
        focus: ['Full bodyweight mastery', 'Load progression', 'Stability challenges', 'Power development']
      },
      {
        level: 'Advanced',
        description: 'Complex variations and maximal strength development',
        exercises: ['Handstand Push-up', 'One-arm Push-up', 'Weighted Dips', 'Explosive Push-ups'],
        focus: ['Unilateral strength', 'Explosive power', 'Advanced stability', 'Maximal strength']
      }
    ],
    exercises: [
      'Push-up',
      'Overhead Press',
      'Bench Press',
      'Dip',
      'Handstand Push-up',
      'Incline Press',
      'Pike Push-up'
    ],
    benefits: [
      'Builds upper body pushing strength',
      'Develops shoulder stability',
      'Improves core strength',
      'Enhances functional pressing power',
      'Transfers to daily activities',
      'Builds chest and arm muscle'
    ]
  },
  {
    id: 'pull-pattern',
    name: 'Pull Pattern',
    description: 'Movement involving pulling objects toward the body. Critical for balanced upper body development and postural health.',
    primaryMuscles: ['Lats', 'Rhomboids', 'Middle Traps', 'Rear Delts', 'Biceps'],
    keyPrinciples: [
      'Initiate pull with back muscles, not arms',
      'Squeeze shoulder blades together',
      'Full range of motion (full stretch to full contraction)',
      'Control the negative portion',
      'Maintain neutral spine'
    ],
    formCues: [
      '"Pull with your back, not your arms"',
      '"Squeeze your shoulder blades together"',
      '"Lead with your elbows"',
      '"Think about pulling your elbows to your back pockets"',
      '"Feel the stretch at the bottom"'
    ],
    commonMistakes: [
      'Using arms instead of back muscles',
      'Not achieving full range of motion',
      'Swinging or using momentum',
      'Not squeezing shoulder blades together',
      'Forward head posture',
      'Shrugging shoulders toward ears'
    ],
    progressions: [
      {
        level: 'Beginner',
        description: 'Develop basic pulling strength and back muscle activation',
        exercises: ['Bent-over Row (light)', 'Band Pull-aparts', 'Inverted Row', 'Lat Pulldown'],
        focus: ['Back muscle activation', 'Movement pattern', 'Postural strength', 'Scapular mobility']
      },
      {
        level: 'Intermediate',
        description: 'Progress to bodyweight pulling and heavier loads',
        exercises: ['Pull-up', 'Chin-up', 'Barbell Row', 'T-Bar Row'],
        focus: ['Bodyweight mastery', 'Load progression', 'Vertical pulling', 'Strength development']
      },
      {
        level: 'Advanced',
        description: 'Complex variations and maximal strength development',
        exercises: ['Weighted Pull-ups', 'One-arm Row', 'Muscle-up', 'Wide-grip Pull-ups'],
        focus: ['Weighted progressions', 'Unilateral strength', 'Advanced movements', 'Power development']
      }
    ],
    exercises: [
      'Pull-up',
      'Chin-up',
      'Bent-over Row',
      'Lat Pulldown',
      'Face Pull',
      'Inverted Row',
      'Single-arm Row'
    ],
    benefits: [
      'Builds back and pulling strength',
      'Improves posture and shoulder health',
      'Balances pushing movements',
      'Develops grip strength',
      'Reduces injury risk',
      'Enhances athletic performance'
    ]
  },
  {
    id: 'carry-pattern',
    name: 'Carry Pattern', 
    description: 'Loaded carrying movements that challenge grip, core stability, and total-body strength. Essential for functional strength and real-world application.',
    primaryMuscles: ['Core', 'Traps', 'Forearms', 'Glutes', 'Shoulders'],
    keyPrinciples: [
      'Maintain upright posture throughout',
      'Engage core to prevent lateral flexion',
      'Keep shoulders back and down',
      'Grip strength endurance',
      'Controlled breathing under load'
    ],
    formCues: [
      '"Stand tall like a soldier"',
      '"Don\'t let the weight pull you sideways"',
      '"Squeeze the handles tight"',
      '"Big steps, don\'t shuffle"',
      '"Breathe steadily"'
    ],
    commonMistakes: [
      'Leaning to one side with unilateral carries',
      'Shrugging shoulders toward ears',
      'Taking small shuffling steps',
      'Holding breath during carry',
      'Forward head posture',
      'Allowing spine to flex or extend excessively'
    ],
    progressions: [
      {
        level: 'Beginner',
        description: 'Build basic carrying capacity and postural strength',
        exercises: ['Farmers Walk (light)', 'Suitcase Carry (light)', 'Front-loaded Carry', 'Briefcase Carry'],
        focus: ['Postural endurance', 'Basic grip strength', 'Core stability', 'Movement quality']
      },
      {
        level: 'Intermediate',
        description: 'Increase load and vary carrying positions',
        exercises: ['Heavy Farmers Walk', 'Single-arm Carry', 'Overhead Carry', 'Mixed Carries'],
        focus: ['Load progression', 'Unilateral challenges', 'Stability demands', 'Work capacity']
      },
      {
        level: 'Advanced',
        description: 'Complex carries and maximal loading',
        exercises: ['Yoke Walk', 'Sandbag Carry', 'Keg Carry', 'Atlas Stone Carry'],
        focus: ['Maximal loads', 'Awkward objects', 'Competition prep', 'Specialized applications']
      }
    ],
    exercises: [
      'Farmers Walk',
      'Suitcase Carry',
      'Front-loaded Carry',
      'Overhead Carry',
      'Mixed Carry',
      'Sandbag Carry',
      'Keg Carry'
    ],
    benefits: [
      'Develops functional strength',
      'Improves grip and forearm strength',
      'Builds core stability and endurance',
      'Enhances postural strength',
      'Real-world strength transfer',
      'Improves work capacity'
    ]
  },
  {
    id: 'rotation-pattern',
    name: 'Rotation Pattern',
    description: 'Movement involving rotation around the body\'s axis. Essential for athletic performance, core strength, and daily functional movements.',
    primaryMuscles: ['Core', 'Obliques', 'Glutes', 'Shoulders'],
    keyPrinciples: [
      'Rotate from core, not just arms',
      'Maintain stable base of support',
      'Control both directions of rotation',
      'Keep spine neutral during rotation',
      'Generate power from hips and core'
    ],
    formCues: [
      '"Rotate from your belly button"',
      '"Keep your hips square"',
      '"Turn your whole torso, not just arms"',
      '"Feel your core working"',
      '"Control the return to center"'
    ],
    commonMistakes: [
      'Rotating only at shoulders, not core',
      'Excessive spinal flexion during rotation',
      'Not controlling the eccentric phase',
      'Using momentum instead of strength',
      'Holding breath during movement',
      'Rotating too far beyond natural range'
    ],
    progressions: [
      {
        level: 'Beginner',
        description: 'Learn proper rotation mechanics and core activation',
        exercises: ['Seated Russian Twist', 'Standing Wood Chop', 'Bird Dog Rotations', 'Dead Bug Variations'],
        focus: ['Movement pattern', 'Core activation', 'Stability', 'Range of motion']
      },
      {
        level: 'Intermediate',
        description: 'Add resistance and dynamic movements',
        exercises: ['Cable Wood Chop', 'Medicine Ball Slams', 'Landmine Rotations', 'Russian Twists with Weight'],
        focus: ['Load progression', 'Power development', 'Dynamic stability', 'Coordination']
      },
      {
        level: 'Advanced',
        description: 'Complex rotational patterns and sport-specific movements',
        exercises: ['Turkish Get-up', 'Rotational Throws', 'Single-arm Overhead Press', 'Windmills'],
        focus: ['Complex patterns', 'Sport-specific power', 'Advanced stability', 'Integration']
      }
    ],
    exercises: [
      'Russian Twist',
      'Wood Chop',
      'Turkish Get-up',
      'Landmine Rotation',
      'Medicine Ball Slam',
      'Windmill',
      'Half-kneeling Chop'
    ],
    benefits: [
      'Develops rotational core strength',
      'Improves athletic performance',
      'Enhances spinal mobility',
      'Builds functional movement patterns',
      'Reduces injury risk',
      'Improves coordination'
    ]
  }
];

export const movementBenefits = [
  'Builds functional movement patterns',
  'Reduces injury risk through proper mechanics',
  'Improves daily activity performance',
  'Creates balanced muscle development',
  'Enhances athletic performance',
  'Develops neuromuscular coordination'
];