import { useState, useEffect, useCallback } from 'react';

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

export interface CustomWorkout {
  name: string;
  exercises: {
    exerciseId: string;
    sets: number;
    reps: number;
    weight?: number;
    duration?: number;
  }[];
}

export function useWorkoutManager() {
  const [workoutTimer, setWorkoutTimer] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [workoutProgress, setWorkoutProgress] = useState<WorkoutProgress>({});
  const [currentWorkout, setCurrentWorkout] = useState<string | null>(null);
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutHistoryEntry[]>([]);
  const [customWorkout, setCustomWorkout] = useState<CustomWorkout>({
    name: '',
    exercises: []
  });

  // Load workout history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('fitness-workout-history');
    if (savedHistory) {
      setWorkoutHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save workout history to localStorage
  useEffect(() => {
    if (workoutHistory.length > 0) {
      localStorage.setItem('fitness-workout-history', JSON.stringify(workoutHistory));
    }
  }, [workoutHistory]);

  // Timer functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setWorkoutTimer(timer => timer + 1);
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isTimerRunning]);

  const startTimer = useCallback(() => {
    setIsTimerRunning(true);
  }, []);

  const pauseTimer = useCallback(() => {
    setIsTimerRunning(false);
  }, []);

  const resetTimer = useCallback(() => {
    setWorkoutTimer(0);
    setIsTimerRunning(false);
  }, []);

  const toggleTimer = useCallback(() => {
    setIsTimerRunning(prev => !prev);
  }, []);

  const updateProgress = useCallback((exerciseId: string, progress: Partial<WorkoutProgress[string]>) => {
    setWorkoutProgress(prev => ({
      ...prev,
      [exerciseId]: {
        ...prev[exerciseId],
        ...progress
      }
    }));
  }, []);

  const completeWorkout = useCallback((programName: string) => {
    const completedExercises = Object.entries(workoutProgress)
      .filter(([, progress]) => progress.completed)
      .map(([exerciseId, progress]) => ({
        name: exerciseId, // You might want to map this to exercise names
        completed: progress.completed,
        reps: progress.reps,
        weight: progress.weight
      }));

    const newWorkoutEntry: WorkoutHistoryEntry = {
      date: new Date().toISOString().split('T')[0],
      workout: programName,
      duration: workoutTimer,
      exercises: completedExercises
    };

    const updatedHistory = [newWorkoutEntry, ...workoutHistory].slice(0, 50); // Keep last 50 workouts
    setWorkoutHistory(updatedHistory);
    
    // Reset workout state
    setCurrentWorkout(null);
    setWorkoutProgress({});
    resetTimer();
  }, [workoutProgress, workoutTimer, workoutHistory, resetTimer]);

  // Calculate stats
  const totalWorkouts = workoutHistory.length;
  const totalHours = Math.round(workoutHistory.reduce((sum, w) => sum + w.duration, 0) / 3600 * 10) / 10;
  const completionRate = workoutHistory.length > 0 
    ? Math.round(workoutHistory.reduce((sum, w) => sum + (w.exercises.filter(e => e.completed).length / w.exercises.length), 0) / workoutHistory.length * 100)
    : 0;

  return {
    // State
    workoutTimer,
    isTimerRunning,
    workoutProgress,
    currentWorkout,
    workoutHistory,
    customWorkout,
    // Actions
    startTimer,
    pauseTimer,
    resetTimer,
    toggleTimer,
    updateProgress,
    completeWorkout,
    setCurrentWorkout,
    setCustomWorkout,
    // Computed values
    totalWorkouts,
    totalHours,
    completionRate,
  };
}