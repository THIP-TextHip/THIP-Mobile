import type { NotificationType } from "./notification.types";

export const NOTIFICATION_QUERY_KEY = {
  LIST: (type?: NotificationType | null) => ["notifications", type],
} as const;
