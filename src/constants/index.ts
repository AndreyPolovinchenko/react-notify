import { StylesType, NotificationTypes, PositionTypes, TransitionTypes, TransitionType } from 'types';

export const positionStyles: { [key in PositionTypes]: StylesType } = {
  [PositionTypes.topRight]: {
    top: '1rem',
    right: '1rem'
  },
  [PositionTypes.topCenter]: {
    top: '1rem',
    left: '50%',
    transform: 'translateX(-50%)'
  },
  [PositionTypes.topLeft]: {
    top: '1rem',
    left: '1rem'
  },
  [PositionTypes.bottomRight]: {
    bottom: '1rem',
    right: '1rem'
  },
  [PositionTypes.bottomCenter]: {
    bottom: '1rem',
    left: '50%',
    transform: 'translateX(-50%)'
  },
  [PositionTypes.bottomLeft]: {
    bottom: '1rem',
    left: '1rem'
  }
};

export const typeStyles: { [key in NotificationTypes]: StylesType } = {
  [NotificationTypes.default]: {
    backgroundColor: '#ffffff',
    color: '#aaaaaa'
  },
  [NotificationTypes.info]: {
    backgroundColor: '#3498db'
  },
  [NotificationTypes.warning]: {
    backgroundColor: '#f1c40f'
  },
  [NotificationTypes.success]: {
    backgroundColor: '#07bc0c'
  },
  [NotificationTypes.error]: {
    backgroundColor: '#e74c3c'
  },
  [NotificationTypes.dark]: {
    backgroundColor: '#121212'
  }
};

const fadeTransition: TransitionType = {
  entering: { opacity: 0, transition: 'opacity .3s ease-in-out' },
  entered: { opacity: 1, transition: 'opacity .3s ease-in-out' },
  exiting: { opacity: 0, transition: 'opacity .3s ease-in-out' }
};

const slideTransition = (direction: 'X' | 'Y', value: number, withBounce: boolean): TransitionType => ({
  entering: { transform: `translate${direction}(${value}%)`, transition: 'transform .3s linear' },
  entered: {
    transform: `translate${direction}(0)`,
    transition: !withBounce ? 'transform .3s linear' : 'transform .5s cubic-bezier(.75, -0.5, 0, 1.75)'
  },
  exiting: { transform: `translate${direction}(${value}%)`, transition: 'transform .3s linear' }
});

const slideTransitionHorizontal = (value: number, withBounce?: boolean) => slideTransition('X', value, withBounce);
const slideTransitionVertical = (value: number, withBounce?: boolean) => slideTransition('Y', value, withBounce);

export const transitionStyles: { [key in PositionTypes]: { [key in TransitionTypes]: TransitionType } } = {
  [PositionTypes.topRight]: {
    [TransitionTypes.fade]: fadeTransition,
    [TransitionTypes.bounce]: slideTransitionHorizontal(110, true),
    [TransitionTypes.slide]: slideTransitionHorizontal(110)
  },
  [PositionTypes.topCenter]: {
    [TransitionTypes.fade]: fadeTransition,
    [TransitionTypes.bounce]: slideTransitionVertical(-140, true),
    [TransitionTypes.slide]: slideTransitionVertical(-140)
  },
  [PositionTypes.topLeft]: {
    [TransitionTypes.fade]: fadeTransition,
    [TransitionTypes.bounce]: slideTransitionHorizontal(-110, true),
    [TransitionTypes.slide]: slideTransitionHorizontal(-110)
  },
  [PositionTypes.bottomRight]: {
    [TransitionTypes.fade]: fadeTransition,
    [TransitionTypes.bounce]: slideTransitionHorizontal(110, true),
    [TransitionTypes.slide]: slideTransitionHorizontal(110)
  },
  [PositionTypes.bottomCenter]: {
    [TransitionTypes.fade]: fadeTransition,
    [TransitionTypes.bounce]: slideTransitionVertical(140, true),
    [TransitionTypes.slide]: slideTransitionVertical(140)
  },
  [PositionTypes.bottomLeft]: {
    [TransitionTypes.fade]: fadeTransition,
    [TransitionTypes.bounce]: slideTransitionHorizontal(-110, true),
    [TransitionTypes.slide]: slideTransitionHorizontal(-110)
  }
};

export const defaultAutoCloseTime = 4000;
export const defaultTransitionTimeout = 300;
