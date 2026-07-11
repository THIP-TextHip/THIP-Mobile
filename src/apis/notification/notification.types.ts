import type { RoomPostType } from "../room";

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

export type PlatformType = "ANDROID" | "IOS" | "WEB";

export interface RegisterNotificationTokenRequest {
  deviceId: string;
  fcmToken: string;
  platformType: PlatformType;
}

export interface CheckNotificationRequest {
  notificationId: number;
}

export interface NotificationRouteParamMap {
  FEED_USER: {
    userId: number;
  };
  FEED_DETAIL: {
    feedId: number;
  };
  ROOM_MAIN: {
    roomId: number;
  };
  ROOM_DETAIL: {
    roomId: number;
  };
  ROOM_POST_DETAIL: {
    roomId: number;
    page: number;
    postId: number;
    postType: RoomPostType;
    openComments: boolean; // true:댓글에 대한 알림, false:댓글이 아닌 부분에 대한 알림
  };
}

export type NotificationRoute = keyof NotificationRouteParamMap;

export type CheckNotificationResponse = {
  [Route in NotificationRoute]: {
    route: Route;
    params: NotificationRouteParamMap[Route];
  };
}[NotificationRoute];

export interface ChangePushNotificationStateRequest {
  enable: boolean;
}

export interface ChangePushNotificationStateResponse {
  isEnabled: boolean;
}

export interface GetPushNotificationStateResponse {
  isEnabled: boolean;
}
