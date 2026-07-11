import { RoomPostType } from "../room";

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

export interface DeleteNotificationTokenRequest {
  deviceId: string;
}

export interface CheckNotificationRequest {
  notificationId: number;
}

export type NotificationRoute =
  | "FEED_USER"
  | "FEED_DETAIL"
  | "ROOM_MAIN"
  | "ROOM_DETAIL"
  | "ROOM_POST_DETAIL";

export type NotificationRouteParams =
  | {
      userId: number;
    }
  | {
      feedId: number;
    }
  | {
      roomId: number;
    }
  | {
      roomId: number;
      page: number;
      postId: number;
      postType: RoomPostType;
      openComments: boolean; // true:댓글에 대한 알림, false:댓글이 아닌 부분에 대한 알림
    };

export interface CheckNotificationResponse {
  route: NotificationRoute;
  params: NotificationRouteParams;
}

export interface ChangePushNotificationStateRequest {
  enable: boolean;
  deviceId: string;
}

export interface ChangePushNotificationStateResponse {
  isEnabled: boolean;
}

export interface GetPushNotificationStateRequest {
  deviceId: string;
}

export interface GetPushNotificationStateResponse {
  isEnabled: boolean;
}
