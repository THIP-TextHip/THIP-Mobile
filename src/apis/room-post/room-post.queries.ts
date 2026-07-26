import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

import { type ApiErrorResponse } from "../api-client";
import { ROOM_QUERY_KEY } from "../room/room.query-key";
import {
  changeRoomPostLikeStatusApi,
  createRoomRecordApi,
  createRoomVoteApi,
  editRoomRecordApi,
  editRoomVoteApi,
  getBookInfoForPinApi,
  getRoomBookPageInfoApi,
  getRoomPostListApi,
} from "./room-post.api";
import { ROOM_POST_QUERY_KEY } from "./room-post.query-key";
import type {
  ChangeRoomPostLikeStatusRequest,
  ChangeRoomPostLikeStatusResponse,
  CreateRoomRecordRequest,
  CreateRoomRecordResponse,
  CreateRoomVoteRequest,
  CreateRoomVoteResponse,
  EditRoomRecordRequest,
  EditRoomRecordResponse,
  EditRoomVoteRequest,
  EditRoomVoteResponse,
  GetBookInfoForPinRequest,
  GetBookInfoForPinResponse,
  GetRoomBookPageInfoResponse,
  GetRoomPostListResponse,
  GetRoomPostListResquest,
} from "./room-post.types";

const ROOM_BOOK_PAGE_QUERY_CACHE_TIME = {
  STALE: 1000 * 60 * 30,
  GC: 1000 * 60 * 45,
} as const;

const ROOM_POST_LIST_QUERY_CACHE_TIME = {
  STALE: 1000 * 60 * 2,
  GC: 1000 * 60 * 5,
} as const;

const ROOM_BOOK_INFO_FOR_PIN_QUERY_CACHE_TIME = {
  STALE: 1000 * 60 * 60,
  GC: 1000 * 60 * 90,
} as const;

type RoomPostCursor = string | null;

const hasRoomId = (roomId?: number | string): roomId is number | string =>
  roomId != null && roomId !== "";

export const useChangeRoomPostLikeStatusMutation = () => {
  const {
    mutate: changeRoomPostLikeStatus,
    isPending: isPendingChangeRoomPostLikeStatus,
  } = useMutation<
    ChangeRoomPostLikeStatusResponse,
    Error,
    ChangeRoomPostLikeStatusRequest
  >({
    mutationFn: changeRoomPostLikeStatusApi,
    // TODO: roomId 정보를 얻을 수가 없어서 추후 사용하는 곳에서 onSuccess를 정의하는 것으로 해결한다. room-post의 캐시 초기화
    onSuccess: () => {},
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: `${error.message}`,
      });
    },
  });

  return {
    changeRoomPostLikeStatus,
    isPendingChangeRoomPostLikeStatus,
  };
};

// TODO: 추후 기록 작성 페이지에서 사용! 에러 나면 작성 불가하므로 토스트 띄우고 뒤로가기. Pending이면 페이지 선택 잠시 못하도록 방어
export const useGetRoomBookPageQuery = (roomId?: number | string) => {
  const {
    data: bookPageInfo,
    isPending: isPendingBookPageInfo,
    isError: isErrorBookPageInfo,
    error: bookPageInfoError,
  } = useQuery<GetRoomBookPageInfoResponse, ApiErrorResponse>({
    queryKey: ROOM_POST_QUERY_KEY.BOOK_PAGE(roomId),
    queryFn: () => {
      if (!hasRoomId(roomId)) {
        throw new Error("roomId is required.");
      }

      return getRoomBookPageInfoApi(roomId);
    },
    enabled: hasRoomId(roomId),
    staleTime: ROOM_BOOK_PAGE_QUERY_CACHE_TIME.STALE,
    gcTime: ROOM_BOOK_PAGE_QUERY_CACHE_TIME.GC,
  });

  return {
    bookPageInfo,
    isPendingBookPageInfo,
    isErrorBookPageInfo,
    bookPageInfoError,
  };
};

export const useGetRoomPostListQuery = ({
  roomId,
  type,
  sort,
  pageStart,
  pageEnd,
  isOverview,
  isPageFilter,
}: GetRoomPostListResquest) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending: isPendingRoomPostList,
    isError: isErrorRoomPostList,
    error: roomPostListError,
    refetch: refetchRoomPostList,
    isRefetching: isRefetchingRoomPostList,
  } = useInfiniteQuery<
    GetRoomPostListResponse,
    ApiErrorResponse,
    InfiniteData<GetRoomPostListResponse, RoomPostCursor>,
    ReturnType<typeof ROOM_POST_QUERY_KEY.LIST>,
    RoomPostCursor
  >({
    queryKey: ROOM_POST_QUERY_KEY.LIST(
      type,
      isOverview,
      isPageFilter,
      sort,
      roomId,
      pageStart,
      pageEnd,
    ),
    queryFn: ({ pageParam }) => {
      if (!hasRoomId(roomId)) {
        throw new Error("roomId is required.");
      }

      return getRoomPostListApi({
        roomId,
        type,
        sort,
        pageStart,
        pageEnd,
        isOverview,
        isPageFilter,
        cursor: pageParam,
      });
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.isLast ? undefined : lastPage.nextCursor || undefined,
    enabled: hasRoomId(roomId),
    staleTime: ROOM_POST_LIST_QUERY_CACHE_TIME.STALE,
    gcTime: ROOM_POST_LIST_QUERY_CACHE_TIME.GC,
  });

  return {
    roomPostList: data?.pages.flatMap((page) => page.postList) ?? [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPendingRoomPostList,
    isErrorRoomPostList,
    roomPostListError,
    refetchRoomPostList,
    isRefetchingRoomPostList,
  };
};

export const useCreateRoomRecordMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: createRoomRecord, isPending: isPendingCreateRoomRecord } =
    useMutation<
      CreateRoomRecordResponse,
      ApiErrorResponse,
      CreateRoomRecordRequest
    >({
      mutationFn: createRoomRecordApi,
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ROOM_POST_QUERY_KEY.ALL_POST(data.roomId),
        });
        queryClient.invalidateQueries({
          queryKey: ROOM_POST_QUERY_KEY.BOOK_PAGE(data.roomId),
        });
        queryClient.invalidateQueries({
          queryKey: ROOM_QUERY_KEY.ALL,
        });
        if (router.canGoBack()) {
          router.back();
        } else {
          router.replace({
            pathname: "/record-book/[roomId]",
            params: { roomId: data.roomId },
          });
        }
      },
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: `${error.message}`,
        });
      },
    });

  return {
    createRoomRecord,
    isPendingCreateRoomRecord,
  };
};

export const useCreateRoomVoteMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: createRoomVote, isPending: isPendingCreateRoomVote } =
    useMutation<
      CreateRoomVoteResponse,
      ApiErrorResponse,
      CreateRoomVoteRequest
    >({
      mutationFn: createRoomVoteApi,
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ROOM_POST_QUERY_KEY.ALL_POST(data.roomId),
        });
        queryClient.invalidateQueries({
          queryKey: ROOM_POST_QUERY_KEY.BOOK_PAGE(data.roomId),
        });
        queryClient.invalidateQueries({
          queryKey: ROOM_QUERY_KEY.ALL,
        });
        if (router.canGoBack()) {
          router.back();
        } else {
          router.replace({
            pathname: "/record-book/[roomId]",
            params: { roomId: data.roomId },
          });
        }
      },
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: `${error.message}`,
        });
      },
    });

  return {
    createRoomVote,
    isPendingCreateRoomVote,
  };
};

export const useGetBookInfoForPinQuery = ({
  roomId,
  recordId,
}: GetBookInfoForPinRequest) => {
  const {
    data: bookInfoForPin,
    isPending: isPendingBookInfoForPin,
    isError: isErrorBookInfoForPin,
    error: bookInfoForPinError,
  } = useQuery<GetBookInfoForPinResponse, ApiErrorResponse>({
    queryKey: ROOM_POST_QUERY_KEY.BOOK_INFO_FOR_PIN(roomId, recordId),
    queryFn: () => getBookInfoForPinApi({ roomId, recordId }),
    enabled: hasRoomId(roomId),
    staleTime: ROOM_BOOK_INFO_FOR_PIN_QUERY_CACHE_TIME.STALE,
    gcTime: ROOM_BOOK_INFO_FOR_PIN_QUERY_CACHE_TIME.GC,
  });

  return {
    bookInfoForPin,
    isPendingBookInfoForPin,
    isErrorBookInfoForPin,
    bookInfoForPinError,
  };
};

export const useEditRoomRecordMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: editRoomRecord, isPending: isPendingEditRoomRecord } =
    useMutation<
      EditRoomRecordResponse,
      ApiErrorResponse,
      EditRoomRecordRequest
    >({
      mutationFn: editRoomRecordApi,
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ROOM_POST_QUERY_KEY.ALL_POST(data.roomId),
        });
        queryClient.invalidateQueries({
          queryKey: ROOM_POST_QUERY_KEY.BOOK_PAGE(data.roomId),
        });
        queryClient.invalidateQueries({
          queryKey: ROOM_QUERY_KEY.ALL,
        });
        if (router.canGoBack()) {
          router.back();
        } else {
          router.replace({
            pathname: "/record-book/[roomId]",
            params: { roomId: data.roomId },
          });
        }
      },
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: `${error.message}`,
        });
      },
    });

  return {
    editRoomRecord,
    isPendingEditRoomRecord,
  };
};

export const useEditRoomVoteMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: editRoomVote, isPending: isPendingEditRoomVote } =
    useMutation<EditRoomVoteResponse, ApiErrorResponse, EditRoomVoteRequest>({
      mutationFn: editRoomVoteApi,
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ROOM_POST_QUERY_KEY.ALL_POST(data.roomId),
        });
        queryClient.invalidateQueries({
          queryKey: ROOM_POST_QUERY_KEY.BOOK_PAGE(data.roomId),
        });
        queryClient.invalidateQueries({
          queryKey: ROOM_QUERY_KEY.ALL,
        });
        if (router.canGoBack()) {
          router.back();
        } else {
          router.replace({
            pathname: "/record-book/[roomId]",
            params: { roomId: data.roomId },
          });
        }
      },
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: `${error.message}`,
        });
      },
    });

  return {
    editRoomVote,
    isPendingEditRoomVote,
  };
};
