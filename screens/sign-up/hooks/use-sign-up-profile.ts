import { router } from "expo-router";
import { useState } from "react";

import {
  CheckNicknameResponse,
  useCheckNicknameMutation,
  useSignupMutation,
} from "@apis/user";

export const useSignUpProfile = () => {
  // TODO: isPendingCheckNickname, isErrorCheckNickname, checkNicknameError는 추후 로딩 및 에러 처리 추가
  const { checkNickname } = useCheckNicknameMutation();
  // TODO: isPendingSignup, isErrorSignup, signupError 추후 추가
  const { signup } = useSignupMutation();

  const [nickname, setNickname] = useState("");
  const [isNicknameDuplicated, setIsNicknameDuplicated] = useState(false);
  const [genre, setGenre] = useState<string | null>(null);

  const disabledNickname = nickname.trim().length < 2;

  const handleCheckNickname = () => {
    checkNickname(
      { nickname },
      {
        onError: () => alert("네트워크 오류 발생. 다시 시도해주세요."),
        onSuccess: (data: CheckNicknameResponse) => {
          if (data.isVerified) {
            setIsNicknameDuplicated(false);
            router.push("/sign-up/genre");
          } else {
            setIsNicknameDuplicated(true);
          }
        },
      },
    );
  };

  const handleSignupAndToOnboarding = () => {
    if (!genre) return null;
    signup({ aliasName: genre, nickname });
  };

  return {
    nickname,
    setNickname,
    isNicknameDuplicated,
    genre,
    setGenre,
    disabledNickname,
    handleCheckNickname,
    handleSignupAndToOnboarding,
  };
};
