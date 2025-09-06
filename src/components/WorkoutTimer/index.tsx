import { Icon } from '../ui/Icon';
import { useTimer } from '@/hooks/useTimer';

interface WorkoutTimerProps {
  isVisible: boolean;
  onFinish: () => void;
}

export function WorkoutTimer({ isVisible, onFinish }: WorkoutTimerProps) {
  const { time, isRunning, start, pause, reset, formattedTime } = useTimer();

  if (!isVisible) return null;

  return (
    <div className="hidden sm:flex items-center space-x-2 bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-lg">
      <span className="text-sm font-mono text-blue-800 dark:text-blue-200">
        {formattedTime}
      </span>
      <button
        onClick={isRunning ? pause : start}
        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 mobile-touch-target"
        title={isRunning ? "Pause timer" : "Start timer"}
      >
        <Icon name={isRunning ? "pause" : "play"} size={16} />
      </button>
      <button
        onClick={reset}
        className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 mobile-touch-target"
        title="Reset timer"
      >
        <Icon name="reset" size={16} />
      </button>
      <button
        onClick={onFinish}
        className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 mobile-button-lg"
        title="Finish workout"
      >
        <Icon name="check" size={12} className="mr-1" />
        Finish
      </button>
    </div>
  );
}