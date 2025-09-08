export const bodyParts = [
  'Tubuh Bagian Atas',
  'Tubuh Bagian Bawah', 
  'Core',
  'Seluruh Tubuh',
  'Kardio'
] as const;

export const muscleFocus = [
  // Upper Body
  'Dada',
  'Punggung',
  'Bahu', 
  'Lengan',
  'Triceps',
  'Biceps',
  
  // Lower Body
  'Kaki',
  'Quadriceps',
  'Hamstring',
  'Glutes',
  'Betis',
  
  // Core
  'Perut',
  'Oblique',
  'Punggung Bawah',
  
  // Full Body
  'Gerakan Fungsional',
  'Daya',
  'Daya Tahan'
] as const;

export const workoutGoals = [
  'Kekuatan',
  'Pembentukan Otot',
  'Penurunan Lemak',
  'Daya Tahan',
  'Daya',
  'Fleksibilitas',
  'Performa Olahraga'
] as const;

export type BodyPart = typeof bodyParts[number];
export type MuscleFocus = typeof muscleFocus[number]; 
export type WorkoutGoal = typeof workoutGoals[number];