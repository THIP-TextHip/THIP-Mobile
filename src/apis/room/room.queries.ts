import type { InfiniteData } from "@tanstack/react-query";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

import { type ApiErrorResponse } from "../api-client";
import {
  getHomeRecuitingRoomApi,
  getMyRoomListApi,
  getSearchRoomApi,
} from "./room.api";
import { ROOM_QUERY_KEY } from "./room.query-key";
import type {
  GetHomeRecruitingRoomRequest,
  GetHomeRecruitingRoomResponse,
  GetMyRoomListResponse,
  GetSearchRoomResponse,
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
