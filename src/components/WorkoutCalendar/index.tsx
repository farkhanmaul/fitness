import { useState } from 'react';
import { Icon } from '../ui/Icon';
import { WorkoutSchedule, CalendarView } from '@/types/calendar';
import { useWorkoutSchedule } from '@/hooks/useWorkoutSchedule';
import { 
  formatDate, 
  formatDisplayDate, 
  getWeekDates, 
  getMonthDates, 
  addWeeks,
  isToday,
  isPastDate,
  isSameMonth
} from '@/utils/dateHelpers';

interface WorkoutCalendarProps {
  isVisible: boolean;
  onClose: () => void;
  onScheduleWorkout?: (date: string) => void;
}

export function WorkoutCalendar({ isVisible, onClose, onScheduleWorkout }: WorkoutCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<CalendarView>('week');
  const { 
    schedule, 
    getWorkoutsForDate, 
    completeWorkout, 
    skipWorkout, 
    getUpcomingWorkouts,
    getWorkoutStreak 
  } = useWorkoutSchedule();

  if (!isVisible) return null;

  const dates = view === 'week' ? getWeekDates(currentDate) : getMonthDates(currentDate);
  const upcomingWorkouts = getUpcomingWorkouts(3);
  const currentStreak = getWorkoutStreak();

  const navigateDate = (direction: 'prev' | 'next') => {
    if (view === 'week') {
      setCurrentDate(addWeeks(currentDate, direction === 'next' ? 1 : -1));
    } else {
      const newDate = new Date(currentDate);
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
      setCurrentDate(newDate);
    }
  };

  const getStatusColor = (status: WorkoutSchedule['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'skipped':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Icon name="calendar" size={24} />
              Workout Calendar
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 mobile-touch-target"
            >
              <Icon name="close" size={20} />
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Icon name="activity" size={16} className="text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Current Streak</span>
              </div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{currentStreak} days</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Icon name="check" size={16} className="text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-green-800 dark:text-green-200">This Week</span>
              </div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {schedule.filter(w => {
                  const weekDates = getWeekDates(new Date());
                  const workoutDate = new Date(w.date);
                  return weekDates.some(d => formatDate(d) === formatDate(workoutDate)) && w.status === 'completed';
                }).length}
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Icon name="clock" size={16} className="text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-medium text-purple-800 dark:text-purple-200">Upcoming</span>
              </div>
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{upcomingWorkouts.length}</div>
            </div>
          </div>

          {/* Calendar Controls */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigateDate('prev')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded mobile-touch-target"
              >
                <Icon name="chevronRight" size={20} className="rotate-180" />
              </button>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {currentDate.toLocaleDateString('en-US', { 
                  month: 'long', 
                  year: 'numeric',
                  ...(view === 'week' ? { day: 'numeric' } : {})
                })}
              </h3>
              <button
                onClick={() => navigateDate('next')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded mobile-touch-target"
              >
                <Icon name="chevronRight" size={20} />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setView('week')}
                className={`px-3 py-1 rounded text-sm ${
                  view === 'week' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                } mobile-button-lg`}
              >
                Week
              </button>
              <button
                onClick={() => setView('month')}
                className={`px-3 py-1 rounded text-sm ${
                  view === 'month' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                } mobile-button-lg`}
              >
                Month
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className={`grid gap-2 mb-6 ${view === 'week' ? 'grid-cols-7' : 'grid-cols-7'}`}>
            {/* Day headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2">
                {day}
              </div>
            ))}

            {/* Calendar dates */}
            {dates.map(date => {
              const dateStr = formatDate(date);
              const workouts = getWorkoutsForDate(date);
              const isCurrentMonth = view === 'month' ? isSameMonth(date, currentDate) : true;

              return (
                <div
                  key={dateStr}
                  className={`min-h-[80px] p-2 border rounded cursor-pointer transition-colors ${
                    isToday(date) 
                      ? 'bg-blue-50 border-blue-300 dark:bg-blue-900/20 dark:border-blue-600' 
                      : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                  } ${
                    !isCurrentMonth ? 'opacity-40' : ''
                  }`}
                  onClick={() => onScheduleWorkout?.(dateStr)}
                >
                  <div className={`text-sm font-medium mb-1 ${
                    isToday(date) ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
                  }`}>
                    {date.getDate()}
                  </div>
                  
                  <div className="space-y-1">
                    {workouts.slice(0, view === 'week' ? 3 : 2).map(workout => (
                      <div
                        key={workout.id}
                        className={`text-xs p-1 rounded truncate ${getStatusColor(workout.status)}`}
                        title={`${workout.workoutName} - ${workout.status}`}
                      >
                        {workout.workoutName}
                      </div>
                    ))}
                    {workouts.length > (view === 'week' ? 3 : 2) && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        +{workouts.length - (view === 'week' ? 3 : 2)} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Upcoming Workouts */}
          {upcomingWorkouts.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Icon name="clock" size={18} />
                Upcoming Workouts
              </h4>
              <div className="space-y-2">
                {upcomingWorkouts.map(workout => (
                  <div key={workout.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{workout.workoutName}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDisplayDate(workout.date)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => completeWorkout(workout.id)}
                        className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded text-xs hover:bg-green-200 dark:hover:bg-green-800 mobile-button-lg"
                      >
                        <Icon name="check" size={12} className="mr-1" />
                        Complete
                      </button>
                      <button
                        onClick={() => skipWorkout(workout.id)}
                        className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded text-xs hover:bg-red-200 dark:hover:bg-red-800 mobile-button-lg"
                      >
                        Skip
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}