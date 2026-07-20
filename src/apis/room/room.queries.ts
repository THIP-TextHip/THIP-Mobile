import type { InfiniteData } from "@tanstack/react-query";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

import { router } from "expo-router";
import { type ApiErrorResponse } from "../api-client";
import {
  changeRoomJoinStatusApi,
  closeRoomRecruitingApi,
  createRoomApi,
  getHomeMyRoomApi,
  getHomeRecuitingRoomApi,
  getMyRoomListApi,
  getSearchRoomApi,
  leaveRoomApi,
} from "./room.api";
import { ROOM_QUERY_KEY } from "./room.query-key";
import type {
  ChangeRoomJoinStatusRequest,
  ChangeRoomJoinStatusResponse,
  CloseRoomRecruitingRequest,
  CloseRoomRecruitingResponse,
  CreateRoomRequest,
  CreateRoomResponse,
  GetHomeMyRoomResponse,
  GetHomeRecruitingRoomRequest,
  GetHomeRecruitingRoomResponse,
  GetMyRoomListResponse,
  GetSearchRoomResponse,
  LeaveRoomRequest,
  MyRoomType,
  SearchRoomQueryParams,
} from "./room.types";

const MY_ROOM_QUERY_CACHE_TIME = {
  STALE: 1000 * 60 * 5,
  GC: 1000 * 60 * 10,
} as const;

type RoomCursor = string | null;

export const useSearchRoomQuery = (params: SearchRoomQueryParams) => {
  const normalizedParams = {
    keyword: params.keyword?.trim() ?? "",
    category: params.category,
    isAllCategory: params.isAllCategory ?? false,
    sort: params.sort,
    isFinalized: params.isFinalized,
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isPending: isPendingSearchRoom,
    isFetching: isFetchingSearchRoom,
    isFetchingNextPage,
    isError: isErrorSearchRoom,
    error: searchRoomError,
  } = useInfiniteQuery<
    GetSearchRoomResponse,
    Error,
    InfiniteData<GetSearchRoomResponse, RoomCursor>,
    ReturnType<typeof ROOM_QUERY_KEY.SEARCH>,
    RoomCursor
  >({
    queryKey: ROOM_QUERY_KEY.SEARCH(normalizedParams),
    queryFn: ({ pageParam }) =>
      getSearchRoomApi({
        ...normalizedParams,
        isFinalized: normalizedParams.isFinalized && pageParam === null,
        cursor: pageParam,
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.isLast ? undefined : lastPage.nextCursor || undefined,
  });

  useEffect(() => {
    if (isErrorSearchRoom && searchRoomError) {
      Toast.show({
        type: "error",
        text1: searchRoomError.message,
      });
    }
  }, [isErrorSearchRoom, searchRoomError]);

  const searchPages = data?.pages ?? [];
  const lastPage = searchPages[searchPages.length - 1];

  return {
    searchRoomList: searchPages.flatMap((searchPage) => searchPage.roomList),
    nextCursor: lastPage?.nextCursor ?? null,
    fetchNextPage,
    hasNextPage,
    isPendingSearchRoom,
    isFetchingSearchRoom,
    isFetchingNextPage,
  };
};

export const useGetHomeRecruitingRoomListQuery = ({
  category,
}: GetHomeRecruitingRoomRequest) => {
  const {
    data: homeRecruitingRoomData,
    isPending: isPendingHomeRecruitingRoomData,
    isError: isErrorHomeRecruitingRoomData,
    error: homeRecruitingRoomError,
  } = useQuery<GetHomeRecruitingRoomResponse, ApiErrorResponse>({
    queryKey: ROOM_QUERY_KEY.HOME_RECRUITING(category),
    queryFn: () => getHomeRecuitingRoomApi({ category }),
  });

  return {
    homeRecruitingRoomData,
    isPendingHomeRecruitingRoomData,
    isErrorHomeRecruitingRoomData,
    homeRecruitingRoomError,
  };
};

export const useGetMyRoomListQuery = (type: MyRoomType) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending: isPendingMyRoomList,
    isError: isErrorMyRoomList,
    error: myRoomListError,
    refetch: refetchMyRoomList,
    isRefetching: isRefetchingMyRoomList,
  } = useInfiniteQuery<
    GetMyRoomListResponse,
    ApiErrorResponse,
    InfiniteData<GetMyRoomListResponse, RoomCursor>,
    ReturnType<typeof ROOM_QUERY_KEY.MY_ROOM>,
    RoomCursor
  >({
    queryKey: ROOM_QUERY_KEY.MY_ROOM(type),
    queryFn: ({ pageParam }) => getMyRoomListApi({ type, cursor: pageParam }),
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.isLast ? undefined : lastPage.nextCursor || undefined,
    staleTime: MY_ROOM_QUERY_CACHE_TIME.STALE,
    gcTime: MY_ROOM_QUERY_CACHE_TIME.GC,
  });

  return {
    myRoomList: data?.pages.flatMap((page) => page.roomList) ?? [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPendingMyRoomList,
    isErrorMyRoomList,
    myRoomListError,
    refetchMyRoomList,
    isRefetchingMyRoomList,
  };
};

export const useGetHomeMyRoomQuery = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending: isPendingHomeMyRoom,
    isError: isErrorHomeMyRoom,
    error: homeMyRoomError,
  } = useInfiniteQuery<
    GetHomeMyRoomResponse,
    ApiErrorResponse,
    InfiniteData<GetHomeMyRoomResponse, RoomCursor>,
    typeof ROOM_QUERY_KEY.HOME_MY_ROOM,
    RoomCursor
  >({
    queryKey: ROOM_QUERY_KEY.HOME_MY_ROOM,
    queryFn: ({ pageParam }) => getHomeMyRoomApi(pageParam),
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.isLast ? undefined : lastPage.nextCursor || undefined,
    staleTime: MY_ROOM_QUERY_CACHE_TIME.STALE,
    gcTime: MY_ROOM_QUERY_CACHE_TIME.GC,
  });

  return {
    homeMyRoomData: data?.pages.flatMap((page) => page.roomList) ?? [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPendingHomeMyRoom,
    isErrorHomeMyRoom,
    homeMyRoomError,
  };
};

export const useCreateRoomMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: createRoom, isPending: isPendingCreateRoom } = useMutation<
    CreateRoomResponse,
    Error,
    CreateRoomRequest
  >({
    mutationFn: createRoomApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ROOM_QUERY_KEY.ALL });
      Toast.show({
        type: "default",
        text1: "모임방 생성이 완료되었습니다.",
      });
      router.replace({
        pathname: "/group-detail/[roomId]",
        params: { roomId: data.roomId },
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
    createRoom,
    isPendingCreateRoom,
  };
};

export const useChangeRoomJoinStatusMutation = () => {
  const queryClient = useQueryClient();

  const {
    mutate: changeRoomJoinStatus,
    isPending: isPendingChangeRoomJoinStatus,
  } = useMutation<
    ChangeRoomJoinStatusResponse,
    Error,
    ChangeRoomJoinStatusRequest
  >({
    mutationFn: changeRoomJoinStatusApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ROOM_QUERY_KEY.ALL });
      Toast.show({
        type: "default",
        text1:
          data.type === "join"
            ? "모임방 참여가 완료되었어요! 모집 마감 후 활동이 시작돼요."
            : "모임방 참여가 취소되었어요! 다른 방을 찾아보세요.",
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
    changeRoomJoinStatus,
    isPendingChangeRoomJoinStatus,
  };
};

export const useCloseRoomRecruitingMutation = () => {
  const queryClient = useQueryClient();

  const {
    mutate: closeRoomRecruiting,
    isPending: isPendingCloseRoomRecruiting,
  } = useMutation<
    CloseRoomRecruitingResponse,
    Error,
    CloseRoomRecruitingRequest
  >({
    mutationFn: closeRoomRecruitingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROOM_QUERY_KEY.ALL });
      Toast.show({
        type: "default",
        text1: "독서메이트 모집을 성공적으로 마감했어요.",
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
    closeRoomRecruiting,
    isPendingCloseRoomRecruiting,
  };
};

export const useLeaveRoomMutation = () => {
  const queryClient = useQueryClient();
  const { mutate: leaveRoom, isPending: isPendingLeaveRoom } = useMutation<
    string,
    Error,
    LeaveRoomRequest
  >({
    mutationFn: leaveRoomApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROOM_QUERY_KEY.ALL });
      Toast.show({
        type: "default",
        text1: "모임 나가기를 완료했어요.",
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
    leaveRoom,
    isPendingLeaveRoom,
  };
};
