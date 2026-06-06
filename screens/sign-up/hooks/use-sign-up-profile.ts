import { router } from "expo-router";
import { useState } from "react";

import { CheckNicknameResponse, useCheckNicknameMutation } from "@apis/user";

export const useSignUpProfile = () => {
  // TODO: isPendingCheckNickname은 추후 로딩 페이지 및 로딩 관련 처리 적용 시 추가
  const { checkNickname } = useCheckNicknameMutation();

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

  // TODO: 서버에 회원가입 요청
  const handleToOnboarding = () => {
    alert(`닉네임: ${nickname} / 장르: ${genre}`);
    router.replace("/sign-up/onboarding");
  };

  return {
    nickname,
    setNickname,
    isNicknameDuplicated,
    genre,
    setGenre,
    disabledNickname,
    handleCheckNickname,
    handleToOnboarding,
  };
};
