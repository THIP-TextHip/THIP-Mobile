import * as Notifications from "expo-notifications";
import { useEffect } from "react";

import { useCheckNotification } from "@apis/notification";

const parseNotificationId = (value: unknown) => {
  if (typeof value === "number" && Number.isSafeInteger(value)) {
    return value;
  }

  if (typeof value !== "string" || value.trim() === "") {
    return null;
  }

  const notificationId = Number(value);

  return Number.isSafeInteger(notificationId) ? notificationId : null;
};

const getNotificationIdFromResponse = (
  response: Notifications.NotificationResponse,
) => {
  const { data } = response.notification.request.content;

  return parseNotificationId(data.notificationId);
};

export const useNotificationHandler = () => {
  const lastNotificationResponse = Notifications.useLastNotificationResponse();
  const { checkNotification, isPendingCheckNotification } =
    useCheckNotification();

  useEffect(() => {
    if (
      !lastNotificationResponse ||
      isPendingCheckNotification ||
      lastNotificationResponse.actionIdentifier !==
        Notifications.DEFAULT_ACTION_IDENTIFIER
    ) {
      return;
    }

    const notificationId = getNotificationIdFromResponse(
      lastNotificationResponse,
    );

    if (notificationId == null) {
      Notifications.clearLastNotificationResponse();
      return;
    }

    checkNotification({ notificationId });
    Notifications.clearLastNotificationResponse();
  }, [checkNotification, isPendingCheckNotification, lastNotificationResponse]);
};
