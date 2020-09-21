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
  id,
  type,
  message,
  in: render,
  position,
  remove,
  onClose,
  onClick,
  autoClose,
  customCloseIcon,
  typeStyles,
  customStyles,
  pauseOnHover,
  transition,
  transitionTimeout
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
      {(state) => {
        return (
          <div
            data-test-id="root"
            className={css(
              styles.notification({
                // @ts-ignore
                ...typeStyles[type],
                ...customStyles?.root,
                ...(typeof transition !== 'string' ? transition[state] : transitionStyles[position][transition][state])
              })._
            )}
            onClick={onClick}
            onMouseEnter={() => handlePause(true)}
            onMouseLeave={() => handlePause(false)}
          >
            <div
              data-test-id="close"
              onClick={handleClose}
              className={css(styles.closeWrapper(customStyles?.closeWrapper)._)}
            >
              {customCloseIcon ? (
                typeof customCloseIcon !== 'function' ? (
                  customCloseIcon
                ) : (
                  customCloseIcon()
                )
              ) : (
                <Close className={css(styles.close(customStyles?.closeIcon)._)} />
              )}
            </div>
            <span data-test-id="message">{typeof message !== 'function' ? message : message()}</span>
          </div>
        );
      }}
    </Transition>
  );
};

Notification.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(Object.values(NotificationTypes)),
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.func]).isRequired,
  in: PropTypes.bool,
  position: PropTypes.oneOf(Object.values(PositionTypes)).isRequired,
  remove: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  onClick: PropTypes.func,
  autoClose: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  customCloseIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]),
  typeStyles: PropTypes.object.isRequired,
  customStyles: PropTypes.object,
  pauseOnHover: PropTypes.bool,
  transition: PropTypes.oneOfType([PropTypes.oneOf(Object.values(TransitionTypes)), PropTypes.object]),
  transitionTimeout: PropTypes.number
};

Notification.defaultProps = {
  type: NotificationTypes.default,
  autoClose: defaultAutoCloseTime,
  pauseOnHover: true,
  transition: TransitionTypes.slide,
  transitionTimeout: defaultTransitionTimeout
};
