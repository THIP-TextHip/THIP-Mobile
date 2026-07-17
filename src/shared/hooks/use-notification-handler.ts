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

  console.log("2. ", JSON.stringify(data));

  if (!data || typeof data !== "object") {
    return null;
  }

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

    console.log(
      "1. ",
      JSON.stringify(
        lastNotificationResponse.notification.request.content,
        null,
        2,
      ),
    );

    const notificationId = getNotificationIdFromResponse(
      lastNotificationResponse,
    );

    console.log("3. ", notificationId);

    if (notificationId == null) {
      Notifications.clearLastNotificationResponse();
      return;
    }

    checkNotification({ notificationId });
    Notifications.clearLastNotificationResponse();
  }, [checkNotification, isPendingCheckNotification, lastNotificationResponse]);
};
