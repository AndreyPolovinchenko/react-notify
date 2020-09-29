import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as ReactDOM from 'react-dom';
import { TransitionGroup } from 'react-transition-group';
import { Notification } from 'components';
import { ContainerType, NotificationType, PositionTypes, MessageType } from 'types';
import { typeStyles as defaultTypeStyles } from 'constants';
import { createObserver, createNotificationID } from 'utils';
import { css } from 'aphrodite/no-important';

import * as styles from './style';

const { subscribe, dispatch } = createObserver();

export const Notifications: React.FC<ContainerType> = ({ position, width, typeStyles }) => {
  const [notifications, setNotifications]: [Array<NotificationType>, Function] = React.useState([]);

  const addNotification = React.useCallback(
    (message: MessageType, params: NotificationType) =>
      setNotifications((notifications: Array<NotificationType>) => {
        switch (position) {
          case PositionTypes.topLeft:
          case PositionTypes.topCenter:
          case PositionTypes.topRight:
            return [{ id: createNotificationID(), message, ...params }, ...notifications];
          case PositionTypes.bottomLeft:
          case PositionTypes.bottomCenter:
          case PositionTypes.bottomRight:
            return [...notifications, { id: createNotificationID(), message, ...params }];
        }
      }),
    [notifications.length]
  );

  const removeNotification = React.useCallback(
    (id: string) =>
      setNotifications((notifications: Array<NotificationType>) =>
        notifications.filter((notification) => notification.id !== id)
      ),
    [notifications.length]
  );

  subscribe('addNotification', addNotification);

  return ReactDOM.createPortal(
    <div className={css(styles.container(position, width, !!notifications.length)._)}>
      <TransitionGroup component={null}>
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            position={position}
            typeStyles={{ ...defaultTypeStyles, ...typeStyles }}
            remove={removeNotification}
            {...notification}
          />
        ))}
      </TransitionGroup>
    </div>,
    document.body
  );
};

Notifications.propTypes = {
  position: PropTypes.oneOf(Object.values(PositionTypes)),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  typeStyles: PropTypes.object
};

Notifications.defaultProps = {
  position: PositionTypes.topRight,
  width: 320
};

export const addNotification = (message: MessageType, params: NotificationType) =>
  dispatch('addNotification', message, params);
