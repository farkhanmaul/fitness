export interface WorkoutAnalytics {
  totalWorkouts: number;
  totalHours: number;
  averageWorkoutDuration: number;
  workoutsThisWeek: number;
  workoutsThisMonth: number;
  completionRate: number;
  averageRPE: number;
  mostFrequentExercise: string;
  longestStreak: number;
  currentStreak: number;
  workoutsByDay: { [key: string]: number };
  workoutsByMonth: { [key: string]: number };
  progressTrends: ProgressTrend[];
  exerciseFrequency: { [exercise: string]: number };
  rpeHistory: RPEDataPoint[];
}

export interface ProgressTrend {
  exerciseId: string;
  exerciseName: string;
  dataPoints: {
    date: string;
    weight?: number;
    reps: number;
    volume: number; // sets * reps * weight
    rpe?: number;
  }[];
  trendDirection: 'up' | 'down' | 'stable';
  improvementRate: number; // percentage improvement over time period
}

export interface RPEDataPoint {
  date: string;
  exerciseName: string;
  rpe: number;
  weight?: number;
  reps: number;
}

export interface AnalyticsChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension?: number;
  }[];
}

export interface WorkoutHeatmapData {
  date: string;
  count: number;
  level: number; // 0-4 intensity level for heatmap coloring
}

export interface ExerciseVolumeData {
  exerciseName: string;
  totalVolume: number;
  sessionsCount: number;
  averageRPE: number;
  progressRate: number;
}

export type AnalyticsTimeframe = '7d' | '30d' | '3m' | '6m' | '1y' | 'all';
export type ChartType = 'line' | 'bar' | 'area' | 'heatmap' | 'pie';

export interface AnalyticsFilter {
  timeframe: AnalyticsTimeframe;
  exerciseTypes?: string[];
  muscleGroups?: string[];
  difficultyLevels?: string[];
}