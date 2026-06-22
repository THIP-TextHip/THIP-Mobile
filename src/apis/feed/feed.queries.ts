import type { InfiniteData } from "@tanstack/react-query";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import {
  getAllFeedListApi,
  getFeedDetailApi,
  getFeedRelatedBookApi,
  getFeedTagListApi,
} from "./feed.api";
import { FEED_QUERY_KEY } from "./feed.query-key";
import type {
  FeedRelatedBookSort,
  GetFeedDetailResponse,
  GetFeedListResponse,
  GetFeedRelatedBookResponse,
  GetFeedTagListResponse,
} from "./feed.types";

type FeedCursor = string | null;

const FEED_QUERY_CACHE_TIME = {
  STALE: 1000 * 60 * 2,
  GC: 1000 * 60 * 10,
} as const;

const FEED_TAG_QUERY_CACHE_TIME = {
  STALE: 1000 * 60 * 60 * 3,
  GC: 1000 * 60 * 60 * 5,
};

const hasFeedId = (feedId?: number | string): feedId is number | string =>
  feedId != null && feedId !== "";

const hasIsbn = (isbn?: string): isbn is string => isbn != null && isbn !== "";

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
    GetFeedListResponse,
    Error,
    InfiniteData<GetFeedListResponse, FeedCursor>,
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

export const useGetFeedTagListQuery = () => {
  const {
    data: feedTagList,
    isPending: isPendingFeedTagList,
    isError: isErrorFeedTagList,
    error: feedTagListError,
    refetch: refetchFeedTagList,
    isRefetching: isRefetchingFeedTagList,
  } = useQuery<GetFeedTagListResponse, Error>({
    queryKey: FEED_QUERY_KEY.TAG_LIST,
    queryFn: getFeedTagListApi,
    staleTime: FEED_TAG_QUERY_CACHE_TIME.STALE,
    gcTime: FEED_TAG_QUERY_CACHE_TIME.GC,
  });

  return {
    categoryList: feedTagList?.categoryList ?? [],
    isPendingFeedTagList,
    isErrorFeedTagList,
    feedTagListError,
    refetchFeedTagList,
    isRefetchingFeedTagList,
  };
};

export const useGetFeedRelatedBookQuery = (
  isbn?: string,
  sort: FeedRelatedBookSort = "like",
) => {
  const normalizedIsbn = isbn?.trim() ?? "";

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending: isPendingFeedRelatedBookList,
    isError: isErrorFeedRelatedBookList,
    error: feedRelatedBookListError,
    refetch: refetchFeedRelatedBookList,
    isRefetching: isRefetchingFeedRelatedBookList,
  } = useInfiniteQuery<
    GetFeedRelatedBookResponse,
    Error,
    InfiniteData<GetFeedRelatedBookResponse, FeedCursor>,
    ReturnType<typeof FEED_QUERY_KEY.RELATED_BOOK>,
    FeedCursor
  >({
    queryKey: FEED_QUERY_KEY.RELATED_BOOK(normalizedIsbn, sort),
    queryFn: ({ pageParam }) => {
      if (!hasIsbn(normalizedIsbn)) {
        throw new Error("isbn is required.");
      }

      return getFeedRelatedBookApi({
        isbn: normalizedIsbn,
        sort,
        cursor: pageParam,
      });
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.isLast ? undefined : lastPage.nextCursor || undefined,
    enabled: hasIsbn(normalizedIsbn),
    staleTime: FEED_QUERY_CACHE_TIME.STALE,
    gcTime: FEED_QUERY_CACHE_TIME.GC,
  });

  return {
    feedRelatedBookList: data?.pages.flatMap((page) => page.feeds) ?? [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPendingFeedRelatedBookList,
    isErrorFeedRelatedBookList,
    feedRelatedBookListError,
    refetchFeedRelatedBookList,
    isRefetchingFeedRelatedBookList,
  };
};
