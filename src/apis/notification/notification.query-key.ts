import type { NotificationType } from "./notification.types";

export const NOTIFICATION_QUERY_KEY = {
  ALL: ["notifications"],
  LIST: (type?: NotificationType | null) => ["notifications", type],
  UNCHECKED_EXISTS: ["notifications", "exists-unchecked"],
  NOTIFICATION_STATE: (deviceId: string) => [
    "notifications",
    "state",
    deviceId,
  ],
} as const;
