'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { EXAM_TIME_SECONDS } from '@/config/constants';

/**
 * Hook do cronômetro regressivo para o modo exame.
 */
export function useTimer(isActive: boolean, initialTime?: number) {
  const [timeLeft, setTimeLeft] = useState(initialTime ?? EXAM_TIME_SECONDS);
  const [isExpired, setIsExpired] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const reset = useCallback((time?: number) => {
    stop();
    setTimeLeft(time ?? EXAM_TIME_SECONDS);
    setIsExpired(false);
  }, [stop]);

  useEffect(() => {
    if (!isActive) {
      stop();
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          stop();
          setIsExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return stop;
  }, [isActive, stop]);

  const formatted = formatTime(timeLeft);

  return { timeLeft, formatted, isExpired, stop, reset, setTimeLeft };
}

function formatTime(totalSec: number): string {
  const hrs = Math.floor(totalSec / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;
  return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}
