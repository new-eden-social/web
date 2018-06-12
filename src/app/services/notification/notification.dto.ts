import { NOTIFICATION_TYPE } from './notification.constant';
import { DPagination } from '../paggination.dto';

export class DNotification {
  id: string;
  createdAt: Date;
  seenAt: Date;

  type: NOTIFICATION_TYPE;

  postId?: string;
  commentId?: string;
}

export class DNotificationList extends DPagination<DNotification> {
}
