import { NOTIFICATION_TYPE } from './notification.constant';

export interface INotificationState {
  list: INotificationResponse[]; // TODO: Should be list, change when available in api!
}

export interface INotificationResponse {
  id: string;
  createdAt: Date;
  seenAt: Date;

  type: NOTIFICATION_TYPE;

  postId?: string;
  commentId?: string;
}
