import { act } from 'react';
import { renderHook } from '@testing-library/react-native';
import { useTimer } from '@/hooks/useTimer';
import {
  jest,
  describe,
  expect,
  it,
  beforeEach,
  afterEach,
} from '@jest/globals';
import { DateTime, Duration } from 'luxon';
import { getElapsedTime } from '@/lib/timer';

describe('getElapsedTime', () => {
  it('treats minor variations as the same moment', () => {
    // 2024, August 03, 09:30, nearing 50 seconds from below
    const a = DateTime.local(2024, 8, 3, 9, 30, 49, 998);
    // 2024, August 03, 09:30, nearing 50 seconds from above
    const b = DateTime.local(2024, 8, 3, 9, 30, 50, 150);

    const diff = getElapsedTime(b, a);
    expect(diff.seconds).toBe(0);
  });
});

describe('useTimer', () => {
  const duration = Duration.fromObject({ minutes: 1 });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllTimers();
  });

  it('returns the full duration when not started', () => {
    const { result } = renderHook(() => useTimer(duration));
    const time = result.current.time;
    expect(time).toEqual(duration);
  });

  it('returns the correct remaining time after start', () => {
    const { result } = renderHook(() => useTimer(duration));
    act(() => {
      result.current.start();
      jest.advanceTimersByTime(30000);
    });

    const time = result.current.time;
    expect(time.seconds).toBe(-30);
  });

  it('returns correct remaining time after finishing', () => {
    const { result } = renderHook(() => useTimer(duration));

    act(() => {
      result.current.start();
      jest.advanceTimersByTime(duration.toMillis());
    });

    const time = result.current.time;
    expect(time.seconds).toBe(-60);
  });
});
