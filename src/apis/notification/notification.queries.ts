import type { InfiniteData } from "@tanstack/react-query";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

import { getNotificationListApi } from "./notification.api";
import { NOTIFICATION_QUERY_KEY } from "./notification.query-key";
import type {
  GetNotificationListResponse,
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
