import { useMutation, useQuery } from "@tanstack/react-query";

import { checkNicknameApi, getAliasListApi } from "./user.api";
import { USER_QUERY_KEY } from "./user.query-key";
import type {
  CheckNicknameRequest,
  CheckNicknameResponse,
  GetAliasListResponse,
} from "./user.types";

export const useCheckNicknameMutation = () => {
  const {
    mutate: checkNickname,
    isPending: isPendingCheckNickname,
    isError: isErrorCheckNickname,
    error: checkNicknameError,
  } = useMutation<CheckNicknameResponse, Error, CheckNicknameRequest>({
    mutationFn: checkNicknameApi,
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

export const useSignupMutation = () => {};
