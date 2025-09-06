import { Icon } from '../ui/Icon';
import { useRestTimer } from '@/hooks/useRestTimer';

interface RestTimerProps {
  isVisible: boolean;
  onClose: () => void;
}

export function RestTimer({ isVisible, onClose }: RestTimerProps) {
  const {
    restTime,
    isResting,
    formattedTime,
    startRest,
    pauseRest,
    resumeRest,
    skipRest,
    addTime,
    isFinished
  } = useRestTimer();

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 z-50 min-w-[280px] border">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Icon name="timer" size={18} />
          Rest Timer
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <Icon name="close" size={16} />
        </button>
      </div>

      <div className="text-center mb-4">
        <div className={`text-3xl font-mono font-bold mb-2 ${
          restTime <= 10 ? 'text-red-500' : 'text-blue-600 dark:text-blue-400'
        }`}>
          {formattedTime}
        </div>
        
        {isFinished && (
          <div className="text-green-600 dark:text-green-400 font-medium">
            Rest Complete! 🎉
          </div>
        )}
      </div>

      {/* Quick start buttons */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <button
          onClick={() => startRest(30)}
          className="px-2 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-xs rounded transition-colors"
        >
          30s
        </button>
        <button
          onClick={() => startRest(60)}
          className="px-2 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-xs rounded transition-colors"
        >
          1m
        </button>
        <button
          onClick={() => startRest(90)}
          className="px-2 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-xs rounded transition-colors"
        >
          90s
        </button>
        <button
          onClick={() => startRest(120)}
          className="px-2 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-xs rounded transition-colors"
        >
          2m
        </button>
        <button
          onClick={() => startRest(180)}
          className="px-2 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-xs rounded transition-colors"
        >
          3m
        </button>
        <button
          onClick={() => startRest(300)}
          className="px-2 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-xs rounded transition-colors"
        >
          5m
        </button>
      </div>

      {/* Control buttons */}
      <div className="flex items-center justify-center gap-2">
        {restTime > 0 && (
          <>
            <button
              onClick={() => addTime(-15)}
              className="p-2 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded mobile-touch-target"
              title="Remove 15s"
            >
              <Icon name="minus" size={16} />
            </button>
            <button
              onClick={isResting ? pauseRest : resumeRest}
              className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded mobile-touch-target"
              title={isResting ? "Pause" : "Resume"}
            >
              <Icon name={isResting ? "pause" : "play"} size={16} />
            </button>
            <button
              onClick={() => addTime(15)}
              className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded mobile-touch-target"
              title="Add 15s"
            >
              <Icon name="plus" size={16} />
            </button>
            <button
              onClick={skipRest}
              className="px-3 py-1 bg-gray-500 text-white hover:bg-gray-600 rounded text-sm mobile-button-lg"
              title="Skip rest"
            >
              Skip
            </button>
          </>
        )}
      </div>
    </div>
  );
}