export type NotificationType = "feed" | "room";

export interface NotificationItemType {
  notificationId: number;
  title: string;
  content: string;
  isChecked: boolean;
  notificationType: string;
  postDate: string;
}

export interface GetNotificationListRequest {
  cursor?: string | null;
  type?: NotificationType | null;
}

export interface GetNotificationListResponse {
  notifications: NotificationItemType[];
  nextCursor: string;
  isLast: boolean;
}

export interface GetUncheckedNotificationExistsResponse {
  exists: boolean;
}
