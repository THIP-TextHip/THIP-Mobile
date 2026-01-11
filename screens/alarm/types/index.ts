export type AlarmType = "feed" | "room";

export interface AlarmResponse {
  notificationId: number;
  title: string;
  content: string;
  isChecked: boolean;
  notificationType: AlarmType;
  postDate: string;
}
