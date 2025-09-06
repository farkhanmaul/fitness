export interface TrainingPrinciple {
  id: string;
  name: string;
  category: 'Progressive Overload' | 'Periodization' | 'Recovery' | 'Adaptation' | 'Programming' | 'Nutrition';
  description: string;
  keyPoints: string[];
  application: string[];
  examples: string[];
  commonMistakes: string[];
  relatedPrinciples: string[];
}

export const trainingPrinciples: TrainingPrinciple[] = [
  {
    id: 'progressive-overload',
    name: 'Progressive Overload',
    category: 'Progressive Overload',
    description: 'The fundamental principle that to continue making gains, you must gradually increase the demands placed on your body over time.',
    keyPoints: [
      'Gradual increase in training stimulus',
      'Can be achieved through multiple variables',
      'Must be consistent and systematic',
      'Forms the foundation of all training adaptations',
      'Prevents plateaus and promotes continuous improvement'
    ],
    application: [
      'Increase weight by 2.5-5lbs per week for beginners',
      'Add 1-2 reps per set when possible',
      'Decrease rest periods between sets',
      'Increase training volume (sets x reps)',
      'Improve range of motion or time under tension',
      'Increase training frequency'
    ],
    examples: [
      'Week 1: Bench Press 3x8 @ 135lbs',
      'Week 2: Bench Press 3x8 @ 140lbs',
      'Week 3: Bench Press 3x9 @ 140lbs',
      'Week 4: Bench Press 3x8 @ 145lbs',
      'Bodyweight: Week 1: 10 push-ups, Week 2: 12 push-ups',
      'Running: Week 1: 2 miles, Week 2: 2.2 miles'
    ],
    commonMistakes: [
      'Increasing load too quickly (more than 10% per week)',
      'Only focusing on weight, ignoring other variables',
      'Not tracking progress properly',
      'Skipping deload weeks',
      'Adding volume and intensity simultaneously',
      'Ignoring form degradation for heavier weights'
    ],
    relatedPrinciples: ['Specificity', 'Recovery', 'Individual Variation']
  },
  {
    id: 'specificity',
    name: 'Specificity (SAID Principle)',
    category: 'Adaptation',
    description: 'Specific Adaptations to Imposed Demands - your body adapts specifically to the type of stress you place on it.',
    keyPoints: [
      'Adaptations are specific to the training stimulus',
      'Energy system specificity is crucial',
      'Movement pattern specificity matters',
      'Velocity and load specificity applies',
      'Training must match your goals'
    ],
    application: [
      'Train the movement patterns you want to improve',
      'Use similar energy systems to your sport/goal',
      'Practice at speeds relevant to your activity',
      'Include sport-specific skills in training',
      'Match training loads to performance demands'
    ],
    examples: [
      'Marathon runners focus on aerobic base building',
      'Powerlifters train the squat, bench, deadlift specifically',
      'Swimmers spend most time in the pool',
      'Basketball players practice jumping and quick direction changes',
      'CrossFit athletes train varied, high-intensity movements'
    ],
    commonMistakes: [
      'Training general fitness when specific goals exist',
      'Only training in one rep range for strength goals',
      'Ignoring movement quality for complex skills',
      'Not practicing competition conditions',
      'Focusing on weaknesses while neglecting strengths'
    ],
    relatedPrinciples: ['Progressive Overload', 'Individual Variation']
  },
  {
    id: 'recovery',
    name: 'Recovery and Supercompensation',
    category: 'Recovery',
    description: 'Adaptations occur during rest periods. Proper recovery allows the body to rebuild stronger than before.',
    keyPoints: [
      'Growth happens during rest, not training',
      'Supercompensation requires adequate recovery time',
      'Sleep is the most important recovery tool',
      'Nutrition timing affects recovery',
      'Active recovery can enhance adaptation'
    ],
    application: [
      'Get 7-9 hours of quality sleep nightly',
      'Plan rest days between intense sessions',
      'Use active recovery (walking, light movement)',
      'Manage life stress to improve training recovery',
      'Time post-workout nutrition within 2 hours',
      'Listen to your body\'s fatigue signals'
    ],
    examples: [
      'Sleep 8+ hours for optimal hormone production',
      'Take 48-72 hours between training same muscle groups',
      'Light yoga or walking on off days',
      'Post-workout meal with protein and carbs',
      'Reduce training volume during high life stress'
    ],
    commonMistakes: [
      'Training through fatigue without proper rest',
      'Sleeping less than 6 hours regularly',
      'Doing high-intensity work every day',
      'Ignoring stress from life outside the gym',
      'Not eating enough to support recovery',
      'Confusing soreness with effective training'
    ],
    relatedPrinciples: ['Progressive Overload', 'Individual Variation']
  },
  {
    id: 'periodization',
    name: 'Periodization',
    category: 'Periodization',
    description: 'Systematic planning of training that varies intensity, volume, and specificity over time to optimize performance and prevent overtraining.',
    keyPoints: [
      'Varies training stimulus over time',
      'Prevents staleness and plateaus',
      'Peaks performance for specific times',
      'Manages fatigue accumulation',
      'Balances stress and recovery cycles'
    ],
    application: [
      'Plan training in mesocycles (4-6 weeks)',
      'Vary intensity and volume inversely',
      'Include deload weeks every 4-6 weeks',
      'Peak for competitions or testing',
      'Use different training phases (hypertrophy, strength, power)',
      'Adjust training based on life circumstances'
    ],
    examples: [
      'Block 1: High volume, moderate intensity (hypertrophy)',
      'Block 2: Moderate volume, high intensity (strength)',
      'Block 3: Low volume, very high intensity (peaking)',
      'Week 1-3: Build, Week 4: Deload (reduce volume 40-60%)',
      'Off-season: General fitness, In-season: Sport-specific'
    ],
    commonMistakes: [
      'Training at high intensity year-round',
      'Never taking deload weeks',
      'Not planning peaks for important events',
      'Randomly changing programs without purpose',
      'Ignoring volume-intensity relationship'
    ],
    relatedPrinciples: ['Progressive Overload', 'Recovery', 'Individual Variation']
  },
  {
    id: 'individual-variation',
    name: 'Individual Variation',
    category: 'Programming',
    description: 'Everyone responds differently to training based on genetics, experience, lifestyle, and recovery capacity.',
    keyPoints: [
      'No single program works for everyone',
      'Recovery needs vary significantly',
      'Training age affects adaptation rate',
      'Genetics influence response to different stimuli',
      'Lifestyle factors impact training capacity'
    ],
    application: [
      'Start conservative and adjust based on response',
      'Track individual metrics (sleep, stress, performance)',
      'Modify programs based on life circumstances',
      'Consider training history when programming',
      'Account for individual strengths and weaknesses',
      'Adjust recovery needs based on age and experience'
    ],
    examples: [
      'Beginner: Gains with 3x/week, Advanced: Needs 5-6x/week',
      'Some respond better to higher volume, others to higher intensity',
      'Stress from work may require reduced training load',
      'Older athletes need more recovery time',
      'Different body types excel at different exercises'
    ],
    commonMistakes: [
      'Following programs without modification',
      'Comparing your progress to others',
      'Not adjusting for life stress or age',
      'Ignoring individual strengths and weaknesses',
      'Using same program regardless of experience level'
    ],
    relatedPrinciples: ['Recovery', 'Progressive Overload', 'Periodization']
  },
  {
    id: 'reversibility',
    name: 'Reversibility (Use It or Lose It)',
    category: 'Adaptation',
    description: 'Training adaptations are reversible. When you stop training, you lose the adaptations you gained.',
    keyPoints: [
      'Adaptations fade without continued stimulus',
      'Different qualities fade at different rates',
      'Complete cessation causes faster decline',
      'Maintenance requires less volume than building',
      'Some adaptations are more resistant to loss'
    ],
    application: [
      'Plan maintenance phases during breaks',
      'Use minimum effective dose during busy periods',
      'Prioritize movement quality during low-volume phases',
      'Plan brief training sessions over complete breaks',
      'Focus on maintaining strength and movement patterns'
    ],
    examples: [
      'Strength decreases 10-15% after 2 weeks off',
      'Cardio fitness declines faster than strength',
      'Skill-based adaptations fade quickly without practice',
      '1-2 sessions/week can maintain most adaptations',
      'Movement quality deteriorates without regular practice'
    ],
    commonMistakes: [
      'Taking extended breaks without maintenance training',
      'Assuming you can quickly return to previous levels',
      'Not planning for life circumstances that interrupt training',
      'All-or-nothing mentality (train hard or not at all)',
      'Ignoring the importance of movement maintenance'
    ],
    relatedPrinciples: ['Progressive Overload', 'Specificity']
  },
  {
    id: 'minimum-effective-dose',
    name: 'Minimum Effective Dose',
    category: 'Programming',
    description: 'The smallest amount of training that produces the desired adaptation. More is not always better.',
    keyPoints: [
      'Quality over quantity in training',
      'Excessive volume can impair recovery',
      'Efficiency allows for other life priorities',
      'Individual minimum dose varies',
      'Focus on highest-impact activities'
    ],
    application: [
      'Start with basic compound movements',
      'Use 80/20 rule - focus on exercises with biggest impact',
      'Prioritize consistency over perfection',
      'Begin with 2-3 training days per week',
      'Focus on progressive overload over training volume',
      'Allow adequate recovery between sessions'
    ],
    examples: [
      '2-3 full-body sessions/week for beginners',
      '3-5 compound movements per session',
      '45-60 minutes including warm-up and cool-down',
      'Strength: 3x5 major lifts, 2-3x/week',
      'Cardio: 20-30 minutes, 2-3x/week'
    ],
    commonMistakes: [
      'Thinking more training is always better',
      'Adding volume before mastering basics',
      'Training through fatigue consistently',
      'Copying advanced athlete programs as a beginner',
      'Not allowing time for adaptation to occur'
    ],
    relatedPrinciples: ['Recovery', 'Individual Variation']
  },
  {
    id: 'nutrition-timing',
    name: 'Nutrition for Training',
    category: 'Nutrition',
    description: 'Proper nutrition timing and composition support training adaptations, performance, and recovery.',
    keyPoints: [
      'Fuel performance and recovery through food',
      'Timing matters for optimization',
      'Protein intake supports muscle development',
      'Carbohydrates fuel high-intensity exercise',
      'Hydration affects performance significantly'
    ],
    application: [
      'Eat protein throughout the day (20-30g per meal)',
      'Consume carbs around training sessions',
      'Post-workout meal within 2 hours of training',
      'Stay hydrated before, during, and after exercise',
      'Adjust calories to match training demands and goals'
    ],
    examples: [
      'Pre-workout: Banana and coffee 30-60 min before',
      'Post-workout: Protein shake and carbs within 30 min',
      'Daily: 1g protein per lb bodyweight',
      'Training days: More carbs, recovery days: more fats',
      'Hydration: Clear urine as hydration indicator'
    ],
    commonMistakes: [
      'Training fasted when performance matters',
      'Not eating enough to support training demands',
      'Ignoring post-workout nutrition window',
      'Inadequate protein intake for muscle building',
      'Dehydration affecting performance and recovery'
    ],
    relatedPrinciples: ['Recovery', 'Individual Variation']
  }
];

export const principleCategories = [
  'Progressive Overload',
  'Periodization', 
  'Recovery',
  'Adaptation',
  'Programming',
  'Nutrition'
];

export const trainingTips = [
  'Start with bodyweight movements before adding external load',
  'Master form before increasing intensity',
  'Track your workouts to ensure progressive overload',
  'Listen to your body and adjust training accordingly',
  'Consistency beats perfection every time',
  'Focus on compound movements for maximum benefit',
  'Plan deload weeks to prevent overtraining',
  'Prioritize sleep and nutrition for optimal results'
];