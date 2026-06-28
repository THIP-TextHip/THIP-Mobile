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

import { FEED_QUERY_KEY } from "../feed";
import { deleteAuthToken, setAuthToken } from "../token-storage";
import {
  changeFollowingStateApi,
  checkNicknameApi,
  deleteUserAccountApi,
  editUserProfileApi,
  getAliasListApi,
  getMyFollowingsApi,
  getMyFollowingsPreviewApi,
  getMyIdApi,
  getMyInfoApi,
  getSearchUserApi,
  getUserFollowersApi,
  signupApi,
} from "./user.api";
import { USER_QUERY_KEY } from "./user.query-key";
import {
  ChangeFollowingStateRequest,
  ChangeFollowingStateResponse,
  GetMyFollowingsPreviewResponse,
  type CheckNicknameRequest,
  type CheckNicknameResponse,
  type EditUserProfileRequest,
  type GetAliasListResponse,
  type GetMyFollowingsResponse,
  type GetSearchUserResponse,
  type GetUserFollowersResponse,
  type GetUserInfoResponse,
  type SignupRequest,
  type SignupResponse,
} from "./user.types";

type Cursor = string | null;

const USER_QUERY_CACHE_TIME = {
  ALIAS_LIST: {
    STALE: 1000 * 60 * 60,
    GC: 1000 * 60 * 90,
  },
  MY_INFO: {
    STALE: 1000 * 60 * 60,
    GC: 1000 * 60 * 60,
  },
  MY_ID: {
    STALE: 1000 * 60 * 60,
    GC: 1000 * 60 * 90,
  },
  MY_FOLLOWINGS: {
    STALE: 1000 * 60 * 10,
    GC: 1000 * 60 * 15,
  },
} as const;

export const useCheckNicknameMutation = () => {
  const {
    mutate: checkNickname,
    isPending: isPendingCheckNickname,
    isError: isErrorCheckNickname,
    error: checkNicknameError,
  } = useMutation<CheckNicknameResponse, Error, CheckNicknameRequest>({
    mutationFn: checkNicknameApi,
    // TODO: 예외처리 UI 추가
    onError: (error) => {
      console.error("[useCheckNicknameMutation] check nickname failed", error);
    },
  });

  return {
    checkNickname,
    isPendingCheckNickname,
    isErrorCheckNickname,
    checkNicknameError,
  };
};

// TODO: 서버에서 보내주는 이미지에 문제가 있어서 추후 수정한 뒤 연동
export const useGetAliasListQuery = () => {
  const {
    data: aliasList,
    isPending: isPendingAliasList,
    isError: isErrorAliasList,
    error: aliasListError,
  } = useQuery<GetAliasListResponse, Error>({
    queryKey: USER_QUERY_KEY.ALIAS_LIST,
    queryFn: getAliasListApi,
    staleTime: USER_QUERY_CACHE_TIME.ALIAS_LIST.STALE,
    gcTime: USER_QUERY_CACHE_TIME.ALIAS_LIST.GC,
  });

  return {
    aliasList: aliasList?.aliasChoices ?? [],
    isPendingAliasList,
    isErrorAliasList,
    aliasListError,
  };
};

export const useSignupMutation = () => {
  const {
    mutate: signup,
    isPending: isPendingSignup,
    isError: isErrorSignup,
    error: signupError,
  } = useMutation<SignupResponse, Error, SignupRequest>({
    mutationFn: signupApi,
    onSuccess: async (data) => {
      try {
        await setAuthToken(data.accessToken);
        router.replace("/sign-up/onboarding");
      } catch {
        console.error("[useSignupMutation] token persist failed");
        Toast.show({
          type: "error",
          text1: "인증 토큰 저장에 실패했어요. 다시 시도해주세요.",
        });
      }
    },
    onError: (error) => {
      console.error("[useSignupMutation] signup failed", error);
      Toast.show({
        type: "error",
        text1: "회원 가입에 실패했어요. 다시 시도해주세요.",
      });
    },
  });

  return {
    signup,
    isPendingSignup,
    isErrorSignup,
    signupError,
  };
};

export const useGetMyInfoQuery = () => {
  const {
    data: myInfo,
    isPending: isPendingMyInfo,
    isError: isErrorMyInfo,
    error: myInfoError,
  } = useQuery<GetUserInfoResponse, Error>({
    queryKey: USER_QUERY_KEY.MY_INFO,
    queryFn: getMyInfoApi,
    staleTime: USER_QUERY_CACHE_TIME.MY_INFO.STALE,
    gcTime: USER_QUERY_CACHE_TIME.MY_INFO.GC,
  });

  return {
    myInfo,
    isPendingMyInfo,
    isErrorMyInfo,
    myInfoError,
  };
};

export const useGetMyIdQuery = () => {
  const {
    data: myId,
    isPending: isPendingMyId,
    isError,
    error,
  } = useQuery<number, Error>({
    queryKey: USER_QUERY_KEY.MY_ID,
    queryFn: getMyIdApi,
    staleTime: USER_QUERY_CACHE_TIME.MY_ID.STALE,
    gcTime: USER_QUERY_CACHE_TIME.MY_ID.GC,
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
    myId,
    isPendingMyId,
  };
};

export const useEditUserProfileMutation = () => {
  const queryClient = useQueryClient();

  const {
    mutate: editUserProfile,
    isPending: isPendingEditUserProfile,
    isError: isErrorEditUserProfile,
    error: editUserProfileError,
  } = useMutation<void, Error, EditUserProfileRequest>({
    mutationFn: editUserProfileApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: USER_QUERY_KEY.MY_INFO,
      });
      router.back();
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: `${error.message}`,
      });
    },
  });

  return {
    editUserProfile,
    isPendingEditUserProfile,
    isErrorEditUserProfile,
    editUserProfileError,
  };
};

export const useDeleteUserAccountMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteUserAccount, isPending: isPendingDeleteUserAccount } =
    useMutation<void, Error>({
      mutationFn: deleteUserAccountApi,
      onSuccess: async () => {
        try {
          await deleteAuthToken();
          queryClient.clear();
          router.replace("/delete-account-complete");
        } catch (error) {
          console.error("[auth] token delete failed", error);
          Toast.show({
            type: "error",
            text1: "토큰 삭제에 실패했습니다. 앱 종료 후 다시 시도해주세요.",
          });
        }
      },
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: `회원탈퇴에 실패했습니다. ${error.message}`,
        });
      },
    });

  return {
    deleteUserAccount,
    isPendingDeleteUserAccount,
  };
};

export const useSearchUserQuery = (
  keyword: string,
  isFinalized: boolean,
  size = 30,
) => {
  const normalizedKeyword = keyword.trim();

  const {
    data,
    isPending: isPendingSearchUser,
    isFetching: isFetchingSearchUser,
    isError,
    error,
  } = useQuery<GetSearchUserResponse, Error>({
    queryKey: USER_QUERY_KEY.SEARCH(normalizedKeyword, isFinalized, size),
    queryFn: () =>
      getSearchUserApi({
        keyword: normalizedKeyword,
        isFinalized: isFinalized,
        size,
      }),
    enabled: normalizedKeyword.length > 0,
  });

  if (isError) {
    Toast.show({
      type: "error",
      text1: `${error.message}`,
    });
  }

  return {
    searchUserList: data?.userList ?? [],
    isPendingSearchUser,
    isFetchingSearchUser,
  };
};

export const useGetUserFollowersQuery = (userId: number, size = 10) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending: isPendingUserFollowers,
    isError,
    error,
    refetch: refetchUserFollowers,
    isRefetching: isRefetchingUserFollowers,
  } = useInfiniteQuery<
    GetUserFollowersResponse,
    Error,
    InfiniteData<GetUserFollowersResponse, Cursor>,
    ReturnType<typeof USER_QUERY_KEY.FOLLOWERS>,
    Cursor
  >({
    queryKey: USER_QUERY_KEY.FOLLOWERS(userId, size),
    queryFn: ({ pageParam }) =>
      getUserFollowersApi({
        userId,
        cursor: pageParam,
        size,
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.isLast ? undefined : lastPage.nextCursor || undefined,
    enabled: !!userId,
  });

  const userFollowerPages = data?.pages ?? [];
  const firstPage = userFollowerPages[0];

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
    followerList: userFollowerPages.flatMap((page) => page.followers),
    totalFollowerCount: firstPage?.totalFollowerCount ?? 0,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPendingUserFollowers,
    refetchUserFollowers,
    isRefetchingUserFollowers,
  };
};

export const useGetMyFollowingsQuery = (size = 10) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending: isPendingMyFollowings,
    isError,
    error,
    refetch: refetchMyFollowings,
    isRefetching: isRefetchingMyFollowings,
  } = useInfiniteQuery<
    GetMyFollowingsResponse,
    Error,
    InfiniteData<GetMyFollowingsResponse, Cursor>,
    ReturnType<typeof USER_QUERY_KEY.MY_FOLLOWINGS>,
    Cursor
  >({
    queryKey: USER_QUERY_KEY.MY_FOLLOWINGS(size),
    queryFn: ({ pageParam }) =>
      getMyFollowingsApi({
        cursor: pageParam,
        size,
      }),
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.isLast ? undefined : lastPage.nextCursor || undefined,
    staleTime: USER_QUERY_CACHE_TIME.MY_FOLLOWINGS.STALE,
    gcTime: USER_QUERY_CACHE_TIME.MY_FOLLOWINGS.GC,
  });

  const myfollowingsPages = data?.pages ?? [];
  const firstPage = myfollowingsPages[0];

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
    myFollowingList: myfollowingsPages.flatMap((page) => page.followings),
    totalFollowingCount: firstPage?.totalFollowingCount ?? 0,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPendingMyFollowings,
    refetchMyFollowings,
    isRefetchingMyFollowings,
  };
};

export const useGetMyFollowingsPreviewQuery = () => {
  const {
    data: myFollowingListPreview,
    isPending: isPendingMyFollowingsPreview,
    isError: isErrorMyFollowingsPreview,
  } = useQuery<GetMyFollowingsPreviewResponse, Error>({
    queryKey: USER_QUERY_KEY.MY_FOLLOWINGS_PREVIEW,
    queryFn: getMyFollowingsPreviewApi,
    staleTime: USER_QUERY_CACHE_TIME.MY_FOLLOWINGS.STALE,
    gcTime: USER_QUERY_CACHE_TIME.MY_FOLLOWINGS.GC,
  });

  return {
    myFollowingListPreview,
    isPendingMyFollowingsPreview,
    isErrorMyFollowingsPreview,
  };
};

export const useChangeFollowingStateMutation = () => {
  const queryClient = useQueryClient();
  const {
    mutate: changeFollowingState,
    isPending: isPendingChangeFollowingState,
  } = useMutation<
    ChangeFollowingStateResponse,
    Error,
    ChangeFollowingStateRequest
  >({
    mutationFn: changeFollowingStateApi,
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: USER_QUERY_KEY.MY_FOLLOWINGS_ROOT,
        }),
        queryClient.invalidateQueries({
          queryKey: USER_QUERY_KEY.MY_FOLLOWINGS_PREVIEW,
        }),
        queryClient.invalidateQueries({
          queryKey: USER_QUERY_KEY.FOLLOWERS_ROOT(variables.followingUserId),
        }),
        queryClient.invalidateQueries({
          queryKey: FEED_QUERY_KEY.USER_PROFILE_TOP_INFO(
            variables.followingUserId,
          ),
        }),
      ]);
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: `${error.message}`,
      });
    },
  });

  return { changeFollowingState, isPendingChangeFollowingState };
};
