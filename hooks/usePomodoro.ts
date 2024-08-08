import { SessionType, TConfig } from '@/lib/pomodoro/types';
import { getInitialState, getTimerDuration, handleNext } from '@/lib/pomodoro';
import { Duration } from 'luxon';
import { useTimer } from './useTimer';
import { useCallback, useMemo, useState } from 'react';

const defaultConfig: TConfig = {
  focus: Duration.fromObject({ seconds: 10 }),
  shortBreak: Duration.fromObject({ minutes: 5 }),
  longBreak: Duration.fromObject({ minutes: 15 }),
  maxSessions: 4,
};

export const usePomodoro = (config = defaultConfig) => {
  const initialState = useMemo(() => getInitialState(config), [config]);
  const [pomodoro, setPomodoro] = useState(initialState);

  const duration = useMemo(
    () => getTimerDuration(pomodoro, config),
    [pomodoro, config],
  );

  const restart = useCallback(() => {
    setPomodoro(initialState);
  }, [initialState]);

  const onStepComplete = useCallback(() => {
    if (pomodoro.type === SessionType.LONG_BREAK) {
      restart();
    } else {
      const next = handleNext(pomodoro, config);
      setPomodoro(next);
    }
  }, [config, pomodoro, restart]);

  const { time, isRunning, start, stop } = useTimer(duration, onStepComplete);

  const play = useCallback(() => {
    if (!isRunning) {
      start();
    } else {
      stop();
    }
  }, [isRunning, start, stop]);

  const skip = useCallback(() => {
    setPomodoro(prev => handleNext(prev, config));
  }, [config]);

  return { pomodoro, time, play, skip, restart };
};
