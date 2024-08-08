import { Duration } from 'luxon';
import { SessionType, TConfig, TSession } from './types';

export const getInitialState = ({ maxSessions }: TConfig): TSession => ({
  type: SessionType.FOCUS,
  progress: 1 / maxSessions,
});

export const isSessionValid = (
  { progress }: TSession,
  { maxSessions }: TConfig,
): boolean => progress >= 1 / maxSessions && progress <= 1;

/**
 * Advances a Pomodoro session to the next one, according to the current
 * type and overall progress.
 * This function can be called both by the user when they skip one step and
 * from the application when a timer is over.
 * @param session describes current type of timer and overall progress
 * @param config from user or default
 */
export function handleNext(session: TSession, config: TConfig): TSession {
  if (!isSessionValid(session, config)) {
    throw new Error('Invalid session');
  }
  if (session.type === SessionType.LONG_BREAK) {
    throw new Error('Cannot advance a finished pomodoro');
  }
  if (session.progress === 1) {
    return {
      ...session,
      type: SessionType.LONG_BREAK,
    };
  }
  if (session.type === SessionType.FOCUS) {
    return {
      ...session,
      type: SessionType.SHORT_BREAK,
    };
  }
  return {
    progress: session.progress + 1 / config.maxSessions,
    type: SessionType.FOCUS,
  };
}

export function getTimerDuration(
  { type }: TSession,
  config: TConfig,
): Duration {
  switch (type) {
    case SessionType.FOCUS:
      return config.focus;
    case SessionType.SHORT_BREAK:
      return config.shortBreak;
    case SessionType.LONG_BREAK:
      return config.longBreak;
    default:
      return Duration.fromMillis(0);
  }
}
