import { useMutation, useQuery } from "@tanstack/react-query";
import { router } from "expo-router";

import { setAuthToken } from "../token-storage";
import { checkNicknameApi, getAliasListApi, signupApi } from "./user.api";
import { USER_QUERY_KEY } from "./user.query-key";
import type {
  CheckNicknameRequest,
  CheckNicknameResponse,
  GetAliasListResponse,
  SignupRequest,
  SignupResponse,
} from "./user.types";

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
      await setAuthToken(data.accessToken);
      router.replace("/sign-up/onboarding");
    },
    // TODO: 예외처리 UI 추가
    onError: (error) => {
      console.error("[useSignupMutation] signup failed", error);
    },
  });

  return {
    signup,
    isPendingSignup,
    isErrorSignup,
    signupError,
  };
};
