import { INotificationState } from './notification.interface';
import { NotificationActionsUnion, NotificationsActionTypes } from './notification.actions';

const INITIAL_STATE: INotificationState = {
  list: [],
};

export function notificationReducer(
  state: INotificationState = INITIAL_STATE,
  action: NotificationActionsUnion,
): INotificationState {
  switch (action.type) {
    case NotificationsActionTypes.NEW: {
      return {
        ...state,
        list: [action.payload, ...state.list],
      };
    }

    default: {
      return state;
    }
  }
}
