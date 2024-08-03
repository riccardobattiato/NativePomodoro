import { getElapsedTime } from '@/lib/timer';
import { DateTime, Duration } from 'luxon';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export const useTimer = (duration: Duration) => {
  const [segments, setSegments] = useState<Duration[]>([]); // current run is always first item
  const intervalRef = useRef<NodeJS.Timeout>();

  const elapsed = useMemo(
    () =>
      segments.reduce(
        (total, current) => total.plus(current),
        Duration.fromMillis(0),
      ),
    [segments],
  );

  const time = useMemo(() => duration.minus(elapsed), [duration, elapsed]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
    // unshift a dummy duration for the interval method to overwrite
    setSegments(prev => {
      const zero = Duration.fromMillis(0);
      if (prev.length === 0) {
        return [zero];
      } else if (prev[0].toMillis() !== 0) {
        return [zero, ...prev];
      }
      return prev;
    });
  }, []);

  const reset = useCallback(() => {
    stop();
    setSegments([]);
  }, [stop]);

  // we query the OS for actual time difference for accuracy
  const start = useCallback(() => {
    const dtStart = DateTime.now();

    intervalRef.current = setInterval(() => {
      const dtNow = DateTime.now();
      const _elapsed = getElapsedTime(dtStart, dtNow);

      setSegments(prev => {
        const [_, ...rest] = prev;
        return [_elapsed, ...rest]; // current run is always first item
      });
    }, 1000);
  }, []);

  // Stops the timer when done. Here the diff stays accurate
  useEffect(() => {
    if (elapsed >= duration) {
      stop();
    }
  }, [elapsed, duration, stop]);

  // Interval cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { time, start, stop, reset };
};
