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
import { Duration } from 'luxon';

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
    expect(time.valueOf).toBe(duration.valueOf);
  });

  it('returns the correct remaining time after start', () => {
    const { result } = renderHook(() => useTimer(duration));
    act(() => {
      result.current.start();
      jest.advanceTimersByTime(30000);
    });

    const time = result.current.time.valueOf();
    expect(time).toBe(30000);
  });

  it('returns correct remaining time after finishing', () => {
    const { result } = renderHook(() => useTimer(duration));

    act(() => {
      result.current.start();
      jest.advanceTimersByTime(duration.toMillis());
    });

    const time = result.current.time.valueOf();
    expect(time).toBe(0);
  });
});
