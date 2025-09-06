export type TabType = 'exercises' | 'programs' | 'movements' | 'principles';
export type DifficultyFilter = 'All' | 'Beginner' | 'Intermediate' | 'Advanced';

export interface WorkoutProgress {
  [key: string]: {
    completed: boolean;
    reps?: number;
    weight?: number;
    time?: number;
  };
}

export interface WorkoutHistoryEntry {
  date: string;
  workout: string;
  duration: number;
  exercises: {
    name: string;
    completed: boolean;
    reps?: number;
    weight?: number;
  }[];
}

export interface CustomWorkoutExercise {
  exerciseId: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number;
}

export interface CustomWorkout {
  name: string;
  exercises: CustomWorkoutExercise[];
}