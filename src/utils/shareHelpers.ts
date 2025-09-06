import { Exercise } from '@/data/exercises';
import { WorkoutProgram } from '@/data/programs';

export function generateWorkoutShareLink(workout: WorkoutProgram | Exercise, baseUrl: string = '') {
  const url = new URL(baseUrl || window.location.origin);
  url.searchParams.set('shared', 'true');
  url.searchParams.set('type', 'workout' in workout ? 'program' : 'exercise');
  url.searchParams.set('id', workout.id);
  return url.toString();
}

export function generateWorkoutPDF(workout: WorkoutProgram) {
  return `
# ${workout.name}

**Category:** ${workout.category}
**Difficulty:** ${workout.difficulty}
**Duration:** ${workout.duration}

## Description
${workout.description}

## Workouts

${workout.workouts.map((w, index) => `
### Day ${w.day}: ${w.name}
**Type:** ${w.type}
**Duration:** ${w.duration}

**Exercises:**
${w.exercises.map(ex => `- ${ex.name}${ex.reps ? ` - ${ex.reps}` : ''}${ex.weight ? ` @ ${ex.weight}` : ''}${ex.duration ? ` for ${ex.duration}` : ''}${ex.distance ? ` - ${ex.distance}` : ''}`).join('\n')}

${w.notes ? `**Notes:** ${w.notes}` : ''}
`).join('\n')}

${workout.notes ? `## Program Notes\n${workout.notes}` : ''}

---
Generated from Complete Fitness Guide
  `;
}

export function generateExercisePDF(exercise: Exercise) {
  return `
# ${exercise.name}

**Category:** ${exercise.category}
**Difficulty:** ${exercise.difficulty}
**Equipment:** ${exercise.equipment.join(', ')}

## Description
${exercise.description}

## Primary Muscles
${exercise.primaryMuscles.join(', ')}

${exercise.secondaryMuscles && exercise.secondaryMuscles.length > 0 ? `## Secondary Muscles\n${exercise.secondaryMuscles.join(', ')}` : ''}

## Instructions
${exercise.instructions.map((instruction, index) => `${index + 1}. ${instruction}`).join('\n')}

## Tips
${exercise.tips.map(tip => `• ${tip}`).join('\n')}

${exercise.variations && exercise.variations.length > 0 ? `## Variations\n${exercise.variations.map(variation => `• ${variation}`).join('\n')}` : ''}

${exercise.progressions && exercise.progressions.length > 0 ? `## Progressions\n${exercise.progressions.map((prog, index) => `
### ${index + 1}. ${prog.name} (${prog.difficulty})
${prog.description}

**Instructions:**
${prog.instructions.map(instruction => `• ${instruction}`).join('\n')}
`).join('\n')}` : ''}

---
Generated from Complete Fitness Guide
  `;
}

export async function shareWorkout(workout: WorkoutProgram | Exercise, type: 'link' | 'text' | 'pdf' = 'link') {
  if (!navigator.share && type === 'link') {
    // Fallback: copy to clipboard
    const link = generateWorkoutShareLink(workout);
    await navigator.clipboard.writeText(link);
    return { success: true, method: 'clipboard' };
  }

  try {
    let shareData: ShareData = {
      title: workout.name,
      text: workout.description,
    };

    if (type === 'link') {
      shareData.url = generateWorkoutShareLink(workout);
    } else if (type === 'text') {
      const isProgram = 'workouts' in workout;
      shareData.text = isProgram ? generateWorkoutPDF(workout) : generateExercisePDF(workout);
    }

    if (navigator.share) {
      await navigator.share(shareData);
      return { success: true, method: 'native' };
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(shareData.text || shareData.url || '');
      return { success: true, method: 'clipboard' };
    }
  } catch (error) {
    console.error('Error sharing:', error);
    return { success: false, error };
  }
}

export function downloadWorkoutPDF(workout: WorkoutProgram | Exercise) {
  const isProgram = 'workouts' in workout;
  const content = isProgram ? generateWorkoutPDF(workout) : generateExercisePDF(workout);
  
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${workout.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}