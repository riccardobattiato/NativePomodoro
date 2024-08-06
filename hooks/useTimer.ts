import { Duration } from 'luxon';
import { useCallback, useEffect, useRef, useState } from 'react';

export const useTimer = (duration: Duration) => {
  const [time, setTime] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const nextAnimationFrame = useRef<number>();

  const tick = useCallback((before?: number) => {
    nextAnimationFrame.current = requestAnimationFrame(() => {
      const now = Date.now();
      if (typeof before === 'number') {
        const elapsed = now - before;
        setTime(prev => {
          const newTime = prev.minus(elapsed);
          return newTime.valueOf() >= 0 ? newTime : Duration.fromMillis(0);
        });
      }
      tick(now);
    });
  }, []);

  const stop = useCallback(() => {
    if (nextAnimationFrame.current) {
      cancelAnimationFrame(nextAnimationFrame.current);
      nextAnimationFrame.current = undefined;
    }
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    stop();
    setTime(duration);
  }, [stop, duration]);

  const start = useCallback(() => {
    if (nextAnimationFrame.current) {
      throw new Error('Cannot start a new timer before stopping the previous');
    }
    setIsRunning(true);
    tick();
  }, [tick]);

  // Stops the timer when done
  useEffect(() => {
    if (time.toMillis() === 0) {
      stop();
    }
  }, [time, stop]);

  // Interval cleanup on unmount
  useEffect(() => {
    return () => {
      if (nextAnimationFrame.current) {
        cancelAnimationFrame(nextAnimationFrame.current);
      }
    };
  }, []);

  return { time, isRunning, start, stop, reset };
};
