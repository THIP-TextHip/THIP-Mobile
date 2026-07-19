import {
  getToken as getFirebaseMessagingToken,
  getMessaging,
} from "@react-native-firebase/messaging";
import * as Notifications from "expo-notifications";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

import type { RegisterNotificationTokenRequest } from "./notification/notification.types";

const NOTIFICATION_DEVICE_ID_KEY = "notificationDeviceId";
const DEFAULT_NOTIFICATION_CHANNEL_ID = "default";

type RegisterNotificationToken = (
  request: RegisterNotificationTokenRequest,
) => Promise<unknown>;

const createNotificationDeviceId = () => {
  const randomUUID = globalThis.crypto?.randomUUID?.();

  if (randomUUID) {
    return randomUUID;
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

export const getNotificationDeviceId = async () => {
  const savedDeviceId = await SecureStore.getItemAsync(
    NOTIFICATION_DEVICE_ID_KEY,
  );

  if (savedDeviceId) {
    return savedDeviceId;
  }

  const deviceId = createNotificationDeviceId();
  await SecureStore.setItemAsync(NOTIFICATION_DEVICE_ID_KEY, deviceId);

  return deviceId;
};

export const getSavedNotificationDeviceId = () =>
  SecureStore.getItemAsync(NOTIFICATION_DEVICE_ID_KEY);

const setAndroidNotificationChannel = async () => {
  if (Platform.OS !== "android") {
    return;
  }

  await Notifications.setNotificationChannelAsync(
    DEFAULT_NOTIFICATION_CHANNEL_ID,
    {
      name: DEFAULT_NOTIFICATION_CHANNEL_ID,
      importance: Notifications.AndroidImportance.MAX,
    },
  );
};

const isNotificationPermissionGranted = (
  permissions: Notifications.NotificationPermissionsStatus,
) => {
  if (permissions.status === "granted") {
    return true;
  }

  const iosStatus = permissions.ios?.status;

  return (
    iosStatus === Notifications.IosAuthorizationStatus.AUTHORIZED ||
    iosStatus === Notifications.IosAuthorizationStatus.PROVISIONAL ||
    iosStatus === Notifications.IosAuthorizationStatus.EPHEMERAL
  );
};

const requestNotificationPermission = async () => {
  const existingPermissions = await Notifications.getPermissionsAsync();

  if (isNotificationPermissionGranted(existingPermissions)) {
    return true;
  }

  const requestedPermissions = await Notifications.requestPermissionsAsync();

  return isNotificationPermissionGranted(requestedPermissions);
};

export const getRegisterNotificationTokenRequest =
  async (): Promise<RegisterNotificationTokenRequest | null> => {
    if (Platform.OS === "web") {
      return null;
    }

    await setAndroidNotificationChannel();

    const hasPermission = await requestNotificationPermission();

    if (!hasPermission) {
      return null;
    }

    let fcmToken: string | null;

    if (Platform.OS === "ios") {
      fcmToken = await getFirebaseMessagingToken(getMessaging());
    } else {
      const devicePushToken = await Notifications.getDevicePushTokenAsync();

      fcmToken =
        typeof devicePushToken.data === "string" ? devicePushToken.data : null;
    }

    if (!fcmToken) {
      return null;
    }

    return {
      deviceId: await getNotificationDeviceId(),
      fcmToken,
      platformType:
        Platform.OS === "ios"
          ? "IOS"
          : Platform.OS === "android"
            ? "ANDROID"
            : "WEB",
    };
  };

export const tryRegisterCurrentDeviceNotificationToken = async (
  registerNotificationToken: RegisterNotificationToken,
) => {
  try {
    const request = await getRegisterNotificationTokenRequest();

    if (!request) {
      return false;
    }

    await registerNotificationToken(request);

    return true;
  } catch (error) {
    console.error("[notification] register token failed", error);
    return false;
  }
};
