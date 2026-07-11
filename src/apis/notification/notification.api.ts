import { apiClient } from "../api-client";
import { NOTIFICATION_URL } from "../endpoint";
import {
  ChangePushNotificationStateRequest,
  ChangePushNotificationStateResponse,
  CheckNotificationResponse,
  GetPushNotificationStateRequest,
  GetPushNotificationStateResponse,
  type CheckNotificationRequest,
  type DeleteNotificationTokenRequest,
  type GetNotificationListRequest,
  type GetNotificationListResponse,
  type GetUncheckedNotificationExistsResponse,
  type RegisterNotificationTokenRequest,
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

export const deleteNotificationTokenApi = async (
  body: DeleteNotificationTokenRequest,
) => {
  const response = await apiClient.delete<string>(NOTIFICATION_URL.TOKEN, {
    data: body,
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

export const changePushNotificationStateApi = async (
  body: ChangePushNotificationStateRequest,
) => {
  const response = await apiClient.post<ChangePushNotificationStateResponse>(
    NOTIFICATION_URL.CHANGE_STATE,
    body,
  );

  return response.data;
};

export const getPushNotificationStateApi = async ({
  deviceId,
}: GetPushNotificationStateRequest) => {
  const response = await apiClient.get<GetPushNotificationStateResponse>(
    NOTIFICATION_URL.PUSH_NOTIFICATION,
    { params: { deviceId } },
  );

  return response.data;
};
