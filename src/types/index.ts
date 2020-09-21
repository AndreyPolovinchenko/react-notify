import * as React from 'react';

export type StylesType = { [key: string]: string | number };

export enum NotificationTypes {
  default = 'default',
  info = 'info',
  success = 'success',
  warning = 'warning',
  error = 'error',
  dark = 'dark'
}

export enum PositionTypes {
  topRight = 'top-right',
  topCenter = 'top-center',
  topLeft = 'top-left',
  bottomRight = 'bottom-right',
  bottomCenter = 'bottom-center',
  bottomLeft = 'bottom-left'
}

export type CustomStylesType = {
  root?: StylesType;
  closeWrapper?: StylesType;
  closeIcon?: StylesType;
};

export type ContainerType = {
  position: PositionTypes;
  typeStyles?: Object;
};

export type MessageType = string | number | Function;

export enum TransitionTypes {
  fade = 'fade',
  bounce = 'bounce',
  slide = 'slide'
}

export type TransitionType = {
  entering?: StylesType;
  entered?: StylesType;
  exiting?: StylesType;
  exited?: StylesType;
  unmounted?: StylesType;
};

export type NotificationType = {
  id: string;
  type?: NotificationTypes;
  message: MessageType;
  in?: boolean;
  position: PositionTypes;
  remove: (id: string) => void;
  onClose?: () => void;
  onClick?: () => void;
  autoClose?: number | boolean;
  customCloseIcon?: string | React.ReactElement | Function;
  typeStyles: Object;
  customStyles?: CustomStylesType;
  pauseOnHover?: boolean;
  transition?: TransitionTypes | TransitionType;
  transitionTimeout?: number;
};

export type TimerType = { resume: () => void; pause: () => void };
