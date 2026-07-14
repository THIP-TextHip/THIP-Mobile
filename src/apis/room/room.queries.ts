import type { InfiniteData } from "@tanstack/react-query";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

import { getRoomListApi, getSearchRoomApi } from "./room.api";
import { ROOM_QUERY_KEY } from "./room.query-key";
import type {
  GetRoomListRequest,
  GetRoomListResponse,
  GetSearchRoomResponse,
  SearchRoomQueryParams,
} from "./room.types";

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

export const useGetRoomListQuery = ({ category }: GetRoomListRequest) => {
  const {
    data: roomListData,
    isPending: isPendingRoomListData,
    isError: isErrorRoomListData,
  } = useQuery<GetRoomListResponse, Error>({
    queryKey: ROOM_QUERY_KEY.MAIN(category),
    queryFn: () => getRoomListApi({ category }),
  });

  return { roomListData, isPendingRoomListData, isErrorRoomListData };
};
