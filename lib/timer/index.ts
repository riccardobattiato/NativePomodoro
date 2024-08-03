import { DateTime, Duration } from 'luxon';

/**
 * Calculates the diff between the provided points in time
 * while rounding seconds due to potential imprecisions
 */
export function getElapsedTime(start: DateTime, end: DateTime): Duration {
  const elapsed = end.diff(start, 'seconds').mapUnits((x, u) => {
    if (u === 'seconds') {
      return Math.round(x);
    }
    return x;
  });

  return elapsed;
}
