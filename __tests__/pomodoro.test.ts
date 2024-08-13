import { act } from 'react';
import { renderHook } from '@testing-library/react-native';
import { usePomodoro } from '@/hooks/usePomodoro';
import { describe, expect, it } from '@jest/globals';
import { Duration } from 'luxon';
import { SessionType, TConfig, TSession } from '@/lib/pomodoro/types';
import { getInitialState, isSessionValid } from '@/lib/pomodoro';

describe('pomodoro core', () => {
  it('inits state with correct progress', () => {
    const maxSessions = 4;

    const initialState = getInitialState({ maxSessions } as TConfig);

    expect(initialState.progress).toBe(1 / maxSessions);
  });
});

describe('usePomodoro', () => {
  const params: TConfig = {
    focus: Duration.fromObject({ minutes: 25 }),
    shortBreak: Duration.fromObject({ minutes: 5 }),
    longBreak: Duration.fromObject({ minutes: 15 }),
    maxSessions: 4,
  };
  const step = 1 / params.maxSessions;

  it('inits with params', () => {
    const { result } = renderHook(() => usePomodoro(params));
    const { pomodoro, time } = result.current;

    expect(pomodoro.type).toBe(SessionType.FOCUS);
    expect(pomodoro.progress).toBe(step);
    expect(time.toMillis()).toBe(params.focus.toMillis());
  });

  it('can skip to the next session', () => {
    const { result } = renderHook(() => usePomodoro(params));

    act(() => {
      result.current.skip();
    });

    expect(result.current.pomodoro.type).toBe(SessionType.SHORT_BREAK);
  });

  it('throws an error if provided an invalid session', () => {
    const invalid: TSession = { progress: 2, type: SessionType.FOCUS };

    const isValid = isSessionValid(invalid, params);

    expect(isValid).toBe(false);
  });

  it('performs a cycle using params', () => {
    const { result } = renderHook(() => usePomodoro(params));

    expect(result.current.pomodoro.type).toBe(SessionType.FOCUS);
    expect(result.current.pomodoro.progress).toBe(step);

    act(() => {
      result.current.skip();
    });

    expect(result.current.pomodoro.type).toBe(SessionType.SHORT_BREAK);
    expect(result.current.pomodoro.progress).toBe(step);

    act(() => {
      result.current.skip();
    });

    expect(result.current.pomodoro.type).toBe(SessionType.FOCUS);
    expect(result.current.pomodoro.progress).toBe(2 * step);

    act(() => {
      result.current.skip();
    });

    expect(result.current.pomodoro.type).toBe(SessionType.SHORT_BREAK);
    expect(result.current.pomodoro.progress).toBe(2 * step);

    act(() => {
      result.current.skip();
    });

    expect(result.current.pomodoro.type).toBe(SessionType.FOCUS);
    expect(result.current.pomodoro.progress).toBe(3 * step);

    act(() => {
      result.current.skip();
    });

    expect(result.current.pomodoro.type).toBe(SessionType.SHORT_BREAK);
    expect(result.current.pomodoro.progress).toBe(3 * step);

    act(() => {
      result.current.skip();
    });

    expect(result.current.pomodoro.type).toBe(SessionType.FOCUS);
    expect(result.current.pomodoro.progress).toBe(1);

    act(() => {
      result.current.skip();
    });

    expect(result.current.pomodoro.type).toBe(SessionType.LONG_BREAK);
    expect(result.current.pomodoro.progress).toBe(1);
  });
});
