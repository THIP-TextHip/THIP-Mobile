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
  deleteRoomRecordApi,
  deleteRoomVoteApi,
  doRoomVoteApi,
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
  DeleteRoomRecordRequest,
  DeleteRoomRecordResponse,
  DeleteRoomVoteRequest,
  DeleteRoomVoteResponse,
  DoRoomVoteRequest,
  DoRoomVoteResponse,
  EditRoomRecordRequest,
  EditRoomRecordResponse,
  EditRoomVoteRequest,
  EditRoomVoteResponse,
  GetBookInfoForPinQueryRequest,
  GetBookInfoForPinResponse,
  GetRoomBookPageInfoResponse,
  GetRoomPostListRequest,
  GetRoomPostListResponse,
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

export const useGetRoomBookPageQuery = (roomId?: number | string) => {
  const {
    data: bookPageInfo,
    isPending: isPendingBookPageInfo,
    isError: isErrorBookPageInfo,
    error: bookPageInfoError,
    refetch: refetchBookPageInfo,
    isRefetching: isRefetchingBookPageInfo,
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
    refetchBookPageInfo,
    isRefetchingBookPageInfo,
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
}: GetRoomPostListRequest) => {
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
        Toast.show({
          type: "default",
          text1: "기록이 생성되었어요.",
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
        Toast.show({
          type: "default",
          text1: "투표가 생성되었어요.",
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
  isRecord,
  isModalOpen,
}: GetBookInfoForPinQueryRequest) => {
  const {
    data: bookInfoForPin,
    isPending: isPendingBookInfoForPin,
    isError: isErrorBookInfoForPin,
    error: bookInfoForPinError,
  } = useQuery<GetBookInfoForPinResponse, ApiErrorResponse>({
    queryKey: ROOM_POST_QUERY_KEY.BOOK_INFO_FOR_PIN(roomId, recordId),
    queryFn: () => getBookInfoForPinApi({ roomId, recordId }),
    enabled: hasRoomId(roomId) && isRecord && isModalOpen,
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
        Toast.show({
          type: "default",
          text1: "기록이 수정되었어요.",
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
        Toast.show({
          type: "default",
          text1: "투표가 수정되었어요.",
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

export const useDeleteRoomPostMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteRoomRecord, isPending: isPendingDeleteRoomRecord } =
    useMutation<
      DeleteRoomRecordResponse,
      ApiErrorResponse,
      DeleteRoomRecordRequest
    >({
      mutationFn: deleteRoomRecordApi,
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ROOM_POST_QUERY_KEY.ALL_POST(data.roomId),
        });
        Toast.show({
          type: "default",
          text1: "기록이 삭제되었어요.",
        });
      },
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: `${error.message}`,
        });
      },
    });

  const { mutate: deleteRoomVote, isPending: isPendingDeleteRoomVote } =
    useMutation<
      DeleteRoomVoteResponse,
      ApiErrorResponse,
      DeleteRoomVoteRequest
    >({
      mutationFn: deleteRoomVoteApi,
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ROOM_POST_QUERY_KEY.ALL_POST(data.roomId),
        });
        Toast.show({
          type: "default",
          text1: "투표가 삭제되었어요.",
        });
      },
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: `${error.message}`,
        });
      },
    });

  return {
    deleteRoomRecord,
    deleteRoomVote,
    isPendingDeleteRoomRecord,
    isPendingDeleteRoomVote,
  };
};

export const useDoRoomVoteMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: doVote, isPending: isPendingDoVote } = useMutation<
    DoRoomVoteResponse,
    ApiErrorResponse,
    DoRoomVoteRequest
  >({
    mutationFn: doRoomVoteApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ROOM_POST_QUERY_KEY.ALL_POST(data.roomId),
      });
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: `${error.message}`,
      });
    },
  });

  return {
    doVote,
    isPendingDoVote,
  };
};

export const useChangeRoomPostLikeStatusMutation = (roomId: number) => {
  const queryClient = useQueryClient();

  const {
    mutate: changeRoomPostLikeStatus,
    isPending: isPendingChangeRoomPostLikeStatus,
  } = useMutation<
    ChangeRoomPostLikeStatusResponse,
    Error,
    ChangeRoomPostLikeStatusRequest
  >({
    mutationFn: changeRoomPostLikeStatusApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ROOM_POST_QUERY_KEY.ALL_POST(roomId),
      });
    },
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
