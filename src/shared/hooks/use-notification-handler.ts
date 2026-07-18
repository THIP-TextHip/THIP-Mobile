import * as Notifications from "expo-notifications";
import { useEffect } from "react";

import { useCheckNotification } from "@apis/notification";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

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

const getPushTriggerData = (trigger: unknown) => {
  if (!isRecord(trigger) || trigger.type !== "push") {
    return [];
  }

  // Expo exposes APNs userInfo through payload on iOS and FCM data through
  // remoteMessage on Android.
  const remoteMessage = isRecord(trigger.remoteMessage)
    ? trigger.remoteMessage
    : null;

  return [trigger.payload, remoteMessage?.data].filter(isRecord);
};

export const getNotificationIdFromResponse = (
  response: Notifications.NotificationResponse,
) => {
  const { content, trigger } = response.notification.request;
  const dataCandidates = [
    ...(isRecord(content.data) ? [content.data] : []),
    ...getPushTriggerData(trigger),
  ];

  for (const data of dataCandidates) {
    const notificationId = parseNotificationId(data.notificationId);

    if (notificationId !== null) {
      return notificationId;
    }
  }

  return null;
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
      console.warn(
        "[useNotificationHandler] notificationId가 없는 알림 응답입니다.",
        lastNotificationResponse.notification.request.trigger,
      );
      Notifications.clearLastNotificationResponse();
      return;
    }

    checkNotification({ notificationId });
    Notifications.clearLastNotificationResponse();
  }, [checkNotification, isPendingCheckNotification, lastNotificationResponse]);
};
