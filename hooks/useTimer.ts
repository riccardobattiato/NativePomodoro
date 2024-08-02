import { diffRounded } from '@/lib/timer';
import { DateTime, Duration } from 'luxon';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export const useTimer = (duration: Duration) => {
  const [dtStart, setDtStart] = useState<DateTime>();
  const [dtNow, setDtNow] = useState<DateTime>();
  const intervalRef = useRef<NodeJS.Timeout>();

  // A duration object representing remaining time
  // Note: this is for the user to see, we have to smooth imprecisions out
  const time = useMemo(() => {
    if (dtStart && dtNow) {
      const elapsed = diffRounded(dtStart, dtNow);

      return duration.minus(elapsed); // remaining time
    }
    return duration;
  }, [dtStart, dtNow, duration]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  const reset = useCallback(() => {
    stop();
    setDtStart(undefined);
    setDtNow(undefined);
  }, [stop]);

  const start = () => {
    setDtStart(DateTime.now());
    setDtNow(DateTime.now());

    intervalRef.current = setInterval(() => {
      const _dtNow = DateTime.now();
      setDtNow(_dtNow);
    }, 1000);
  };

  // Stops the timer when done. Here the diff stays accurate
  useEffect(() => {
    if (dtStart && dtNow) {
      const diff = dtNow.diff(dtStart);

      if (diff >= duration) {
        stop();
      }
    }
  }, [dtStart, dtNow, duration, stop]);

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
