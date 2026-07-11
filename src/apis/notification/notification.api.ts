import { apiClient } from "../api-client";
import { NOTIFICATION_URL } from "../endpoint";
import {
  getNotificationDeviceId,
  getSavedNotificationDeviceId,
} from "../notification-token";
import type {
  ChangePushNotificationStateRequest,
  ChangePushNotificationStateResponse,
  CheckNotificationRequest,
  CheckNotificationResponse,
  GetNotificationListRequest,
  GetNotificationListResponse,
  GetPushNotificationStateResponse,
  GetUncheckedNotificationExistsResponse,
  RegisterNotificationTokenRequest,
} from "./notification.types";

export const getNotificationListApi = async ({
  cursor,
  type,
}: GetNotificationListRequest) => {
  const response = await apiClient.get<GetNotificationListResponse>(
    NOTIFICATION_URL.DEFAULT,
    {
      params: {
        ...(cursor == null ? {} : { cursor }),
        ...(type == null ? {} : { type }),
      },
    },
  );

  return response.data;
};

export const getUncheckedNotificationExistsApi = async () => {
  const response = await apiClient.get<GetUncheckedNotificationExistsResponse>(
    NOTIFICATION_URL.UNCHECKED,
  );

  return response.data;
};

export const registerNotificationTokenApi = async (
  body: RegisterNotificationTokenRequest,
) => {
  const response = await apiClient.post<string>(NOTIFICATION_URL.TOKEN, body);

  return response.data;
};

export const deleteNotificationTokenApi = async () => {
  const deviceId = await getSavedNotificationDeviceId();

  if (!deviceId) {
    return null;
  }

  const response = await apiClient.delete<string>(NOTIFICATION_URL.TOKEN, {
    data: {
      deviceId,
    },
  });

  return response.data;
};

export const checkNotificationApi = async ({
  notificationId,
}: CheckNotificationRequest) => {
  const response = await apiClient.post<CheckNotificationResponse>(
    NOTIFICATION_URL.CHECK,
    { notificationId },
  );

  return response.data;
};

export const changePushNotificationStateApi = async ({
  enable,
}: ChangePushNotificationStateRequest) => {
  const deviceId = await getNotificationDeviceId();

  const response = await apiClient.patch<ChangePushNotificationStateResponse>(
    NOTIFICATION_URL.CHANGE_STATE,
    {
      enable,
      deviceId,
    },
  );

  return response.data;
};

export const getPushNotificationStateApi = async () => {
  const deviceId = await getNotificationDeviceId();
  const response = await apiClient.get<GetPushNotificationStateResponse>(
    NOTIFICATION_URL.PUSH_NOTIFICATION,
    { params: { deviceId } },
  );

  return response.data;
};
