import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";

import { getAllFeedListApi, getFeedDetailApi } from "./feed.api";
import { FEED_QUERY_KEY } from "./feed.query-key";
import type {
  GetAllFeedListResponse,
  GetFeedDetailResponse,
} from "./feed.types";

type FeedCursor = string | null;

const FEED_QUERY_CACHE_TIME = {
  STALE: 1000 * 60 * 2,
  GC: 1000 * 60 * 10,
} as const;

const hasFeedId = (feedId?: number | string): feedId is number | string =>
  feedId != null && feedId !== "";

export const useGetAllFeedListQuery = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending: isPendingFeedList,
    isError: isErrorFeedList,
    error: feedListError,
    refetch: refetchFeedList,
    isRefetching: isRefetchingFeedList,
  } = useInfiniteQuery<
    GetAllFeedListResponse,
    Error,
    InfiniteData<GetAllFeedListResponse, FeedCursor>,
    typeof FEED_QUERY_KEY.ALL,
    FeedCursor
  >({
    queryKey: FEED_QUERY_KEY.ALL,
    queryFn: ({ pageParam }) => getAllFeedListApi(pageParam),
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.isLast ? undefined : lastPage.nextCursor || undefined,
    staleTime: FEED_QUERY_CACHE_TIME.STALE,
    gcTime: FEED_QUERY_CACHE_TIME.GC,
  });

  return {
    feedList: data?.pages.flatMap((page) => page.feedList) ?? [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPendingFeedList,
    isErrorFeedList,
    feedListError,
    refetchFeedList,
    isRefetchingFeedList,
  };
};

export const useGetFeedDetailQuery = (feedId?: number | string) => {
  const {
    data: feedDetail,
    isPending: isPendingFeedDetail,
    isError: isErrorFeedDetail,
    error: feedDetailError,
    refetch: refetchFeedDetail,
    isRefetching: isRefetchingFeedDetail,
  } = useQuery<GetFeedDetailResponse, Error>({
    queryKey: FEED_QUERY_KEY.DETAIL(feedId),
    queryFn: () => {
      if (!hasFeedId(feedId)) {
        throw new Error("feedId is required.");
      }

      return getFeedDetailApi(feedId);
    },
    enabled: hasFeedId(feedId),
    staleTime: FEED_QUERY_CACHE_TIME.STALE,
    gcTime: FEED_QUERY_CACHE_TIME.GC,
  });

  return {
    feedDetail,
    isPendingFeedDetail,
    isErrorFeedDetail,
    feedDetailError,
    refetchFeedDetail,
    isRefetchingFeedDetail,
  };
};
