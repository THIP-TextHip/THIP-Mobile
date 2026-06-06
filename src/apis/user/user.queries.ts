import { useMutation } from "@tanstack/react-query";

import { checkNicknameApi } from "./user.api";
import type { CheckNicknameRequest, CheckNicknameResponse } from "./user.types";

export const useCheckNicknameMutation = () => {
  const { mutate: checkNickname, isPending: isPendingCheckNickname } =
    useMutation<CheckNicknameResponse, Error, CheckNicknameRequest>({
      mutationFn: checkNicknameApi,
      onError: (error) => {
        console.error(
          "[useCheckNicknameMutation] check nickname failed",
          error,
        );
      },
    });

  return {
    checkNickname,
    isPendingCheckNickname,
  };
};

export const useGetAliasListQuery = () => {};

export const useSignupMutation = () => {};
