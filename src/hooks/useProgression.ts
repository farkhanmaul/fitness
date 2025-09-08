import { useState, useEffect } from 'react';
import { WorkoutProgression, ProgressionHistory, AdaptiveWorkout } from '@/types/progression';
import { getProgressionRule, getUserDifficultyLevel, calculateNextProgression, difficultyLevels } from '@/data/progressionRules';

export function useProgression() {
  const [progressions, setProgressions] = useState<{ [exerciseId: string]: WorkoutProgression }>({});
  const [userStats, setUserStats] = useState({
    totalWorkouts: 0,
    currentStreak: 0,
    longestStreak: 0
  });

  useEffect(() => {
    loadProgressionData();
    loadUserStats();
  }, []);

  const loadProgressionData = () => {
    const saved = localStorage.getItem('fitness-progressions');
    if (saved) {
      setProgressions(JSON.parse(saved));
    }
  };

  const loadUserStats = () => {
    // Load from various sources
    const workoutHistory = JSON.parse(localStorage.getItem('fitness-workout-history') || '[]');
    const schedule = JSON.parse(localStorage.getItem('fitness-schedule') || '[]');
    const achievementProgress = JSON.parse(localStorage.getItem('fitness-achievements-progress') || '{}');

    const completedWorkouts = schedule.filter((w: any) => w.status === 'completed');
    
    // Calculate current streak
    let currentStreak = 0;
    const sortedWorkouts = completedWorkouts
      .sort((a: any, b: any) => b.date.localeCompare(a.date));
    
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    for (const workout of sortedWorkouts) {
      const workoutDate = new Date(workout.date);
      workoutDate.setHours(0, 0, 0, 0);
      
      const diffDays = Math.floor((currentDate.getTime() - workoutDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === currentStreak || (currentStreak === 0 && diffDays <= 1)) {
        currentStreak++;
        currentDate = workoutDate;
      } else {
        break;
      }
    }

    setUserStats({
      totalWorkouts: workoutHistory.length + completedWorkouts.length,
      currentStreak,
      longestStreak: Math.max(currentStreak, achievementProgress.longestStreak || 0)
    });
  };

  const saveProgressions = (newProgressions: { [exerciseId: string]: WorkoutProgression }) => {
    setProgressions(newProgressions);
    localStorage.setItem('fitness-progressions', JSON.stringify(newProgressions));
  };

  const initializeProgression = (exerciseId: string, exerciseName: string): WorkoutProgression => {
    const rule = getProgressionRule(exerciseId);
    const userLevel = getUserDifficultyLevel(userStats);
    
    const progression: WorkoutProgression = {
      exerciseId,
      currentLevel: 1,
      totalLevels: 10, // Can be customized per exercise
      progressionRule: rule,
      history: []
    };

    return progression;
  };

  const getProgression = (exerciseId: string, exerciseName: string): WorkoutProgression => {
    if (!progressions[exerciseId]) {
      const newProgression = initializeProgression(exerciseId, exerciseName);
      const updated = { ...progressions, [exerciseId]: newProgression };
      saveProgressions(updated);
      return newProgression;
    }
    return progressions[exerciseId];
  };

  const recordWorkout = (
    exerciseId: string,
    workoutData: {
      weight?: number;
      reps: number;
      sets: number;
      duration?: number;
      rpe?: number;
      success: boolean;
      notes?: string;
    }
  ) => {
    const progression = progressions[exerciseId];
    if (!progression) return;

    const historyEntry: ProgressionHistory = {
      date: new Date().toISOString(),
      level: progression.currentLevel,
      weight: workoutData.weight,
      reps: workoutData.reps,
      sets: workoutData.sets,
      duration: workoutData.duration,
      rpe: workoutData.rpe,
      success: workoutData.success,
      notes: workoutData.notes
    };

    // Calculate next progression
    const nextStats = calculateNextProgression(
      {
        weight: workoutData.weight,
        reps: workoutData.reps,
        sets: workoutData.sets,
        rpe: workoutData.rpe
      },
      progression.progressionRule,
      workoutData.success
    );

    const updatedProgression: WorkoutProgression = {
      ...progression,
      history: [...progression.history, historyEntry],
      nextProgression: nextStats.shouldProgress ? {
        weight: nextStats.weight,
        reps: nextStats.reps,
        sets: nextStats.sets
      } : undefined,
      currentLevel: nextStats.shouldProgress ? 
        Math.min(progression.currentLevel + 1, progression.totalLevels) : 
        progression.currentLevel
    };

    const updated = { ...progressions, [exerciseId]: updatedProgression };
    saveProgressions(updated);
  };

  const getRecommendedStats = (exerciseId: string, baseStats: {
    weight?: number;
    reps: number;
    sets: number;
    duration?: number;
  }) => {
    const userLevel = getUserDifficultyLevel(userStats);
    const progression = progressions[exerciseId];

    // Apply user difficulty modifiers
    const modifiers = userLevel.modifiers;
    
    const recommended = {
      weight: baseStats.weight ? baseStats.weight * (modifiers.weightMultiplier || 1) : undefined,
      reps: Math.round(baseStats.reps * (modifiers.repMultiplier || 1)),
      sets: baseStats.sets,
      duration: baseStats.duration ? baseStats.duration * (modifiers.timeMultiplier || 1) : undefined,
      restTime: modifiers.restReduction ? baseStats.duration ? baseStats.duration * (1 - modifiers.restReduction / 100) : 60 * (1 - modifiers.restReduction / 100) : undefined
    };

    // If progression exists, use next progression stats
    if (progression?.nextProgression) {
      return {
        ...recommended,
        ...progression.nextProgression
      };
    }

    return recommended;
  };

  const getUserProgress = () => {
    const totalProgressions = Object.keys(progressions).length;
    const averageLevel = totalProgressions > 0 
      ? Object.values(progressions).reduce((sum, p) => sum + p.currentLevel, 0) / totalProgressions 
      : 0;
    
    const currentDifficultyLevel = getUserDifficultyLevel(userStats);
    const nextLevelIndex = difficultyLevels.findIndex(level => level.level === currentDifficultyLevel.level) + 1;
    const nextLevel = nextLevelIndex < difficultyLevels.length ? difficultyLevels[nextLevelIndex] : null;

    return {
      userStats,
      currentDifficultyLevel,
      nextLevel,
      averageProgressionLevel: Math.round(averageLevel),
      totalExercisesTracked: totalProgressions,
      progressToNext: nextLevel ? {
        workoutsNeeded: Math.max(0, (nextLevel.requirements?.minWorkouts || 0) - userStats.totalWorkouts),
        streakNeeded: Math.max(0, (nextLevel.requirements?.minStreak || 0) - userStats.longestStreak)
      } : null
    };
  };

  const getExerciseInsights = (exerciseId: string) => {
    const progression = progressions[exerciseId];
    if (!progression || progression.history.length === 0) {
      return {
        totalSessions: 0,
        successRate: 0,
        averageRPE: 0,
        trend: 'stable' as const,
        recommendations: []
      };
    }

    const history = progression.history;
    const recentHistory = history.slice(-10); // Last 10 sessions
    
    const totalSessions = history.length;
    const successfulSessions = history.filter(h => h.success).length;
    const successRate = (successfulSessions / totalSessions) * 100;
    
    const rpeValues = history.filter(h => h.rpe).map(h => h.rpe!);
    const averageRPE = rpeValues.length > 0 ? rpeValues.reduce((sum, rpe) => sum + rpe, 0) / rpeValues.length : 0;

    // Determine trend
    let trend: 'improving' | 'stable' | 'declining' = 'stable';
    if (recentHistory.length >= 5) {
      const firstHalf = recentHistory.slice(0, Math.floor(recentHistory.length / 2));
      const secondHalf = recentHistory.slice(Math.floor(recentHistory.length / 2));
      
      const firstHalfSuccess = firstHalf.filter(h => h.success).length / firstHalf.length;
      const secondHalfSuccess = secondHalf.filter(h => h.success).length / secondHalf.length;
      
      if (secondHalfSuccess > firstHalfSuccess + 0.1) {
        trend = 'improving';
      } else if (secondHalfSuccess < firstHalfSuccess - 0.1) {
        trend = 'declining';
      }
    }

    // Generate recommendations
    const recommendations: string[] = [];
    if (successRate < 60) {
      recommendations.push('Consider reducing intensity or volume');
    }
    if (averageRPE > 8.5) {
      recommendations.push('Average RPE is high - consider more rest between sessions');
    }
    if (trend === 'declining') {
      recommendations.push('Performance declining - consider a deload week');
    }
    if (progression.currentLevel < 3 && totalSessions > 20) {
      recommendations.push('Ready to progress to next difficulty level');
    }

    return {
      totalSessions,
      successRate: Math.round(successRate),
      averageRPE: Math.round(averageRPE * 10) / 10,
      trend,
      recommendations
    };
  };

  return {
    progressions,
    userStats,
    getProgression,
    recordWorkout,
    getRecommendedStats,
    getUserProgress,
    getExerciseInsights,
    difficultyLevels: getUserDifficultyLevel(userStats)
  };
}