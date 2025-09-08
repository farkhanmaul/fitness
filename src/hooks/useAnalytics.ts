import { useState, useEffect, useMemo } from 'react';
import { WorkoutAnalytics, ProgressTrend, AnalyticsChartData, WorkoutHeatmapData, ExerciseVolumeData, AnalyticsTimeframe, AnalyticsFilter } from '@/types/analytics';

export function useAnalytics() {
  const [workoutHistory, setWorkoutHistory] = useState<any[]>([]);
  const [exerciseLogs, setExerciseLogs] = useState<any[]>([]);
  const [progressions, setProgressions] = useState<any>({});
  const [scheduleData, setScheduleData] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const history = JSON.parse(localStorage.getItem('fitness-workout-history') || '[]');
    const logs = JSON.parse(localStorage.getItem('fitness-exercise-logs') || '[]');
    const progressionData = JSON.parse(localStorage.getItem('fitness-progressions') || '{}');
    const schedule = JSON.parse(localStorage.getItem('fitness-schedule') || '[]');

    setWorkoutHistory(history);
    setExerciseLogs(logs);
    setProgressions(progressionData);
    setScheduleData(schedule);
  };

  const getWorkoutAnalytics = (filter: AnalyticsFilter = { timeframe: '30d' }): WorkoutAnalytics => {
    const now = new Date();
    const timeframeDays = getTimeframeDays(filter.timeframe);
    const cutoffDate = new Date(now.getTime() - timeframeDays * 24 * 60 * 60 * 1000);

    // Filter data based on timeframe
    const filteredWorkouts = workoutHistory.filter(workout => 
      new Date(workout.date) >= cutoffDate
    );
    const filteredLogs = exerciseLogs.filter(log => 
      new Date(log.date) >= cutoffDate
    );
    const completedScheduled = scheduleData.filter(workout => 
      workout.status === 'completed' && new Date(workout.date) >= cutoffDate
    );

    const totalWorkouts = filteredWorkouts.length + completedScheduled.length;
    const totalMinutes = filteredWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0);
    const totalHours = Math.round(totalMinutes / 60 * 10) / 10;

    // Calculate completion rate
    const scheduledWorkouts = scheduleData.filter(w => new Date(w.date) >= cutoffDate);
    const completionRate = scheduledWorkouts.length > 0 
      ? Math.round((completedScheduled.length / scheduledWorkouts.length) * 100) 
      : 100;

    // Calculate RPE average
    const rpeValues = filteredLogs.filter(log => log.rpe).map(log => log.rpe);
    const averageRPE = rpeValues.length > 0 
      ? Math.round(rpeValues.reduce((sum, rpe) => sum + rpe, 0) / rpeValues.length * 10) / 10
      : 0;

    // Exercise frequency
    const exerciseFrequency: { [key: string]: number } = {};
    filteredLogs.forEach(log => {
      exerciseFrequency[log.exerciseName] = (exerciseFrequency[log.exerciseName] || 0) + 1;
    });

    const mostFrequentExercise = Object.entries(exerciseFrequency)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || '';

    // Workouts by day of week
    const workoutsByDay: { [key: string]: number } = {
      'Sun': 0, 'Mon': 0, 'Tue': 0, 'Wed': 0, 'Thu': 0, 'Fri': 0, 'Sat': 0
    };
    
    [...filteredWorkouts, ...completedScheduled].forEach(workout => {
      const date = new Date(workout.date);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      workoutsByDay[dayName]++;
    });

    // Workouts by month (last 12 months)
    const workoutsByMonth: { [key: string]: number } = {};
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      workoutsByMonth[monthKey] = 0;
    }

    [...filteredWorkouts, ...completedScheduled].forEach(workout => {
      const date = new Date(workout.date);
      if (date >= new Date(now.getFullYear() - 1, now.getMonth(), 1)) {
        const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
        if (workoutsByMonth.hasOwnProperty(monthKey)) {
          workoutsByMonth[monthKey]++;
        }
      }
    });

    // Calculate streaks
    const { currentStreak, longestStreak } = calculateStreaks();

    // Progress trends
    const progressTrends = calculateProgressTrends(filteredLogs);

    // RPE history
    const rpeHistory = filteredLogs
      .filter(log => log.rpe)
      .map(log => ({
        date: log.date,
        exerciseName: log.exerciseName,
        rpe: log.rpe,
        weight: log.weight,
        reps: log.reps
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // This week and month counts
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const workoutsThisWeek = [...workoutHistory, ...completedScheduled]
      .filter(w => new Date(w.date) >= oneWeekAgo).length;
    
    const workoutsThisMonth = [...workoutHistory, ...completedScheduled]
      .filter(w => new Date(w.date) >= oneMonthAgo).length;

    return {
      totalWorkouts,
      totalHours,
      averageWorkoutDuration: totalWorkouts > 0 ? Math.round(totalMinutes / totalWorkouts) : 0,
      workoutsThisWeek,
      workoutsThisMonth,
      completionRate,
      averageRPE,
      mostFrequentExercise,
      longestStreak,
      currentStreak,
      workoutsByDay,
      workoutsByMonth,
      progressTrends,
      exerciseFrequency,
      rpeHistory
    };
  };

  const calculateStreaks = () => {
    const allWorkouts = [...workoutHistory, ...scheduleData.filter(w => w.status === 'completed')]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calculate current streak
    for (let i = 0; i < allWorkouts.length; i++) {
      const workoutDate = new Date(allWorkouts[i].date);
      workoutDate.setHours(0, 0, 0, 0);
      
      const diffDays = Math.floor((today.getTime() - workoutDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === currentStreak || (currentStreak === 0 && diffDays <= 1)) {
        currentStreak++;
        today.setTime(workoutDate.getTime());
      } else {
        break;
      }
    }

    // Calculate longest streak
    const workoutDates = allWorkouts.map(w => {
      const date = new Date(w.date);
      date.setHours(0, 0, 0, 0);
      return date;
    }).sort((a, b) => a.getTime() - b.getTime());

    for (let i = 0; i < workoutDates.length; i++) {
      if (i === 0) {
        tempStreak = 1;
      } else {
        const prevDate = workoutDates[i - 1];
        const currentDate = workoutDates[i];
        const diffDays = Math.floor((currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (diffDays <= 1) {
          tempStreak++;
        } else {
          longestStreak = Math.max(longestStreak, tempStreak);
          tempStreak = 1;
        }
      }
    }
    longestStreak = Math.max(longestStreak, tempStreak);

    return { currentStreak, longestStreak };
  };

  const calculateProgressTrends = (logs: any[]): ProgressTrend[] => {
    const exerciseGroups: { [key: string]: any[] } = {};
    
    logs.forEach(log => {
      if (!exerciseGroups[log.exerciseId]) {
        exerciseGroups[log.exerciseId] = [];
      }
      exerciseGroups[log.exerciseId].push(log);
    });

    return Object.entries(exerciseGroups).map(([exerciseId, exerciseLogs]) => {
      const sortedLogs = exerciseLogs.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      
      const dataPoints = sortedLogs.map(log => ({
        date: log.date,
        weight: log.weight,
        reps: log.reps,
        volume: (log.sets || 1) * log.reps * (log.weight || 1),
        rpe: log.rpe
      }));

      // Calculate trend direction
      let trendDirection: 'up' | 'down' | 'stable' = 'stable';
      let improvementRate = 0;

      if (dataPoints.length >= 2) {
        const firstHalf = dataPoints.slice(0, Math.floor(dataPoints.length / 2));
        const secondHalf = dataPoints.slice(Math.floor(dataPoints.length / 2));
        
        const firstHalfAvg = firstHalf.reduce((sum, dp) => sum + dp.volume, 0) / firstHalf.length;
        const secondHalfAvg = secondHalf.reduce((sum, dp) => sum + dp.volume, 0) / secondHalf.length;
        
        improvementRate = ((secondHalfAvg - firstHalfAvg) / firstHalfAvg) * 100;
        
        if (improvementRate > 5) trendDirection = 'up';
        else if (improvementRate < -5) trendDirection = 'down';
      }

      return {
        exerciseId,
        exerciseName: sortedLogs[0].exerciseName,
        dataPoints,
        trendDirection,
        improvementRate: Math.round(improvementRate * 10) / 10
      };
    });
  };

  const getWorkoutHeatmapData = (year: number = new Date().getFullYear()): WorkoutHeatmapData[] => {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);
    const allWorkouts = [...workoutHistory, ...scheduleData.filter(w => w.status === 'completed')];
    
    const workoutsByDate: { [key: string]: number } = {};
    
    allWorkouts.forEach(workout => {
      const date = new Date(workout.date);
      if (date >= startDate && date <= endDate) {
        const dateStr = date.toISOString().split('T')[0];
        workoutsByDate[dateStr] = (workoutsByDate[dateStr] || 0) + 1;
      }
    });

    const heatmapData: WorkoutHeatmapData[] = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const count = workoutsByDate[dateStr] || 0;
      
      // Map count to intensity level (0-4)
      let level = 0;
      if (count > 0) level = 1;
      if (count >= 2) level = 2;
      if (count >= 3) level = 3;
      if (count >= 4) level = 4;
      
      heatmapData.push({
        date: dateStr,
        count,
        level
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return heatmapData;
  };

  const getExerciseVolumeData = (timeframe: AnalyticsTimeframe = '30d'): ExerciseVolumeData[] => {
    const now = new Date();
    const timeframeDays = getTimeframeDays(timeframe);
    const cutoffDate = new Date(now.getTime() - timeframeDays * 24 * 60 * 60 * 1000);

    const filteredLogs = exerciseLogs.filter(log => new Date(log.date) >= cutoffDate);
    const exerciseGroups: { [key: string]: any[] } = {};
    
    filteredLogs.forEach(log => {
      if (!exerciseGroups[log.exerciseName]) {
        exerciseGroups[log.exerciseName] = [];
      }
      exerciseGroups[log.exerciseName].push(log);
    });

    return Object.entries(exerciseGroups).map(([exerciseName, logs]) => {
      const totalVolume = logs.reduce((sum, log) => 
        sum + ((log.sets || 1) * log.reps * (log.weight || 1)), 0
      );
      
      const rpeValues = logs.filter(log => log.rpe).map(log => log.rpe);
      const averageRPE = rpeValues.length > 0 
        ? rpeValues.reduce((sum, rpe) => sum + rpe, 0) / rpeValues.length 
        : 0;

      // Calculate progress rate (simple version)
      const sortedLogs = logs.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      let progressRate = 0;
      
      if (sortedLogs.length >= 2) {
        const firstSession = sortedLogs[0];
        const lastSession = sortedLogs[sortedLogs.length - 1];
        const firstVolume = (firstSession.sets || 1) * firstSession.reps * (firstSession.weight || 1);
        const lastVolume = (lastSession.sets || 1) * lastSession.reps * (lastSession.weight || 1);
        
        progressRate = ((lastVolume - firstVolume) / firstVolume) * 100;
      }

      return {
        exerciseName,
        totalVolume: Math.round(totalVolume),
        sessionsCount: logs.length,
        averageRPE: Math.round(averageRPE * 10) / 10,
        progressRate: Math.round(progressRate * 10) / 10
      };
    }).sort((a, b) => b.totalVolume - a.totalVolume);
  };

  const getChartData = (
    type: 'workouts' | 'volume' | 'rpe' | 'frequency',
    timeframe: AnalyticsTimeframe = '30d'
  ): AnalyticsChartData => {
    const analytics = getWorkoutAnalytics({ timeframe });
    
    switch (type) {
      case 'workouts':
        return {
          labels: Object.keys(analytics.workoutsByMonth),
          datasets: [{
            label: 'Workouts',
            data: Object.values(analytics.workoutsByMonth),
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.4
          }]
        };
        
      case 'volume':
        const volumeData = getExerciseVolumeData(timeframe);
        return {
          labels: volumeData.slice(0, 8).map(d => d.exerciseName),
          datasets: [{
            label: 'Total Volume',
            data: volumeData.slice(0, 8).map(d => d.totalVolume),
            borderColor: 'rgb(34, 197, 94)',
            backgroundColor: 'rgba(34, 197, 94, 0.1)'
          }]
        };
        
      case 'rpe':
        const rpeData = analytics.rpeHistory.slice(-30); // Last 30 sessions
        return {
          labels: rpeData.map(d => new Date(d.date).toLocaleDateString()),
          datasets: [{
            label: 'Average RPE',
            data: rpeData.map(d => d.rpe),
            borderColor: 'rgb(168, 85, 247)',
            backgroundColor: 'rgba(168, 85, 247, 0.1)',
            tension: 0.4
          }]
        };
        
      case 'frequency':
        const frequencyEntries = Object.entries(analytics.exerciseFrequency)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 10);
        
        return {
          labels: frequencyEntries.map(([name]) => name),
          datasets: [{
            label: 'Exercise Frequency',
            data: frequencyEntries.map(([,count]) => count),
            borderColor: 'rgb(249, 115, 22)',
            backgroundColor: 'rgba(249, 115, 22, 0.1)'
          }]
        };
        
      default:
        return { labels: [], datasets: [] };
    }
  };

  const getTimeframeDays = (timeframe: AnalyticsTimeframe): number => {
    switch (timeframe) {
      case '7d': return 7;
      case '30d': return 30;
      case '3m': return 90;
      case '6m': return 180;
      case '1y': return 365;
      default: return 365 * 10; // 'all' - use a very large number
    }
  };

  return {
    getWorkoutAnalytics,
    getWorkoutHeatmapData,
    getExerciseVolumeData,
    getChartData,
    calculateStreaks,
    refreshData: loadData
  };
}