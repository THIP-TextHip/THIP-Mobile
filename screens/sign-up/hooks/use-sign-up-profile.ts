import { router } from "expo-router";
import { useState } from "react";

export const useSignUpProfile = () => {
  const [nickname, setNickname] = useState("");
  const [isNicknameDuplicated, setIsNicknameDuplicated] = useState(false);
  const [genre, setGenre] = useState<string | null>(null);

  const disabledNickname = nickname.trim().length < 2;

  // TODO: 중복 여부는 추후 서버 api와 연동하여 판별. 성공 시 이동
  const handleToSelectGenre = () => {
    setIsNicknameDuplicated(false);
    router.push("/sign-up/genre");
  };

  // TODO: 서버에 회원가입 요청
  const handleToOnboarding = () => {
    alert(`닉네임: ${nickname} / 장르: ${genre}`);
    router.push("/sign-up/onboarding");
  };

  return {
    nickname,
    setNickname,
    isNicknameDuplicated,
    genre,
    setGenre,
    disabledNickname,
    handleToSelectGenre,
    handleToOnboarding,
  };
};
