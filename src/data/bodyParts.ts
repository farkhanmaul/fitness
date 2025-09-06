export const bodyParts = [
  'Upper Body',
  'Lower Body', 
  'Core',
  'Full Body',
  'Cardio'
] as const;

export const muscleFocus = [
  // Upper Body
  'Chest',
  'Back',
  'Shoulders', 
  'Arms',
  'Triceps',
  'Biceps',
  
  // Lower Body
  'Legs',
  'Quadriceps',
  'Hamstrings',
  'Glutes',
  'Calves',
  
  // Core
  'Abs',
  'Obliques',
  'Lower Back',
  
  // Full Body
  'Functional Movement',
  'Power',
  'Endurance'
] as const;

export const workoutGoals = [
  'Strength',
  'Muscle Building',
  'Fat Loss',
  'Endurance',
  'Power',
  'Flexibility',
  'Sport Performance'
] as const;

export type BodyPart = typeof bodyParts[number];
export type MuscleFocus = typeof muscleFocus[number]; 
export type WorkoutGoal = typeof workoutGoals[number];