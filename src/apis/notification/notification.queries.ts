import type { InfiniteData } from "@tanstack/react-query";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

import {
  changePushNotificationStateApi,
  checkNotificationApi,
  deleteNotificationTokenApi,
  getNotificationListApi,
  getPushNotificationStateApi,
  getUncheckedNotificationExistsApi,
  registerNotificationTokenApi,
} from "./notification.api";
import { NOTIFICATION_ROUTE } from "./notification.constant";
import { NOTIFICATION_QUERY_KEY } from "./notification.query-key";
import {
  ChangePushNotificationStateRequest,
  ChangePushNotificationStateResponse,
  GetPushNotificationStateResponse,
  type CheckNotificationRequest,
  type CheckNotificationResponse,
  type DeleteNotificationTokenRequest,
  type GetNotificationListResponse,
  type GetUncheckedNotificationExistsResponse,
  type NotificationType,
  type RegisterNotificationTokenRequest,
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

export const useRegisterNotificationToken = () => {
  const {
    mutate: registerNotificationToken,
    mutateAsync: registerNotificationTokenAsync,
    isPending: isPendingRegisterNotificationToken,
    isError: isErrorRegisterNotificationToken,
    error: registerNotificationTokenError,
  } = useMutation<string, Error, RegisterNotificationTokenRequest>({
    mutationFn: registerNotificationTokenApi,
  });

  return {
    registerNotificationToken,
    registerNotificationTokenAsync,
    isPendingRegisterNotificationToken,
    isErrorRegisterNotificationToken,
    registerNotificationTokenError,
  };
};

export const useDeleteNotificationToken = () => {
  const { mutate: deleteNotificationToken } = useMutation<
    string,
    Error,
    DeleteNotificationTokenRequest
  >({
    mutationFn: deleteNotificationTokenApi,
  });

  return {
    deleteNotificationToken,
  };
};

export const useCheckNotification = () => {
  const queryClient = useQueryClient();
  const {
    mutate: checkNotification,
    isPending: isPendingCheckNotification,
    isError,
    error,
  } = useMutation<CheckNotificationResponse, Error, CheckNotificationRequest>({
    mutationFn: checkNotificationApi,
    // TODO: 읽은 알림 타입에 맞춰 알맞은 페이지로 이동시키기
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: NOTIFICATION_QUERY_KEY.ALL,
      });
      if (data.route === NOTIFICATION_ROUTE.FEED_USER) {
        // router.push({
        //     pathname:"/"
        // })
      }
    },
  });

  useEffect(() => {
    if (!isError || !error) return;

    Toast.show({
      type: "error",
      text1: error.message,
    });

    router.push("/feed");
  }, [isError, error]);

  return {
    checkNotification,
    isPendingCheckNotification,
  };
};

export const useGetPushNotificationState = (deviceId: string) => {
  const {
    data,
    isPending: isPendingPushNotificationData,
    isError: isErrorPushNotificationData,
    error,
  } = useQuery<GetPushNotificationStateResponse, Error>({
    queryKey: NOTIFICATION_QUERY_KEY.NOTIFICATION_STATE(deviceId),
    queryFn: () => getPushNotificationStateApi({ deviceId }),
  });

  useEffect(() => {
    if (!isErrorPushNotificationData || !error) return;

    Toast.show({
      type: "error",
      text1: error.message,
    });
  }, [isErrorPushNotificationData, error]);

  const isPushNotificationEnabled = data?.isEnabled ?? false;

  return {
    isPushNotificationEnabled,
    isPendingPushNotificationData,
    isErrorPushNotificationData,
  };
};

export const useChangePushNotificationState = () => {
  const queryClient = useQueryClient();

  const {
    mutate: changePushNotification,
    isPending: isPendingChangePushNotification,
    isError,
    error,
  } = useMutation<
    ChangePushNotificationStateResponse,
    Error,
    ChangePushNotificationStateRequest
  >({
    mutationFn: changePushNotificationStateApi,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: NOTIFICATION_QUERY_KEY.NOTIFICATION_STATE(variables.deviceId),
      });
    },
  });

  useEffect(() => {
    if (!isError || !error) return;

    Toast.show({
      type: "error",
      text1: error.message,
    });
  }, [isError, error]);

  return {
    changePushNotification,
    isPendingChangePushNotification,
  };
};
