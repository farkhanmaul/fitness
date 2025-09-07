import { useState, useEffect } from 'react';
import { WorkoutSchedule } from '@/types/calendar';
import { formatDate } from '@/utils/dateHelpers';

export function useWorkoutSchedule() {
  const [schedule, setSchedule] = useState<WorkoutSchedule[]>([]);

  useEffect(() => {
    const savedSchedule = localStorage.getItem('fitness-schedule');
    if (savedSchedule) {
      setSchedule(JSON.parse(savedSchedule));
    }
  }, []);

  const saveSchedule = (newSchedule: WorkoutSchedule[]) => {
    setSchedule(newSchedule);
    localStorage.setItem('fitness-schedule', JSON.stringify(newSchedule));
  };

  const addWorkout = (workout: Omit<WorkoutSchedule, 'id'>) => {
    const newWorkout: WorkoutSchedule = {
      ...workout,
      id: `schedule-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    saveSchedule([...schedule, newWorkout]);
  };

  const updateWorkout = (id: string, updates: Partial<WorkoutSchedule>) => {
    const updatedSchedule = schedule.map(workout =>
      workout.id === id ? { ...workout, ...updates } : workout
    );
    saveSchedule(updatedSchedule);
  };

  const deleteWorkout = (id: string) => {
    const updatedSchedule = schedule.filter(workout => workout.id !== id);
    saveSchedule(updatedSchedule);
  };

  const completeWorkout = (id: string, duration?: number) => {
    updateWorkout(id, {
      status: 'completed',
      completedAt: new Date().toISOString(),
      duration
    });
  };

  const skipWorkout = (id: string, notes?: string) => {
    updateWorkout(id, {
      status: 'skipped',
      notes
    });
  };

  const getWorkoutsForDate = (date: Date | string): WorkoutSchedule[] => {
    const dateStr = formatDate(date);
    return schedule.filter(workout => workout.date === dateStr);
  };

  const getWorkoutsForWeek = (weekStart: Date | string): WorkoutSchedule[] => {
    const startDate = new Date(weekStart);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    
    return schedule.filter(workout => {
      const workoutDate = new Date(workout.date);
      return workoutDate >= startDate && workoutDate <= endDate;
    });
  };

  const getUpcomingWorkouts = (limit: number = 5): WorkoutSchedule[] => {
    const today = formatDate(new Date());
    return schedule
      .filter(workout => workout.date >= today && workout.status === 'scheduled')
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, limit);
  };

  const getWorkoutStreak = (): number => {
    const completedWorkouts = schedule
      .filter(workout => workout.status === 'completed')
      .sort((a, b) => b.date.localeCompare(a.date));

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (const workout of completedWorkouts) {
      const workoutDate = new Date(workout.date);
      workoutDate.setHours(0, 0, 0, 0);
      
      const diffDays = Math.floor((currentDate.getTime() - workoutDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === streak || (streak === 0 && diffDays <= 1)) {
        streak++;
        currentDate = workoutDate;
      } else {
        break;
      }
    }

    return streak;
  };

  return {
    schedule,
    addWorkout,
    updateWorkout,
    deleteWorkout,
    completeWorkout,
    skipWorkout,
    getWorkoutsForDate,
    getWorkoutsForWeek,
    getUpcomingWorkouts,
    getWorkoutStreak
  };
}