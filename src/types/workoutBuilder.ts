export interface WorkoutTemplate {
  id: string;
  name: string;
  description?: string;
  estimatedDuration: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  targetMuscleGroups: string[];
  exercises: WorkoutExercise[];
  restPeriods: RestPeriod[];
  createdDate: string;
  lastModified: string;
  isPublic?: boolean;
  tags: string[];
}

export interface WorkoutExercise {
  id: string;
  exerciseId: string;
  exerciseName: string;
  order: number;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number; // for time-based exercises
  restTime: number; // seconds
  notes?: string;
  targetRPE?: number;
  alternatives?: string[]; // alternative exercise IDs
  superset?: boolean;
  dropset?: boolean;
}

export interface RestPeriod {
  id: string;
  afterExerciseId: string;
  duration: number; // seconds
  type: 'active' | 'passive';
  activity?: string; // for active rest
}

export interface ExerciseLibraryItem {
  id: string;
  name: string;
  category: string;
  muscleGroups: string[];
  equipment: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  instructions: string[];
  tips?: string[];
  variations?: string[];
  image?: string;
}

export interface DragItem {
  type: 'exercise' | 'rest';
  data: ExerciseLibraryItem | RestPeriod;
  sourceIndex?: number;
}

export interface WorkoutBuilderState {
  currentTemplate: WorkoutTemplate | null;
  exerciseLibrary: ExerciseLibraryItem[];
  isLoading: boolean;
  draggedItem: DragItem | null;
  selectedExercises: WorkoutExercise[];
  filters: {
    category: string;
    muscleGroup: string;
    equipment: string;
    difficulty: string;
  };
}

export interface BuilderAction {
  type: 'ADD_EXERCISE' | 'REMOVE_EXERCISE' | 'REORDER_EXERCISES' | 'UPDATE_EXERCISE' | 
        'SET_TEMPLATE' | 'CLEAR_TEMPLATE' | 'SET_FILTERS' | 'SET_LOADING' | 'SET_DRAG_ITEM';
  payload?: unknown;
}