import type { InfiniteData } from "@tanstack/react-query";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

import {
  getNotificationListApi,
  getUncheckedNotificationExistsApi,
} from "./notification.api";
import { NOTIFICATION_QUERY_KEY } from "./notification.query-key";
import type {
  GetNotificationListResponse,
  GetUncheckedNotificationExistsResponse,
  NotificationType,
} from "./notification.types";

type NotificationCursor = string | null;

export const useGetNotificationListQuery = (type: NotificationType | null) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending: isPendingNotificationList,
    isError: isErrorNotificationList,
    error,
    refetch: refetchNotificationList,
    isRefetching: isRefetchingNotificationList,
  } = useInfiniteQuery<
    GetNotificationListResponse,
    Error,
    InfiniteData<GetNotificationListResponse, NotificationCursor>,
    ReturnType<typeof NOTIFICATION_QUERY_KEY.LIST>,
    NotificationCursor
  >({
    queryKey: NOTIFICATION_QUERY_KEY.LIST(type),
    queryFn: ({ pageParam }) =>
      getNotificationListApi({
        cursor: pageParam,
        type,
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.isLast ? undefined : lastPage.nextCursor || undefined,
  });

  useEffect(() => {
    if (!isErrorNotificationList || !error) return;

    Toast.show({
      type: "error",
      text1: error.message,
    });
  }, [isErrorNotificationList, error]);

  return {
    notificationList: data?.pages.flatMap((page) => page.notifications) ?? [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPendingNotificationList,
    isErrorNotificationList,
    refetchNotificationList,
    isRefetchingNotificationList,
  };
};

export const useGetUncheckedNotificationExistsQuery = () => {
  const { data, refetch: refetchUncheckedNotificationExists } = useQuery<
    GetUncheckedNotificationExistsResponse,
    Error
  >({
    queryKey: NOTIFICATION_QUERY_KEY.UNCHECKED_EXISTS,
    queryFn: getUncheckedNotificationExistsApi,
  });

  return {
    hasUncheckedNotification: data?.exists ?? false,
    refetchUncheckedNotificationExists,
  };
};
