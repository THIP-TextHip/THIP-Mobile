import { apiClient } from "../api-client";
import { NOTIFICATION_URL } from "../endpoint";
import type {
  GetNotificationListRequest,
  GetNotificationListResponse,
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
