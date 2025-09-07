export interface ExerciseFormTip {
  id: string;
  title: string;
  description: string;
  type: 'cue' | 'common-mistake' | 'safety' | 'progression';
  priority: 'high' | 'medium' | 'low';
}

export interface ExerciseValidation {
  field: string;
  rule: 'required' | 'min' | 'max' | 'pattern' | 'custom';
  value?: number | string;
  message: string;
}

export interface ExerciseFormData {
  sets: number;
  reps: number;
  weight?: number;
  duration?: number;
  distance?: number;
  restTime?: number;
  notes?: string;
}

export interface ExerciseFormErrors {
  [key: string]: string;
}