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
  width: string | number;
  portalId: string;
  baseSettings?: Object;
  typeStyles?: Object;
};

export type MessageType = string | Function;

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
  in?: boolean;
  id: string;
  message: MessageType;
  type: NotificationTypes;
  typeStyles: Object;
  remove: (id: string) => void;
  position: PositionTypes;
  onClose?: () => void;
  onClick?: () => void;
  autoClose?: number | boolean;
  pauseOnHover?: boolean;
  transition: TransitionTypes | TransitionType;
  transitionTimeout: number;
  customCloseIcon?: Function;
  customStyles?: CustomStylesType;
};

export type TimerType = { resume: () => void; pause: () => void };
