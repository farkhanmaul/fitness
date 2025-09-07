import { ExerciseFormTip } from '@/types/exercise';

export const exerciseTips: { [exerciseName: string]: ExerciseFormTip[] } = {
  'Push-ups': [
    {
      id: 'pushup-1',
      title: 'Keep Core Tight',
      description: 'Maintain a straight line from head to heels by engaging your core throughout the movement.',
      type: 'cue',
      priority: 'high'
    },
    {
      id: 'pushup-2',
      title: 'Full Range of Motion',
      description: 'Lower your chest until it nearly touches the ground, then push up to full arm extension.',
      type: 'cue',
      priority: 'high'
    },
    {
      id: 'pushup-3',
      title: 'Avoid Sagging Hips',
      description: 'Don\'t let your hips sag or pike up. This reduces effectiveness and can strain your lower back.',
      type: 'common-mistake',
      priority: 'medium'
    }
  ],
  'Squats': [
    {
      id: 'squat-1',
      title: 'Knees Track Over Toes',
      description: 'Keep your knees aligned with your toes throughout the movement to prevent injury.',
      type: 'safety',
      priority: 'high'
    },
    {
      id: 'squat-2',
      title: 'Hip Hinge First',
      description: 'Initiate the movement by pushing your hips back, not by bending your knees first.',
      type: 'cue',
      priority: 'high'
    },
    {
      id: 'squat-3',
      title: 'Chest Up, Core Engaged',
      description: 'Keep your chest up and core tight to maintain proper spinal alignment.',
      type: 'cue',
      priority: 'medium'
    }
  ],
  'Deadlifts': [
    {
      id: 'deadlift-1',
      title: 'Keep Bar Close',
      description: 'The bar should stay close to your body throughout the entire movement.',
      type: 'cue',
      priority: 'high'
    },
    {
      id: 'deadlift-2',
      title: 'Neutral Spine',
      description: 'Maintain a neutral spine position - avoid rounding your back.',
      type: 'safety',
      priority: 'high'
    },
    {
      id: 'deadlift-3',
      title: 'Drive Through Heels',
      description: 'Push through your heels and engage your glutes to lift the weight.',
      type: 'cue',
      priority: 'medium'
    }
  ],
  'Pull-ups': [
    {
      id: 'pullup-1',
      title: 'Full Hang Position',
      description: 'Start from a full hang with arms extended and shoulders engaged.',
      type: 'cue',
      priority: 'high'
    },
    {
      id: 'pullup-2',
      title: 'Pull with Your Back',
      description: 'Focus on pulling with your back muscles, not just your arms.',
      type: 'cue',
      priority: 'medium'
    },
    {
      id: 'pullup-3',
      title: 'Controlled Descent',
      description: 'Lower yourself slowly and controlled - don\'t just drop down.',
      type: 'cue',
      priority: 'medium'
    }
  ],
  'Burpees': [
    {
      id: 'burpee-1',
      title: 'Land Softly',
      description: 'Land softly on the balls of your feet when jumping up and down.',
      type: 'safety',
      priority: 'high'
    },
    {
      id: 'burpee-2',
      title: 'Step Back Option',
      description: 'If you\'re a beginner, step back instead of jumping into plank position.',
      type: 'progression',
      priority: 'medium'
    },
    {
      id: 'burpee-3',
      title: 'Maintain Rhythm',
      description: 'Find a sustainable rhythm rather than rushing through the movement.',
      type: 'cue',
      priority: 'medium'
    }
  ],
  'Planks': [
    {
      id: 'plank-1',
      title: 'Straight Line',
      description: 'Maintain a straight line from your head to your heels.',
      type: 'cue',
      priority: 'high'
    },
    {
      id: 'plank-2',
      title: 'Breathe Normally',
      description: 'Don\'t hold your breath - maintain steady breathing throughout.',
      type: 'cue',
      priority: 'medium'
    },
    {
      id: 'plank-3',
      title: 'Start Small',
      description: 'Begin with 15-30 second holds and gradually increase time.',
      type: 'progression',
      priority: 'low'
    }
  ],
  'Mountain Climbers': [
    {
      id: 'mountain-1',
      title: 'Strong Plank Position',
      description: 'Maintain a strong plank position with hands directly under shoulders.',
      type: 'cue',
      priority: 'high'
    },
    {
      id: 'mountain-2',
      title: 'Knee to Chest',
      description: 'Drive your knees towards your chest, not just up and down.',
      type: 'cue',
      priority: 'medium'
    },
    {
      id: 'mountain-3',
      title: 'Control the Speed',
      description: 'Focus on control and proper form rather than speed.',
      type: 'common-mistake',
      priority: 'medium'
    }
  ],
  'Lunges': [
    {
      id: 'lunge-1',
      title: 'Step Out Wide',
      description: 'Take a large enough step to create 90-degree angles at both knees.',
      type: 'cue',
      priority: 'high'
    },
    {
      id: 'lunge-2',
      title: 'Control the Descent',
      description: 'Lower slowly and control the movement - don\'t crash down.',
      type: 'safety',
      priority: 'medium'
    }
  ],
  'Jumping Jacks': [
    {
      id: 'jj-1',
      title: 'Land on Balls of Feet',
      description: 'Land softly on the balls of your feet to reduce impact.',
      type: 'safety',
      priority: 'high'
    },
    {
      id: 'jj-2',
      title: 'Full Range of Motion',
      description: 'Bring arms all the way up and legs wide for maximum benefit.',
      type: 'cue',
      priority: 'medium'
    }
  ],
  'High Knees': [
    {
      id: 'hk-1',
      title: 'Knee to Hip Height',
      description: 'Drive your knees up to at least hip height for proper form.',
      type: 'cue',
      priority: 'high'
    },
    {
      id: 'hk-2',
      title: 'Stay on Balls of Feet',
      description: 'Stay light on your feet and avoid flat-footed landings.',
      type: 'cue',
      priority: 'medium'
    }
  ],
  'Sit-ups': [
    {
      id: 'situp-1',
      title: 'Avoid Neck Strain',
      description: 'Don\'t pull on your neck. Keep your chin slightly tucked.',
      type: 'safety',
      priority: 'high'
    },
    {
      id: 'situp-2',
      title: 'Control the Movement',
      description: 'Move slowly and controlled, don\'t use momentum.',
      type: 'cue',
      priority: 'medium'
    }
  ],
  'Bicycle Crunches': [
    {
      id: 'bicycle-1',
      title: 'Don\'t Rush',
      description: 'Move slowly to maintain proper form and core engagement.',
      type: 'common-mistake',
      priority: 'high'
    },
    {
      id: 'bicycle-2',
      title: 'Opposite Elbow to Knee',
      description: 'Focus on bringing opposite elbow toward opposite knee.',
      type: 'cue',
      priority: 'medium'
    }
  ]
};

export function getExerciseTips(exerciseName: string): ExerciseFormTip[] {
  return exerciseTips[exerciseName] || [];
}

export function getTipsByType(exerciseName: string, type: ExerciseFormTip['type']): ExerciseFormTip[] {
  const tips = getExerciseTips(exerciseName);
  return tips.filter(tip => tip.type === type);
}

export function getHighPriorityTips(exerciseName: string): ExerciseFormTip[] {
  const tips = getExerciseTips(exerciseName);
  return tips.filter(tip => tip.priority === 'high');
}