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

import { ApiErrorResponse } from "../api-client";
import {
  changeFeedLikeStatusApi,
  changeFeedSaveStatusApi,
  deleteFeedApi,
  editFeedApi,
  getAllFeedListApi,
  getFeedDetailApi,
  getFeedMyProfileApi,
  getFeedRelatedBookApi,
  getFeedTagListApi,
  getFeedUserProfileApi,
  getMyProfileTopInfoApi,
  getSavedFeedApi,
  getUserProfileTopInfoApi,
  uploadFeedImagesApi,
  writeFeedApi,
} from "./feed.api";
import { FEED_QUERY_KEY } from "./feed.query-key";
import type {
  ChangeFeedLikeStatusResponse,
  ChangeFeedSaveStatusResponse,
  ChangeFeedStatusRequest,
  EditFeedRequest,
  EditFeedResponse,
  FeedRelatedBookSort,
  GetFeedDetailResponse,
  GetFeedListResponse,
  GetFeedRelatedBookResponse,
  GetFeedTagListResponse,
  GetFeedUserProfileResponse,
  GetUserProfileTopInfoResponse,
  WriteFeedMutationRequest,
  WriteFeedResponse,
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

const MY_PROFILE_TOP_INFO_QUERY_CACHE_TIME = {
  STALE: 1000 * 30,
  GC: 1000 * 60,
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
    isError,
    error,
  } = useQuery<GetFeedTagListResponse, Error>({
    queryKey: FEED_QUERY_KEY.TAG_LIST,
    queryFn: getFeedTagListApi,
    staleTime: FEED_TAG_QUERY_CACHE_TIME.STALE,
    gcTime: FEED_TAG_QUERY_CACHE_TIME.GC,
  });

  useEffect(() => {
    if (!isError || !error) return;

    Toast.show({
      type: "error",
      text1: error.message,
    });

    if (!feedTagList && router.canGoBack()) {
      router.back();
    }
  }, [isError, error, feedTagList]);

  return {
    categoryList: feedTagList?.categoryList ?? [],
    isPendingFeedTagList,
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
    ReturnType<typeof FEED_QUERY_KEY.RELATED_BOOKS>,
    FeedCursor
  >({
    queryKey: FEED_QUERY_KEY.RELATED_BOOKS(normalizedIsbn, sort),
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
    if (!isError || !error) return;

    Toast.show({
      type: "error",
      text1: error.message,
    });

    if (!userProfileTopInfo && router.canGoBack()) {
      router.back();
    }
  }, [isError, error, userProfileTopInfo]);

  return {
    userProfileTopInfo,
    isPendingUserProfileTopInfo,
  };
};

export const useGetFeedMyProfileQuery = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending: isPendingFeedMyProfile,
    isError: isErrorFeedMyProfile,
    error: feedMyProfileError,
    refetch: refetchFeedMyProfile,
    isRefetching: isRefetchingFeedMyProfile,
  } = useInfiniteQuery<
    GetFeedUserProfileResponse,
    Error,
    InfiniteData<GetFeedUserProfileResponse, FeedCursor>,
    typeof FEED_QUERY_KEY.MY_PROFILE,
    FeedCursor
  >({
    queryKey: FEED_QUERY_KEY.MY_PROFILE,
    queryFn: ({ pageParam }) => {
      return getFeedMyProfileApi(pageParam);
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.isLast ? undefined : lastPage.nextCursor || undefined,
    staleTime: FEED_QUERY_CACHE_TIME.STALE,
    gcTime: FEED_QUERY_CACHE_TIME.GC,
  });

  return {
    feedMyProfileList: data?.pages.flatMap((page) => page.feedList) ?? [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPendingFeedMyProfile,
    isErrorFeedMyProfile,
    feedMyProfileError,
    refetchFeedMyProfile,
    isRefetchingFeedMyProfile,
  };
};

export const useGetMyProfileTopInfoQuery = () => {
  const {
    data: myProfileTopInfo,
    isPending: isPendingMyProfileTopInfo,
    isError,
    error,
  } = useQuery<GetUserProfileTopInfoResponse, Error>({
    queryKey: FEED_QUERY_KEY.MY_PROFILE_TOP_INFO,
    queryFn: getMyProfileTopInfoApi,
    staleTime: MY_PROFILE_TOP_INFO_QUERY_CACHE_TIME.STALE,
    gcTime: MY_PROFILE_TOP_INFO_QUERY_CACHE_TIME.GC,
  });

  useEffect(() => {
    if (!isError || !error) return;

    Toast.show({
      type: "error",
      text1: error.message,
    });

    if (!myProfileTopInfo && router.canGoBack()) {
      router.back();
    }
  }, [isError, error, myProfileTopInfo]);

  return {
    myProfileTopInfo,
    isPendingMyProfileTopInfo,
  };
};

export const useSavedFeedQuery = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending: isPendingSavedFeed,
    isError: isErrorSavedFeed,
    error: savedFeedError,
    refetch: refetchSavedFeed,
    isRefetching: isRefetchingSavedFeed,
  } = useInfiniteQuery<
    GetFeedListResponse,
    ApiErrorResponse,
    InfiniteData<GetFeedListResponse, FeedCursor>,
    typeof FEED_QUERY_KEY.SAVED,
    FeedCursor
  >({
    queryKey: FEED_QUERY_KEY.SAVED,
    queryFn: ({ pageParam }) => getSavedFeedApi(pageParam),
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.isLast ? undefined : lastPage.nextCursor || undefined,
    staleTime: FEED_QUERY_CACHE_TIME.STALE,
    gcTime: FEED_QUERY_CACHE_TIME.GC,
  });

  useEffect(() => {
    if (isErrorSavedFeed && savedFeedError) {
      Toast.show({
        type: "error",
        text1: savedFeedError.message,
      });
    }
  }, [isErrorSavedFeed, savedFeedError]);

  return {
    savedFeedList: data?.pages.flatMap((page) => page.feedList) ?? [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPendingSavedFeed,
    isErrorSavedFeed,
    savedFeedError,
    refetchSavedFeed,
    isRefetchingSavedFeed,
  };
};

export const useChangeFeedSaveStatusMutation = () => {
  const queryClient = useQueryClient();
  const {
    mutate: changeFeedSaveStatus,
    isPending: isPendingChangeFeedSaveStatus,
  } = useMutation<ChangeFeedSaveStatusResponse, Error, ChangeFeedStatusRequest>(
    {
      mutationFn: changeFeedSaveStatusApi,
      onSuccess: async () => {
        queryClient.invalidateQueries({
          queryKey: FEED_QUERY_KEY.ALL,
        });
      },
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: `${error.message}`,
        });
      },
    },
  );

  return { changeFeedSaveStatus, isPendingChangeFeedSaveStatus };
};

export const useChangeFeedLikeStatusMutation = () => {
  const queryClient = useQueryClient();
  const {
    mutate: changeFeedLikeStatus,
    isPending: isPendingChangeFeedLikeStatus,
  } = useMutation<ChangeFeedLikeStatusResponse, Error, ChangeFeedStatusRequest>(
    {
      mutationFn: changeFeedLikeStatusApi,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: FEED_QUERY_KEY.ALL,
        });
      },
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: `${error.message}`,
        });
      },
    },
  );

  return { changeFeedLikeStatus, isPendingChangeFeedLikeStatus };
};

export const useWriteFeedMutation = () => {
  const queryClient = useQueryClient();
  const { mutate: writeFeed, isPending: isPendingWriteFeed } = useMutation<
    WriteFeedResponse,
    Error,
    WriteFeedMutationRequest
  >({
    mutationFn: async ({ imageUris, ...feed }) => {
      const imageUrls = await uploadFeedImagesApi(imageUris);

      return writeFeedApi({
        ...feed,
        imageUrls,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: FEED_QUERY_KEY.ALL,
      });
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: `${error.message}`,
      });
    },
  });

  return { writeFeed, isPendingWriteFeed };
};

export const useDeleteFeedMutation = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteFeed, isPending: isPendingDeleteFeed } = useMutation<
    string,
    Error,
    number
  >({
    mutationFn: deleteFeedApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: FEED_QUERY_KEY.ALL,
      });
      Toast.show({
        type: "default",
        text1: "피드가 삭제되었어요.",
      });
      if (router.canGoBack()) {
        router.back();
      } else {
        router.push("/feed");
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
    deleteFeed,
    isPendingDeleteFeed,
  };
};

export const useEditFeedMutation = () => {
  const queryClient = useQueryClient();
  const { mutate: editFeed, isPending: isPendingEditFeed } = useMutation<
    EditFeedResponse,
    Error,
    EditFeedRequest
  >({
    mutationFn: editFeedApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: FEED_QUERY_KEY.ALL,
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
    editFeed,
    isPendingEditFeed,
  };
};
