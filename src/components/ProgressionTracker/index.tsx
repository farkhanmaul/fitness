import { useState, useEffect } from 'react';
import { Icon } from '../ui/Icon';
import { useProgression } from '@/hooks/useProgression';
import { Exercise } from '@/data/exercises';

interface ProgressionTrackerProps {
  isVisible: boolean;
  onClose: () => void;
  exercise?: Exercise;
}

type ViewType = 'overview' | 'exercise-detail' | 'recommendations';

export function ProgressionTracker({ isVisible, onClose, exercise }: ProgressionTrackerProps) {
  const [activeView, setActiveView] = useState<ViewType>('overview');
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null);
  const { progressions, getProgression, getRecommendedStats, getUserProgress, getExerciseInsights } = useProgression();

  useEffect(() => {
    if (exercise) {
      setSelectedExerciseId(exercise.id);
      setActiveView('exercise-detail');
    }
  }, [exercise]);

  if (!isVisible) return null;

  const userProgress = getUserProgress();
  const exerciseIds = Object.keys(progressions);

  const getDifficultyColor = (level: number) => {
    if (level <= 2) return 'text-green-600 dark:text-green-400';
    if (level <= 4) return 'text-yellow-600 dark:text-yellow-400';
    if (level <= 6) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getTrendIcon = (trend: 'improving' | 'stable' | 'declining') => {
    switch (trend) {
      case 'improving': return 'trendingUp';
      case 'declining': return 'arrowLeft';
      default: return 'minus';
    }
  };

  const getTrendColor = (trend: 'improving' | 'stable' | 'declining') => {
    switch (trend) {
      case 'improving': return 'text-green-600 dark:text-green-400';
      case 'declining': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Icon name="trendingUp" size={24} />
              Progression Tracker
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 mobile-touch-target"
            >
              <Icon name="close" size={20} />
            </button>
          </div>

          {/* User Level Info */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Current Level: {userProgress.currentDifficultyLevel.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {userProgress.currentDifficultyLevel.description}
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                userProgress.currentDifficultyLevel.level <= 2 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  : userProgress.currentDifficultyLevel.level <= 4
                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                  : userProgress.currentDifficultyLevel.level <= 6
                  ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                Level {userProgress.currentDifficultyLevel.level}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {userProgress.userStats.totalWorkouts}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Total Workouts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {userProgress.userStats.currentStreak}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Current Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {userProgress.averageProgressionLevel}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Avg Progression</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {userProgress.totalExercisesTracked}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Exercises Tracked</div>
              </div>
            </div>

            {/* Progress to next level */}
            {userProgress.nextLevel && userProgress.progressToNext && (
              <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-700">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Progress to {userProgress.nextLevel.name}:
                  </span>
                  <span className="text-blue-600 dark:text-blue-400">
                    {userProgress.progressToNext.workoutsNeeded > 0 && 
                      `${userProgress.progressToNext.workoutsNeeded} workouts`}
                    {userProgress.progressToNext.workoutsNeeded > 0 && userProgress.progressToNext.streakNeeded > 0 && ', '}
                    {userProgress.progressToNext.streakNeeded > 0 && 
                      `${userProgress.progressToNext.streakNeeded} day streak`}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2 mb-6">
            <button
              onClick={() => setActiveView('overview')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors mobile-button-lg ${
                activeView === 'overview'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Icon name="grid" size={16} className="mr-2" />
              Overview
            </button>
            <button
              onClick={() => setActiveView('recommendations')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors mobile-button-lg ${
                activeView === 'recommendations'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Icon name="lightbulb" size={16} className="mr-2" />
              Recommendations
            </button>
          </div>

          {/* Overview */}
          {activeView === 'overview' && (
            <div className="space-y-6">
              {exerciseIds.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="trendingUp" size={48} className="mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    No Exercise Progressions Yet
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Start logging exercises to track your progression and get personalized recommendations.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {exerciseIds.map(exerciseId => {
                    const progression = progressions[exerciseId];
                    const insights = getExerciseInsights(exerciseId);
                    
                    return (
                      <div
                        key={exerciseId}
                        className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        onClick={() => {
                          setSelectedExerciseId(exerciseId);
                          setActiveView('exercise-detail');
                        }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900 dark:text-white capitalize">
                            {exerciseId.replace('-', ' ')}
                          </h4>
                          <div className="flex items-center gap-2">
                            <Icon 
                              name={getTrendIcon(insights.trend)} 
                              size={16} 
                              className={getTrendColor(insights.trend)} 
                            />
                            <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(progression.currentLevel)}`}>
                              Level {progression.currentLevel}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-gray-500 dark:text-gray-400">Sessions</div>
                            <div className="font-semibold text-gray-900 dark:text-white">
                              {insights.totalSessions}
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-500 dark:text-gray-400">Success Rate</div>
                            <div className="font-semibold text-gray-900 dark:text-white">
                              {insights.successRate}%
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-500 dark:text-gray-400">Avg RPE</div>
                            <div className="font-semibold text-gray-900 dark:text-white">
                              {insights.averageRPE || 'N/A'}
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-500 dark:text-gray-400">Progress</div>
                            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                              <div 
                                className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all duration-300" 
                                style={{ width: `${(progression.currentLevel / progression.totalLevels) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        {progression.nextProgression && (
                          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Next Session:</div>
                            <div className="text-sm text-blue-600 dark:text-blue-400">
                              {progression.nextProgression.weight && `${progression.nextProgression.weight}kg × `}
                              {progression.nextProgression.reps} reps × {progression.nextProgression.sets} sets
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Exercise Detail */}
          {activeView === 'exercise-detail' && selectedExerciseId && (
            <div className="space-y-6">
              <button
                onClick={() => setActiveView('overview')}
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mobile-touch-target"
              >
                <Icon name="arrowLeft" size={16} />
                Back to Overview
              </button>

              {(() => {
                const progression = progressions[selectedExerciseId];
                const insights = getExerciseInsights(selectedExerciseId);
                
                return (
                  <div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 capitalize">
                        {selectedExerciseId.replace('-', ' ')} Progression
                      </h3>

                      {/* Current Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {progression.currentLevel}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Current Level</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                            {insights.successRate}%
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Success Rate</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                            {insights.averageRPE || 'N/A'}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Average RPE</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-2xl font-bold ${getTrendColor(insights.trend)}`}>
                            <Icon name={getTrendIcon(insights.trend)} size={24} className="mx-auto" />
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">{insights.trend}</div>
                        </div>
                      </div>

                      {/* Next Progression */}
                      {progression.nextProgression && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Next Session Recommendation</h4>
                          <div className="text-blue-700 dark:text-blue-300">
                            {progression.nextProgression.weight && (
                              <span className="mr-4">Weight: {progression.nextProgression.weight}kg</span>
                            )}
                            <span className="mr-4">Reps: {progression.nextProgression.reps}</span>
                            <span>Sets: {progression.nextProgression.sets}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Recent History */}
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Recent Sessions</h4>
                      {progression.history.length === 0 ? (
                        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                          No sessions recorded yet
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {progression.history.slice(-10).reverse().map((session, index) => (
                            <div
                              key={index}
                              className={`p-3 rounded-lg border ${
                                session.success
                                  ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
                                  : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <Icon 
                                    name={session.success ? 'check' : 'close'} 
                                    size={16} 
                                    className={session.success ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'} 
                                  />
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {new Date(session.date).toLocaleDateString()}
                                  </span>
                                  <div className="text-sm text-gray-900 dark:text-white">
                                    {session.weight && `${session.weight}kg × `}
                                    {session.reps} reps × {session.sets} sets
                                  </div>
                                  {session.rpe && (
                                    <span className="text-xs bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">
                                      RPE {session.rpe}
                                    </span>
                                  )}
                                </div>
                              </div>
                              {session.notes && (
                                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                  {session.notes}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Exercise-specific Insights */}
                    {insights.recommendations.length > 0 && (
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                        <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2 flex items-center gap-2">
                          <Icon name="lightbulb" size={16} />
                          Recommendations
                        </h4>
                        <ul className="space-y-1">
                          {insights.recommendations.map((rec, index) => (
                            <li key={index} className="text-sm text-yellow-700 dark:text-yellow-300">
                              • {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          {/* Recommendations */}
          {activeView === 'recommendations' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* General Recommendations */}
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-4 flex items-center gap-2">
                    <Icon name="lightbulb" size={20} />
                    Training Recommendations
                  </h3>
                  <ul className="space-y-3 text-sm text-blue-700 dark:text-blue-300">
                    <li className="flex items-start gap-2">
                      <Icon name="check" size={14} className="mt-0.5 flex-shrink-0" />
                      <span>Focus on progressive overload - gradually increase weight, reps, or sets</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="check" size={14} className="mt-0.5 flex-shrink-0" />
                      <span>Track your RPE (Rate of Perceived Exertion) to optimize intensity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="check" size={14} className="mt-0.5 flex-shrink-0" />
                      <span>Allow adequate rest between sessions for the same muscle groups</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="check" size={14} className="mt-0.5 flex-shrink-0" />
                      <span>Consider deload weeks every 4-6 weeks to prevent overtraining</span>
                    </li>
                  </ul>
                </div>

                {/* Level-specific Advice */}
                <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                  <h3 className="font-semibold text-green-800 dark:text-green-200 mb-4 flex items-center gap-2">
                    <Icon name="user" size={20} />
                    For Your Level ({userProgress.currentDifficultyLevel.name})
                  </h3>
                  <div className="space-y-3 text-sm text-green-700 dark:text-green-300">
                    {userProgress.currentDifficultyLevel.level <= 2 && (
                      <>
                        <p>• Focus on learning proper form before adding weight</p>
                        <p>• Start with bodyweight exercises and light weights</p>
                        <p>• Consistency is more important than intensity</p>
                        <p>• Aim for 3-4 workouts per week with rest days</p>
                      </>
                    )}
                    {userProgress.currentDifficultyLevel.level > 2 && userProgress.currentDifficultyLevel.level <= 4 && (
                      <>
                        <p>• Begin implementing progressive overload systematically</p>
                        <p>• Add compound movements to your routine</p>
                        <p>• Track your workouts to monitor progress</p>
                        <p>• Consider working in different rep ranges</p>
                      </>
                    )}
                    {userProgress.currentDifficultyLevel.level > 4 && (
                      <>
                        <p>• Implement periodization in your training</p>
                        <p>• Focus on weak points and imbalances</p>
                        <p>• Consider advanced training techniques</p>
                        <p>• Plan deload weeks and active recovery</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Exercise-specific recommendations */}
              {exerciseIds.length > 0 && (
                <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                  <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-4 flex items-center gap-2">
                    <Icon name="target" size={20} />
                    Exercise-Specific Insights
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {exerciseIds.slice(0, 4).map(exerciseId => {
                      const insights = getExerciseInsights(exerciseId);
                      if (insights.recommendations.length === 0) return null;
                      
                      return (
                        <div key={exerciseId} className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2 capitalize">
                            {exerciseId.replace('-', ' ')}
                          </h4>
                          <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                            {insights.recommendations.slice(0, 2).map((rec, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <Icon name="arrowLeft" size={12} className="mt-1 flex-shrink-0 rotate-180" />
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}