import { useState, useEffect, useRef } from 'react';

export function useRestTimer() {
  const [restTime, setRestTime] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [targetRestTime, setTargetRestTime] = useState(60); // default 60 seconds
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isResting && restTime > 0) {
      intervalRef.current = setInterval(() => {
        setRestTime(prevTime => {
          if (prevTime <= 1) {
            setIsResting(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isResting, restTime]);

  const startRest = (duration: number = targetRestTime) => {
    setTargetRestTime(duration);
    setRestTime(duration);
    setIsResting(true);
  };

  const pauseRest = () => setIsResting(false);
  const resumeRest = () => setIsResting(true);
  
  const skipRest = () => {
    setRestTime(0);
    setIsResting(false);
  };

  const addTime = (seconds: number) => {
    setRestTime(prevTime => Math.max(0, prevTime + seconds));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    restTime,
    isResting,
    targetRestTime,
    startRest,
    pauseRest,
    resumeRest,
    skipRest,
    addTime,
    formattedTime: formatTime(restTime),
    isFinished: restTime === 0 && !isResting
  };
}