export interface WorkoutSchedule {
  id: string;
  date: string; // YYYY-MM-DD format
  workoutId: string;
  workoutType: 'program' | 'exercise' | 'custom';
  workoutName: string;
  status: 'scheduled' | 'completed' | 'skipped' | 'in-progress';
  notes?: string;
  completedAt?: string;
  duration?: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'workout' | 'rest' | 'milestone';
  status?: 'scheduled' | 'completed' | 'skipped';
  color: string;
}

export interface WorkoutWeek {
  weekStart: string;
  workouts: WorkoutSchedule[];
}

export type CalendarView = 'week' | 'month' | 'agenda';