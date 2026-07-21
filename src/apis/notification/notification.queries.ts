import type { InfiniteData } from "@tanstack/react-query";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { router } from "expo-router";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

import { getFormattedCurrentDateTime } from "@shared/utils";

import { ApiErrorResponse } from "../api-client";
import { COMMENT_QUERY_KEY } from "../comment";
import { FEED_QUERY_KEY } from "../feed";
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
import type {
  ChangePushNotificationStateRequest,
  ChangePushNotificationStateResponse,
  CheckNotificationRequest,
  CheckNotificationResponse,
  GetNotificationListResponse,
  GetPushNotificationStateResponse,
  GetUncheckedNotificationExistsResponse,
  NotificationType,
  RegisterNotificationTokenRequest,
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
    error: notificationListError,
    refetch: refetchNotificationList,
    isRefetching: isRefetchingNotificationList,
  } = useInfiniteQuery<
    GetNotificationListResponse,
    ApiErrorResponse,
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
    if (!isErrorNotificationList || !notificationListError) return;

    Toast.show({
      type: "error",
      text1: notificationListError.message,
    });
  }, [isErrorNotificationList, notificationListError]);

  return {
    notificationList: data?.pages.flatMap((page) => page.notifications) ?? [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPendingNotificationList,
    isErrorNotificationList,
    notificationListError,
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
  const {
    mutate: deleteNotificationToken,
    mutateAsync: deleteNotificationTokenAsync,
    isPending: isPendingDeleteNotificationToken,
    isError: isErrorDeleteNotificationToken,
    error: deleteNotificationTokenError,
  } = useMutation<string | null, Error>({
    mutationFn: deleteNotificationTokenApi,
  });

  return {
    deleteNotificationToken,
    deleteNotificationTokenAsync,
    isPendingDeleteNotificationToken,
    isErrorDeleteNotificationToken,
    deleteNotificationTokenError,
  };
};

const RETRYABLE_NETWORK_ERROR_CODES = new Set([
  "ERR_NETWORK",
  "ECONNABORTED",
  "ETIMEDOUT",
]);

// 앱이 종료된 상태에서 푸시알림을 눌러 콜드 스타트 했을 때, 순간적인 네트워크 연결 실패 시 요청 재시도 하도록 함
const shouldRetryNotificationCheck = (failureCount: number, error: Error) =>
  failureCount < 2 &&
  isAxiosError(error) &&
  RETRYABLE_NETWORK_ERROR_CODES.has(error.code ?? "");

export const useCheckNotification = () => {
  const queryClient = useQueryClient();
  const {
    mutate: checkNotification,
    isPending: isPendingCheckNotification,
    isError,
    error,
  } = useMutation<CheckNotificationResponse, Error, CheckNotificationRequest>({
    mutationFn: checkNotificationApi,
    retry: shouldRetryNotificationCheck,
    retryDelay: 500,
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: NOTIFICATION_QUERY_KEY.ALL,
      });
      if (data.route === NOTIFICATION_ROUTE.FEED_USER) {
        router.push({
          pathname: "/user-profile/[userId]",
          params: { userId: data.params.userId },
        });
      } else if (data.route === NOTIFICATION_ROUTE.FEED_DETAIL) {
        router.push({
          pathname: "/feed-detail/[feedId]",
          params: { feedId: data.params.feedId },
        });
        queryClient.invalidateQueries({
          queryKey: FEED_QUERY_KEY.DETAIL(data.params.feedId),
        });
        queryClient.invalidateQueries({
          queryKey: COMMENT_QUERY_KEY.LIST(data.params.feedId, "FEED"),
        });
      } else if (
        data.route === NOTIFICATION_ROUTE.ROOM_MAIN ||
        data.route === NOTIFICATION_ROUTE.ROOM_DETAIL
      ) {
        // TODO: 추후 모임방 관련 시 쿼리 캐시 초기화 추가
        router.push({
          pathname: "/group-detail/[roomId]",
          params: { roomId: data.params.roomId },
        });
      } else if (data.route === NOTIFICATION_ROUTE.ROOM_POST_DETAIL) {
        // TODO: 이 경우에는 받은 params를 이용하여 해당 기록 위치를 보여주고, openComments 여부에 따라 댓글 바텀시트도 조작한다. 쿼리 캐시도 초기화
        router.push({
          pathname: "/group-detail/[roomId]",
          params: { roomId: data.params.roomId },
        });
      }
    },
  });

  useEffect(() => {
    if (!isError || !error) return;

    Toast.show({
      type: "error",
      text1: error.message,
    });

    router.push("/alarm");
  }, [isError, error]);

  return {
    checkNotification,
    isPendingCheckNotification,
  };
};

export const useGetPushNotificationState = () => {
  const {
    data,
    isPending: isPendingPushNotificationData,
    isError: isErrorPushNotificationData,
    error,
  } = useQuery<GetPushNotificationStateResponse, Error>({
    queryKey: NOTIFICATION_QUERY_KEY.NOTIFICATION_STATE,
    queryFn: getPushNotificationStateApi,
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
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: NOTIFICATION_QUERY_KEY.NOTIFICATION_STATE,
      });
      if (data.isEnabled) {
        Toast.show({
          type: "alarm",
          text1: "푸시 알림이 설정되었어요.",
          text2: `${getFormattedCurrentDateTime()}`,
        });
      } else {
        Toast.show({
          type: "alarm",
          text1: "푸시 알림이 해제되었어요.",
          text2: `${getFormattedCurrentDateTime()}`,
        });
      }
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
