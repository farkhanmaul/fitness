import { useState, useEffect } from 'react';
import { Icon } from '../ui/Icon';
import { achievements, UserProgress, getRarityColor, getRarityBgColor, getCategoryIcon, checkAchievements, Achievement } from '@/data/achievements';

interface AchievementSystemProps {
  isVisible: boolean;
  onClose: () => void;
}

type ViewType = 'earned' | 'available' | 'stats';
type FilterType = 'all' | 'strength' | 'endurance' | 'consistency' | 'milestone' | 'exploration';

export function AchievementSystem({ isVisible, onClose }: AchievementSystemProps) {
  const [activeView, setActiveView] = useState<ViewType>('stats');
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('all');
  const [progress, setProgress] = useState<UserProgress>({
    totalWorkouts: 0,
    totalExercises: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalTimeMinutes: 0,
    totalWeightLifted: 0,
    categoriesExplored: [],
    achievements: [],
    points: 0
  });
  const [newAchievements, setNewAchievements] = useState<string[]>([]);

  useEffect(() => {
    if (isVisible) {
      loadProgress();
    }
  }, [isVisible]);

  const loadProgress = () => {
    // Load workout history
    const workoutHistory = JSON.parse(localStorage.getItem('fitness-workout-history') || '[]') as unknown[];
    
    // Load exercise logs
    const exerciseLogs = JSON.parse(localStorage.getItem('fitness-exercise-logs') || '[]') as unknown[];
    
    // Load saved progress
    const savedProgress = JSON.parse(localStorage.getItem('fitness-achievements-progress') || '{}') as Partial<UserProgress>;
    
    // Calculate current streak from workout calendar
    const scheduleData = JSON.parse(localStorage.getItem('fitness-schedule') || '[]') as { status: string; date: string }[];
    const completedWorkouts = scheduleData
      .filter((w) => w.status === 'completed')
      .sort((a, b) => b.date.localeCompare(a.date));

    let currentStreak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (const workout of completedWorkouts) {
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

    // Extract categories from exercise logs
    const categoriesSet = new Set<string>();
    exerciseLogs.forEach(() => {
      // You might need to map exercise names to categories
      categoriesSet.add('general'); // Simplified for now
    });

    const newProgress: UserProgress = {
      totalWorkouts: workoutHistory.length + completedWorkouts.length,
      totalExercises: exerciseLogs.length,
      currentStreak,
      longestStreak: Math.max(currentStreak, savedProgress.longestStreak || 0),
      totalTimeMinutes: workoutHistory.reduce((acc: number) => acc, 0),
      totalWeightLifted: exerciseLogs.reduce((acc: number) => acc, 0),
      categoriesExplored: Array.from(categoriesSet),
      achievements: savedProgress.achievements || [],
      points: savedProgress.points || 0
    };

    // Check for new achievements
    const newUnlockedAchievements = checkAchievements(newProgress);
    
    if (newUnlockedAchievements.length > 0) {
      // Add new achievements
      newProgress.achievements = [...newProgress.achievements, ...newUnlockedAchievements];
      
      // Calculate points for new achievements
      const newPoints = newUnlockedAchievements.reduce((total, achievementId) => {
        const achievement = achievements.find(a => a.id === achievementId);
        return total + (achievement?.reward.points || 0);
      }, 0);
      
      newProgress.points += newPoints;
      
      // Save updated progress
      localStorage.setItem('fitness-achievements-progress', JSON.stringify(newProgress));
      
      // Show new achievements
      setNewAchievements(newUnlockedAchievements);
    }

    setProgress(newProgress);
  };

  if (!isVisible) return null;

  const earnedAchievements = achievements.filter(a => progress.achievements.includes(a.id));
  const availableAchievements = achievements.filter(a => !progress.achievements.includes(a.id));

  const filteredEarned = selectedFilter === 'all' 
    ? earnedAchievements 
    : earnedAchievements.filter(a => a.category === selectedFilter);

  const filteredAvailable = selectedFilter === 'all' 
    ? availableAchievements 
    : availableAchievements.filter(a => a.category === selectedFilter);

  const getProgressPercentage = (achievement: Achievement): number => {
    switch (achievement.condition.type) {
      case 'workout_count':
        return Math.min((progress.totalWorkouts / achievement.condition.target) * 100, 100);
      case 'exercise_count':
        return Math.min((progress.totalExercises / achievement.condition.target) * 100, 100);
      case 'streak':
        return Math.min((progress.currentStreak / achievement.condition.target) * 100, 100);
      case 'weight_lifted':
        return Math.min((progress.totalWeightLifted / achievement.condition.target) * 100, 100);
      case 'time_trained':
        return Math.min((progress.totalTimeMinutes / achievement.condition.target) * 100, 100);
      case 'category_explored':
        return Math.min((progress.categoriesExplored.length / achievement.condition.target) * 100, 100);
      default:
        return 0;
    }
  };

  const getCurrentValue = (achievement: Achievement): number | string => {
    switch (achievement.condition.type) {
      case 'workout_count':
        return progress.totalWorkouts;
      case 'exercise_count':
        return progress.totalExercises;
      case 'streak':
        return progress.currentStreak;
      case 'weight_lifted':
        return `${progress.totalWeightLifted}kg`;
      case 'time_trained':
        return `${Math.floor(progress.totalTimeMinutes / 60)}h ${progress.totalTimeMinutes % 60}m`;
      case 'category_explored':
        return progress.categoriesExplored.length;
      default:
        return 0;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Icon name="trophy" size={24} />
              Achievement System
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 mobile-touch-target"
            >
              <Icon name="close" size={20} />
            </button>
          </div>

          {/* New Achievements Notification */}
          {newAchievements.length > 0 && (
            <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="star" size={20} className="text-yellow-600 dark:text-yellow-400" />
                <span className="font-semibold text-yellow-800 dark:text-yellow-200">New Achievement{newAchievements.length > 1 ? 's' : ''} Unlocked!</span>
              </div>
              <div className="space-y-2">
                {newAchievements.map(achievementId => {
                  const achievement = achievements.find(a => a.id === achievementId);
                  if (!achievement) return null;
                  return (
                    <div key={achievementId} className="flex items-center gap-3">
                      <Icon name={achievement.icon as keyof typeof import('../icons').Icons} size={16} className={getRarityColor(achievement.rarity)} />
                      <span className="text-yellow-700 dark:text-yellow-300 font-medium">{achievement.name}</span>
                      <span className="text-yellow-600 dark:text-yellow-400">+{achievement.reward.points} points</span>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={() => setNewAchievements([])}
                className="mt-2 text-xs text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* View Toggle */}
          <div className="flex items-center gap-2 mb-6">
            <button
              onClick={() => setActiveView('stats')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors mobile-button-lg ${
                activeView === 'stats'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Icon name="barChart" size={16} className="mr-2" />
              Stats
            </button>
            <button
              onClick={() => setActiveView('earned')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors mobile-button-lg ${
                activeView === 'earned'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Icon name="trophy" size={16} className="mr-2" />
              Earned ({earnedAchievements.length})
            </button>
            <button
              onClick={() => setActiveView('available')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors mobile-button-lg ${
                activeView === 'available'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Icon name="target" size={16} className="mr-2" />
              Available ({availableAchievements.length})
            </button>
          </div>

          {/* Stats View */}
          {activeView === 'stats' && (
            <div className="space-y-6">
              {/* Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{progress.points}</div>
                  <div className="text-sm text-blue-800 dark:text-blue-200">Total Points</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">{earnedAchievements.length}</div>
                  <div className="text-sm text-green-800 dark:text-green-200">Achievements Earned</div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {Math.round((earnedAchievements.length / achievements.length) * 100)}%
                  </div>
                  <div className="text-sm text-purple-800 dark:text-purple-200">Completion</div>
                </div>
              </div>

              {/* Detailed Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="activity" size={20} className="text-gray-600 dark:text-gray-400" />
                    <span className="font-medium text-gray-900 dark:text-white">Workouts</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{progress.totalWorkouts}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Total completed</div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="fire" size={20} className="text-orange-600 dark:text-orange-400" />
                    <span className="font-medium text-gray-900 dark:text-white">Streak</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{progress.currentStreak}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Current days</div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="clock" size={20} className="text-blue-600 dark:text-blue-400" />
                    <span className="font-medium text-gray-900 dark:text-white">Time Trained</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {Math.floor(progress.totalTimeMinutes / 60)}h {progress.totalTimeMinutes % 60}m
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Total time</div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="dumbbell" size={20} className="text-green-600 dark:text-green-400" />
                    <span className="font-medium text-gray-900 dark:text-white">Weight Lifted</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{progress.totalWeightLifted}kg</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Total weight</div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="list" size={20} className="text-purple-600 dark:text-purple-400" />
                    <span className="font-medium text-gray-900 dark:text-white">Exercises</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{progress.totalExercises}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Total logged</div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="flame" size={20} className="text-red-600 dark:text-red-400" />
                    <span className="font-medium text-gray-900 dark:text-white">Best Streak</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{progress.longestStreak}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Longest streak</div>
                </div>
              </div>
            </div>
          )}

          {/* Earned/Available Views */}
          {(activeView === 'earned' || activeView === 'available') && (
            <>
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-6">
                {(['all', 'strength', 'endurance', 'consistency', 'milestone', 'exploration'] as FilterType[]).map(filter => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-3 py-1.5 rounded-md text-sm capitalize transition-colors mobile-button-lg ${
                      selectedFilter === filter
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Achievements Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(activeView === 'earned' ? filteredEarned : filteredAvailable).map(achievement => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg border-2 ${
                      activeView === 'earned'
                        ? getRarityBgColor(achievement.rarity) + ' border-transparent'
                        : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${getRarityBgColor(achievement.rarity)}`}>
                        <Icon 
                          name={achievement.icon as keyof typeof import('../icons').Icons} 
                          size={24} 
                          className={activeView === 'earned' ? getRarityColor(achievement.rarity) : 'text-gray-400'} 
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {achievement.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          {achievement.description}
                        </p>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs px-2 py-1 rounded capitalize ${getRarityBgColor(achievement.rarity)} ${getRarityColor(achievement.rarity)}`}>
                            {achievement.rarity}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                            {achievement.category}
                          </span>
                          <span className="text-xs text-blue-600 dark:text-blue-400">
                            +{achievement.reward.points} pts
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Progress for available achievements */}
                    {activeView === 'available' && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                          <span>Progress</span>
                          <span>{getCurrentValue(achievement)} / {achievement.condition.target}</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${getProgressPercentage(achievement)}%` }}
                          />
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {Math.round(getProgressPercentage(achievement))}% complete
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}