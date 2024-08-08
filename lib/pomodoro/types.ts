import { Duration } from 'luxon';

/*
While the timer is concerned with... time, the Pomodoro wants to
deal with the concepts of focus/break sessions and navigating
between them. Data are the sessions themselves; the operation
you can do on top of them is a change in session according to
pomodoro-peculiar logic.
*/

export enum SessionType {
  FOCUS,
  SHORT_BREAK,
  LONG_BREAK,
}
export type TConfig = {
  focus: Duration;
  shortBreak: Duration;
  longBreak: Duration;
  maxSessions: number;
};

export type TSession = {
  type: SessionType;
  progress: number; // beween 0 and 1
};
