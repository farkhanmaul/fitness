import { ExerciseFormData, ExerciseFormErrors, ExerciseValidation } from '@/types/exercise';

export const exerciseValidationRules: { [key: string]: ExerciseValidation[] } = {
  sets: [
    { field: 'sets', rule: 'required', message: 'Sets are required' },
    { field: 'sets', rule: 'min', value: 1, message: 'Sets must be at least 1' },
    { field: 'sets', rule: 'max', value: 20, message: 'Sets cannot exceed 20' }
  ],
  reps: [
    { field: 'reps', rule: 'required', message: 'Reps are required' },
    { field: 'reps', rule: 'min', value: 1, message: 'Reps must be at least 1' },
    { field: 'reps', rule: 'max', value: 200, message: 'Reps cannot exceed 200' }
  ],
  weight: [
    { field: 'weight', rule: 'min', value: 0, message: 'Weight cannot be negative' },
    { field: 'weight', rule: 'max', value: 1000, message: 'Weight cannot exceed 1000kg' }
  ],
  duration: [
    { field: 'duration', rule: 'min', value: 1, message: 'Duration must be at least 1 second' },
    { field: 'duration', rule: 'max', value: 7200, message: 'Duration cannot exceed 2 hours' }
  ],
  distance: [
    { field: 'distance', rule: 'min', value: 0.1, message: 'Distance must be at least 0.1' },
    { field: 'distance', rule: 'max', value: 200, message: 'Distance cannot exceed 200km' }
  ],
  restTime: [
    { field: 'restTime', rule: 'min', value: 10, message: 'Rest time must be at least 10 seconds' },
    { field: 'restTime', rule: 'max', value: 600, message: 'Rest time cannot exceed 10 minutes' }
  ]
};

export function validateExerciseForm(data: ExerciseFormData): ExerciseFormErrors {
  const errors: ExerciseFormErrors = {};

  Object.entries(data).forEach(([field, value]) => {
    if (value === undefined || value === null) return;

    const rules = exerciseValidationRules[field];
    if (!rules) return;

    rules.forEach(rule => {
      switch (rule.rule) {
        case 'required':
          if (value === '' || value === 0) {
            errors[field] = rule.message;
          }
          break;
        case 'min':
          if (typeof value === 'number' && value < (rule.value as number)) {
            errors[field] = rule.message;
          }
          break;
        case 'max':
          if (typeof value === 'number' && value > (rule.value as number)) {
            errors[field] = rule.message;
          }
          break;
        case 'pattern':
          if (typeof value === 'string' && rule.value) {
            const regex = new RegExp(rule.value as string);
            if (!regex.test(value)) {
              errors[field] = rule.message;
            }
          }
          break;
      }
    });
  });

  return errors;
}

export function getFieldValidationMessage(field: string, value: unknown): string | null {
  const rules = exerciseValidationRules[field];
  if (!rules || value === undefined || value === null) return null;

  for (const rule of rules) {
    switch (rule.rule) {
      case 'required':
        if (value === '' || value === 0) return rule.message;
        break;
      case 'min':
        if (typeof value === 'number' && value < (rule.value as number)) return rule.message;
        break;
      case 'max':
        if (typeof value === 'number' && value > (rule.value as number)) return rule.message;
        break;
    }
  }

  return null;
}