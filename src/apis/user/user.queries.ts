import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

import { deleteAuthToken, setAuthToken } from "../token-storage";
import {
  checkNicknameApi,
  deleteUserAccountApi,
  editUserProfileApi,
  getAliasListApi,
  getSearchUserApi,
  getUserInfoApi,
  signupApi,
} from "./user.api";
import { USER_QUERY_KEY } from "./user.query-key";
import type {
  CheckNicknameRequest,
  CheckNicknameResponse,
  EditUserProfileRequest,
  GetAliasListResponse,
  GetSearchUserResponse,
  GetUserInfoResponse,
  SignupRequest,
  SignupResponse,
} from "./user.types";

const USER_QUERY_CACHE_TIME = {
  ALIAS_LIST: {
    STALE: 1000 * 60 * 60,
    GC: 1000 * 60 * 90,
  },
  USER_INFO: {
    STALE: 1000 * 60 * 60,
    GC: 1000 * 60 * 60,
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

export const useGetUserInfoQuery = () => {
  const {
    data: userInfo,
    isPending: isPendingUserInfo,
    isError: isErrorUserInfo,
    error: userInfoError,
  } = useQuery<GetUserInfoResponse, Error>({
    queryKey: USER_QUERY_KEY.USER_INFO,
    queryFn: getUserInfoApi,
    staleTime: USER_QUERY_CACHE_TIME.USER_INFO.STALE,
    gcTime: USER_QUERY_CACHE_TIME.USER_INFO.GC,
  });

  return {
    userInfo,
    isPendingUserInfo,
    isErrorUserInfo,
    userInfoError,
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
        queryKey: USER_QUERY_KEY.USER_INFO,
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
          queryClient.invalidateQueries({
            queryKey: USER_QUERY_KEY.USER_INFO,
          });
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
    dataUpdatedAt: dataUpdatedAtSearchUser,
    isError,
    error,
  } = useQuery<GetSearchUserResponse, Error>({
    queryKey: USER_QUERY_KEY.SEARCH(normalizedKeyword, isFinalized, size),
    queryFn: () => getSearchUserApi(normalizedKeyword, isFinalized, size),
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
    dataUpdatedAtSearchUser,
  };
};
