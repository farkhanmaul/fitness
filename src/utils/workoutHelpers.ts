import { WorkoutHistoryEntry } from '@/types';

export function calculateWorkoutStats(history: WorkoutHistoryEntry[]) {
  const totalWorkouts = history.length;
  const totalHours = Math.round(
    history.reduce((sum, workout) => sum + workout.duration, 0) / 3600 * 10
  ) / 10;
  
  const completionRate = history.length > 0 
    ? Math.round(
        history.reduce((sum, workout) => {
          const exerciseCompletionRate = workout.exercises.filter(e => e.completed).length / workout.exercises.length;
          return sum + exerciseCompletionRate;
        }, 0) / history.length * 100
      )
    : 0;

  return {
    totalWorkouts,
    totalHours,
    completionRate
  };
}

export function generateWorkoutId(): string {
  return `custom-${Date.now()}`;
}

export function formatWorkoutDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}