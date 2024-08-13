import { SessionType, TConfig } from '@/lib/pomodoro/types';
import { getInitialState, getTimerDuration, handleNext } from '@/lib/pomodoro';
import { Duration } from 'luxon';
import { useTimer } from '@/hooks/useTimer';
import { useCallback, useMemo, useState } from 'react';
import { useNotifications } from '@/hooks/useNotifications';

const defaultConfig: TConfig = {
  focus: Duration.fromObject({ minutes: 25 }),
  shortBreak: Duration.fromObject({ minutes: 5 }),
  longBreak: Duration.fromObject({ minutes: 15 }),
  maxSessions: 4,
};

export const usePomodoro = (config = defaultConfig) => {
  const initialState = useMemo(() => getInitialState(config), [config]);
  const [pomodoro, setPomodoro] = useState(initialState);
  const { sendNotification } = useNotifications();

  const duration = useMemo(
    () => getTimerDuration(pomodoro, config),
    [pomodoro, config],
  );

  const restart = useCallback(() => {
    setPomodoro(initialState);
  }, [initialState]);

  const onStepComplete = useCallback(() => {
    sendNotification("Time's up", 'Start a new session or take a break');
    if (pomodoro.type === SessionType.LONG_BREAK) {
      restart();
    } else {
      const next = handleNext(pomodoro, config);
      setPomodoro(next);
    }
  }, [config, pomodoro, restart, sendNotification]);

  const { time, isRunning, start, stop } = useTimer(duration, onStepComplete);

  const play = useCallback(() => {
    if (!isRunning) {
      start();
    } else {
      stop();
    }
  }, [isRunning, start, stop]);

  const skip = useCallback(() => {
    if (pomodoro.type === SessionType.LONG_BREAK) {
      restart();
    } else {
      setPomodoro(handleNext(pomodoro, config));
    }
  }, [pomodoro, restart, config]);

  return { pomodoro, time, isRunning, play, skip, restart };
};
