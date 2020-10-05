import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { NotificationTypes, NotificationType, TransitionTypes, TimerType, PositionTypes } from 'types';
import { defaultAutoCloseTime, defaultTransitionTimeout, transitionStyles } from 'constants';
import { createTimer } from 'utils';
import Close from 'icons/close.svg';
import { css } from 'aphrodite/no-important';
import * as styles from './style';

export const Notification: React.FC<NotificationType> = ({
  in: render,
  id,
  message,
  type,
  typeStyles,
  remove,
  position,
  onClose,
  onClick,
  autoClose,
  pauseOnHover,
  transition,
  transitionTimeout,
  customCloseIcon,
  customStyles
}) => {
  let closingTimer: null | TimerType = null;

  const handleClose = React.useCallback(
    (e) => {
      e.stopPropagation();
      remove(id);
      onClose?.();
    },
    [remove, onClose, id]
  );

  const handlePause = React.useCallback(
    (isPaused) => autoClose && pauseOnHover && (isPaused ? closingTimer.pause() : closingTimer.resume()),
    [autoClose, pauseOnHover, closingTimer]
  );

  React.useEffect(() => {
    if (autoClose) {
      const closingTimeout = typeof autoClose !== 'number' ? defaultAutoCloseTime : autoClose;
      closingTimer = createTimer(() => remove(id), closingTimeout);
    }
  }, []);

  return (
    <Transition in={render} timeout={transitionTimeout} appear unmountOnExit>
      {(state) => (
        <div
          data-test-id="notification"
          className={css(
            styles.notification({
              // @ts-ignore
              ...typeStyles[type],
              ...customStyles?.root,
              ...(typeof transition !== 'string' ? transition[state] : transitionStyles[position][transition][state])
            })._
          )}
          onClick={(e) => {
            onClick?.();
            handleClose(e);
          }}
          onMouseEnter={() => handlePause(true)}
          onMouseLeave={() => handlePause(false)}
        >
          <div
            data-test-id="notification-close-wrapper"
            onClick={handleClose}
            className={css(styles.closeWrapper(customStyles?.closeWrapper)._)}
          >
            {customCloseIcon ? customCloseIcon() : <Close className={css(styles.close(customStyles?.closeIcon)._)} />}
          </div>
          <div data-test-id="notification-message">{typeof message !== 'function' ? message : message()}</div>
        </div>
      )}
    </Transition>
  );
};

Notification.propTypes = {
  in: PropTypes.bool,
  id: PropTypes.string.isRequired,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  type: PropTypes.oneOf(Object.values(NotificationTypes)),
  typeStyles: PropTypes.object.isRequired,
  remove: PropTypes.func.isRequired,
  position: PropTypes.oneOf(Object.values(PositionTypes)).isRequired,
  onClose: PropTypes.func,
  onClick: PropTypes.func,
  autoClose: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  pauseOnHover: PropTypes.bool,
  transition: PropTypes.oneOfType([PropTypes.oneOf(Object.values(TransitionTypes)), PropTypes.object]),
  transitionTimeout: PropTypes.number,
  customCloseIcon: PropTypes.func,
  customStyles: PropTypes.object
};

Notification.defaultProps = {
  type: NotificationTypes.default,
  autoClose: true,
  pauseOnHover: true,
  transition: TransitionTypes.slide,
  transitionTimeout: defaultTransitionTimeout
};
