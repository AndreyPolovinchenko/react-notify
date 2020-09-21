import { MessageType, TimerType } from 'types';

export const createObserver = () => {
  const observers = new Map();

  const subscribe = (key: string, callback: Function) => observers.set(key, callback);

  const dispatch = (key: string, message: MessageType, params: Object) => observers.get(key)?.(message, params);

  return {
    subscribe,
    dispatch
  };
};

export const createNotificationID = () => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 15; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

export const createTimer = (callback: () => void, timeout: number): TimerType => {
  let timerId: number | null = null;
  let start: number | null = null;

  let remaining: number = timeout;

  const pause = () => {
    window.clearTimeout(timerId);
    remaining -= Date.now() - start;
  };

  const resume = () => {
    start = Date.now();
    window.clearTimeout(timerId);
    timerId = window.setTimeout(callback, remaining);
  };

  resume();

  return {
    pause,
    resume
  };
};
