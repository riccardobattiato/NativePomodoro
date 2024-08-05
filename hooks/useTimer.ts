import { Duration } from 'luxon';
import { useCallback, useEffect, useRef, useState } from 'react';

export const useTimer = (duration: Duration) => {
  const [time, setTime] = useState(duration);
  const nextAnimationFrame = useRef<number>();

  const tick = useCallback((prevTime?: number) => {
    nextAnimationFrame.current = requestAnimationFrame(timestamp => {
      if (typeof prevTime === 'number') {
        const elapsed = timestamp - prevTime;
        setTime(prev => {
          const newTime = prev.minus(elapsed);
          return newTime.valueOf() >= 0 ? newTime : Duration.fromMillis(0);
        });
      }
      tick(timestamp);
    });
  }, []);

  const stop = useCallback(() => {
    if (nextAnimationFrame.current) {
      cancelAnimationFrame(nextAnimationFrame.current);
      nextAnimationFrame.current = undefined;
    }
  }, []);

  const reset = useCallback(() => {
    stop();
    setTime(duration);
  }, [stop, duration]);

  const start = useCallback(() => {
    if (nextAnimationFrame.current) {
      throw new Error('Cannot start a new timer before stopping the previous');
    }
    nextAnimationFrame.current = requestAnimationFrame(tick);
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

  return { time, start, stop, reset };
};
