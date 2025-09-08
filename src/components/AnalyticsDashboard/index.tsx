import { useState, useEffect } from 'react';
import { Icon } from '../ui/Icon';
import { useAnalytics } from '@/hooks/useAnalytics';
import { AnalyticsTimeframe } from '@/types/analytics';

interface AnalyticsDashboardProps {
  isVisible: boolean;
  onClose: () => void;
}

type ViewType = 'overview' | 'progress' | 'heatmap' | 'volume';

export function AnalyticsDashboard({ isVisible, onClose }: AnalyticsDashboardProps) {
  const [activeView, setActiveView] = useState<ViewType>('overview');
  const [timeframe, setTimeframe] = useState<AnalyticsTimeframe>('30d');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  const { 
    getWorkoutAnalytics, 
    getWorkoutHeatmapData, 
    getExerciseVolumeData, 
    getChartData,
    refreshData 
  } = useAnalytics();

  useEffect(() => {
    if (isVisible) {
      refreshData();
    }
  }, [isVisible, refreshData]);

  if (!isVisible) return null;

  const analytics = getWorkoutAnalytics({ timeframe });
  const heatmapData = getWorkoutHeatmapData(selectedYear);
  const volumeData = getExerciseVolumeData(timeframe);

  const getTimeframeLabel = (tf: AnalyticsTimeframe) => {
    switch (tf) {
      case '7d': return 'Last 7 Days';
      case '30d': return 'Last 30 Days';
      case '3m': return 'Last 3 Months';
      case '6m': return 'Last 6 Months';
      case '1y': return 'Last Year';
      case 'all': return 'All Time';
      default: return 'Last 30 Days';
    }
  };

  const getHeatmapColor = (level: number) => {
    const colors = [
      'bg-gray-100 dark:bg-gray-800',
      'bg-green-200 dark:bg-green-900',
      'bg-green-300 dark:bg-green-800',
      'bg-green-400 dark:bg-green-700',
      'bg-green-500 dark:bg-green-600'
    ];
    return colors[level] || colors[0];
  };

  const getTrendIcon = (direction: 'up' | 'down' | 'stable') => {
    switch (direction) {
      case 'up': return 'trendingUp';
      case 'down': return 'arrowLeft';
      default: return 'minus';
    }
  };

  const getTrendColor = (direction: 'up' | 'down' | 'stable') => {
    switch (direction) {
      case 'up': return 'text-green-600 dark:text-green-400';
      case 'down': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-7xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Icon name="analytics" size={24} />
              Analytics Dashboard
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 mobile-touch-target"
            >
              <Icon name="close" size={20} />
            </button>
          </div>

          {/* Timeframe Selector */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Timeframe:</span>
            {(['7d', '30d', '3m', '6m', '1y', 'all'] as AnalyticsTimeframe[]).map(tf => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1.5 rounded-md text-xs transition-colors mobile-button-lg ${
                  timeframe === tf
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {tf === '7d' ? '7D' : tf === '30d' ? '30D' : tf === '3m' ? '3M' : tf === '6m' ? '6M' : tf === '1y' ? '1Y' : 'All'}
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {[
              { id: 'overview' as ViewType, label: 'Overview', icon: 'grid' },
              { id: 'progress' as ViewType, label: 'Progress', icon: 'trendingUp' },
              { id: 'heatmap' as ViewType, label: 'Activity Heatmap', icon: 'calendar' },
              { id: 'volume' as ViewType, label: 'Exercise Volume', icon: 'barChart' }
            ].map(view => (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors mobile-button-lg ${
                  activeView === view.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <Icon name={view.icon as keyof typeof import('../icons').Icons} size={16} className="mr-2" />
                {view.label}
              </button>
            ))}
          </div>

          {/* Overview */}
          {activeView === 'overview' && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {analytics.totalWorkouts}
                  </div>
                  <div className="text-sm text-blue-800 dark:text-blue-200">
                    Total Workouts
                  </div>
                  <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    {getTimeframeLabel(timeframe)}
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {analytics.totalHours}h
                  </div>
                  <div className="text-sm text-green-800 dark:text-green-200">
                    Hours Trained
                  </div>
                  <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                    Avg: {analytics.averageWorkoutDuration}min/workout
                  </div>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {analytics.currentStreak}
                  </div>
                  <div className="text-sm text-purple-800 dark:text-purple-200">
                    Current Streak
                  </div>
                  <div className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                    Best: {analytics.longestStreak} days
                  </div>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                    {analytics.completionRate}%
                  </div>
                  <div className="text-sm text-orange-800 dark:text-orange-200">
                    Completion Rate
                  </div>
                  <div className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                    {analytics.averageRPE > 0 && `Avg RPE: ${analytics.averageRPE}`}
                  </div>
                </div>
              </div>

              {/* Weekly Pattern */}
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Weekly Activity Pattern
                </h3>
                <div className="grid grid-cols-7 gap-2">
                  {Object.entries(analytics.workoutsByDay).map(([day, count]) => (
                    <div key={day} className="text-center">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">{day}</div>
                      <div 
                        className="h-20 bg-blue-100 dark:bg-blue-900 rounded flex items-end justify-center relative"
                        style={{
                          background: `linear-gradient(to top, rgb(59, 130, 246) ${(count / Math.max(...Object.values(analytics.workoutsByDay))) * 100}%, transparent 0%)`
                        }}
                      >
                        <span className="text-sm font-semibold text-white mb-2">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Monthly Trend */}
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Monthly Trends (Last 12 Months)
                </h3>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
                  {Object.entries(analytics.workoutsByMonth).map(([month, count]) => (
                    <div key={month} className="text-center">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">{month}</div>
                      <div 
                        className="h-16 bg-green-100 dark:bg-green-900 rounded flex items-end justify-center"
                        style={{
                          background: `linear-gradient(to top, rgb(34, 197, 94) ${(count / Math.max(...Object.values(analytics.workoutsByMonth))) * 100}%, transparent 0%)`
                        }}
                      >
                        <span className="text-xs font-semibold text-white mb-1">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Exercises */}
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Most Frequent Exercises
                </h3>
                <div className="space-y-3">
                  {Object.entries(analytics.exerciseFrequency)
                    .sort(([,a], [,b]) => b - a)
                    .slice(0, 8)
                    .map(([exercise, count], index) => (
                      <div key={exercise} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold text-white ${
                            index < 3 ? 'bg-yellow-500' : 'bg-gray-400'
                          }`}>
                            {index + 1}
                          </div>
                          <span className="font-medium text-gray-900 dark:text-white capitalize">
                            {exercise}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 rounded-full transition-all duration-300"
                              style={{ width: `${(count / Math.max(...Object.values(analytics.exerciseFrequency))) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-gray-600 dark:text-gray-300 min-w-[2rem]">
                            {count}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* Progress Trends */}
          {activeView === 'progress' && (
            <div className="space-y-6">
              {analytics.progressTrends.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="trendingUp" size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No Progress Data Yet
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Start logging exercises to see your progress trends over time.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {analytics.progressTrends.map(trend => (
                    <div key={trend.exerciseId} className="bg-white dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                          {trend.exerciseName}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Icon 
                            name={getTrendIcon(trend.trendDirection)} 
                            size={20} 
                            className={getTrendColor(trend.trendDirection)} 
                          />
                          <span className={`text-sm font-medium ${getTrendColor(trend.trendDirection)}`}>
                            {trend.improvementRate > 0 ? '+' : ''}{trend.improvementRate}%
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500 dark:text-gray-400">Sessions:</span>
                          <span className="font-medium text-gray-900 dark:text-white">{trend.dataPoints.length}</span>
                        </div>
                        {trend.dataPoints.length > 0 && (
                          <>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500 dark:text-gray-400">Latest Volume:</span>
                              <span className="font-medium text-gray-900 dark:text-white">
                                {Math.round(trend.dataPoints[trend.dataPoints.length - 1].volume)}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500 dark:text-gray-400">Latest RPE:</span>
                              <span className="font-medium text-gray-900 dark:text-white">
                                {trend.dataPoints[trend.dataPoints.length - 1].rpe || 'N/A'}
                              </span>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Simple Volume Trend Visualization */}
                      <div className="h-20 bg-gray-50 dark:bg-gray-800 rounded-lg p-2 flex items-end justify-between">
                        {trend.dataPoints.slice(-10).map((point) => {
                          const maxVolume = Math.max(...trend.dataPoints.map(p => p.volume));
                          const height = (point.volume / maxVolume) * 100;
                          
                          return (
                            <div
                              key={point.date}
                              className="flex-1 mx-0.5"
                              title={`${new Date(point.date).toLocaleDateString()}: ${Math.round(point.volume)}`}
                            >
                              <div 
                                className="bg-blue-500 rounded-t"
                                style={{ height: `${height}%`, minHeight: '4px' }}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Activity Heatmap */}
          {activeView === 'heatmap' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Activity Heatmap - {selectedYear}
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedYear(selectedYear - 1)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded mobile-touch-target"
                  >
                    <Icon name="arrowLeft" size={16} />
                  </button>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[4rem] text-center">
                    {selectedYear}
                  </span>
                  <button
                    onClick={() => setSelectedYear(selectedYear + 1)}
                    disabled={selectedYear >= new Date().getFullYear()}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded mobile-touch-target disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Icon name="chevronRight" size={16} />
                  </button>
                </div>
              </div>

              {/* Heatmap Grid */}
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600 overflow-x-auto">
                <div className="grid grid-cols-53 gap-1 min-w-[800px]">
                  {heatmapData.map((day, index) => (
                    <div
                      key={day.date}
                      className={`w-3 h-3 rounded-sm ${getHeatmapColor(day.level)} cursor-pointer`}
                      title={`${day.date}: ${day.count} workout${day.count !== 1 ? 's' : ''}`}
                    />
                  ))}
                </div>
                
                {/* Legend */}
                <div className="flex items-center justify-between mt-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>Less</span>
                  <div className="flex items-center gap-1">
                    {[0, 1, 2, 3, 4].map(level => (
                      <div
                        key={level}
                        className={`w-3 h-3 rounded-sm ${getHeatmapColor(level)}`}
                      />
                    ))}
                  </div>
                  <span>More</span>
                </div>
              </div>
            </div>
          )}

          {/* Exercise Volume */}
          {activeView === 'volume' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                  Exercise Volume Analysis - {getTimeframeLabel(timeframe)}
                </h3>
                
                {volumeData.length === 0 ? (
                  <div className="text-center py-8">
                    <Icon name="barChart" size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">No volume data available for this timeframe.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {volumeData.slice(0, 10).map((exercise, index) => (
                      <div key={exercise.exerciseName} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded flex items-center justify-center text-sm font-bold text-white ${
                              index < 3 ? 'bg-yellow-500' : 'bg-blue-500'
                            }`}>
                              {index + 1}
                            </div>
                            <h4 className="font-semibold text-gray-900 dark:text-white capitalize">
                              {exercise.exerciseName}
                            </h4>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900 dark:text-white">
                              {exercise.totalVolume.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Total Volume</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="text-center">
                            <div className="font-semibold text-gray-900 dark:text-white">{exercise.sessionsCount}</div>
                            <div className="text-gray-500 dark:text-gray-400">Sessions</div>
                          </div>
                          <div className="text-center">
                            <div className="font-semibold text-gray-900 dark:text-white">
                              {exercise.averageRPE > 0 ? exercise.averageRPE : 'N/A'}
                            </div>
                            <div className="text-gray-500 dark:text-gray-400">Avg RPE</div>
                          </div>
                          <div className="text-center">
                            <div className={`font-semibold ${
                              exercise.progressRate > 0 
                                ? 'text-green-600 dark:text-green-400' 
                                : exercise.progressRate < 0
                                ? 'text-red-600 dark:text-red-400'
                                : 'text-gray-600 dark:text-gray-400'
                            }`}>
                              {exercise.progressRate > 0 ? '+' : ''}{exercise.progressRate}%
                            </div>
                            <div className="text-gray-500 dark:text-gray-400">Progress</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}