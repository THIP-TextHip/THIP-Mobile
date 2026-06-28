import type { InfiniteData } from "@tanstack/react-query";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

import {
  getAllFeedListApi,
  getFeedDetailApi,
  getFeedRelatedBookApi,
  getFeedTagListApi,
  getFeedUserProfileApi,
  getUserProfileTopInfoApi,
} from "./feed.api";
import { FEED_QUERY_KEY } from "./feed.query-key";
import {
  GetUserProfileTopInfoResponse,
  type FeedRelatedBookSort,
  type GetFeedDetailResponse,
  type GetFeedListResponse,
  type GetFeedRelatedBookResponse,
  type GetFeedTagListResponse,
  type GetFeedUserProfileResponse,
} from "./feed.types";

type FeedCursor = string | null;

const FEED_QUERY_CACHE_TIME = {
  STALE: 1000 * 60 * 2,
  GC: 1000 * 60 * 10,
} as const;

const USER_PROFILE_TOP_INFO_QUERY_CACHE_TIME = {
  STALE: 1000 * 60 * 2,
  GC: 1000 * 60 * 10,
} as const;

const FEED_TAG_QUERY_CACHE_TIME = {
  STALE: 1000 * 60 * 60 * 3,
  GC: 1000 * 60 * 60 * 5,
} as const;

const hasFeedId = (feedId?: number | string): feedId is number | string =>
  feedId != null && feedId !== "";

const hasIsbn = (isbn?: string): isbn is string => isbn != null && isbn !== "";

const hasUserId = (userId?: number): userId is number =>
  typeof userId === "number" && Number.isFinite(userId);

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

export const useGetFeedUserProfileQuery = (userId: number) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending: isPendingFeedUserProfile,
    isError: isErrorFeedUserProfile,
    error: feedUserProfileError,
    refetch: refetchFeedUserProfile,
    isRefetching: isRefetchingFeedUserProfile,
  } = useInfiniteQuery<
    GetFeedUserProfileResponse,
    Error,
    InfiniteData<GetFeedUserProfileResponse, FeedCursor>,
    ReturnType<typeof FEED_QUERY_KEY.USER_PROFILE>,
    FeedCursor
  >({
    queryKey: FEED_QUERY_KEY.USER_PROFILE(userId),
    queryFn: ({ pageParam }) => {
      if (!hasUserId(userId)) {
        throw new Error("userId is required.");
      }

      return getFeedUserProfileApi({
        userId,
        cursor: pageParam,
      });
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.isLast ? undefined : lastPage.nextCursor || undefined,
    enabled: hasUserId(userId),
    staleTime: FEED_QUERY_CACHE_TIME.STALE,
    gcTime: FEED_QUERY_CACHE_TIME.GC,
  });

  return {
    feedUserProfileList: data?.pages.flatMap((page) => page.feedList) ?? [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPendingFeedUserProfile,
    isErrorFeedUserProfile,
    feedUserProfileError,
    refetchFeedUserProfile,
    isRefetchingFeedUserProfile,
  };
};

export const useGetUserProfileTopInfoQuery = (userId: number) => {
  const {
    data: userProfileTopInfo,
    isPending: isPendingUserProfileTopInfo,
    isError,
    error,
  } = useQuery<GetUserProfileTopInfoResponse, Error>({
    queryKey: FEED_QUERY_KEY.USER_PROFILE_TOP_INFO(userId),
    queryFn: () => getUserProfileTopInfoApi(userId),
    enabled: hasUserId(userId),
    staleTime: USER_PROFILE_TOP_INFO_QUERY_CACHE_TIME.STALE,
    gcTime: USER_PROFILE_TOP_INFO_QUERY_CACHE_TIME.GC,
  });

  useEffect(() => {
    if (isError && error) {
      Toast.show({
        type: "error",
        text1: error.message,
      });
      if (router.canGoBack()) {
        router.back();
      }
    }
  }, [isError, error]);

  return {
    userProfileTopInfo,
    isPendingUserProfileTopInfo,
  };
};
