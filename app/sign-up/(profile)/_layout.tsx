import { router, Stack } from "expo-router";
import { useState } from "react";

import { SignUpHeader } from "@screens/sign-up/components";
import { NicknameGenreContext } from "@screens/sign-up/hooks";
import { colors } from "@theme/token";

export default function NicknameGenreLayout() {
  // TODO: 훅으로 통합 => (screens/sign-up/nickname)
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

  return (
    <NicknameGenreContext.Provider
      value={{ nickname, isNicknameDuplicated, genre, setNickname, setGenre }}
    >
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: colors.black.main },
        }}
      >
        <Stack.Screen
          name="nickname"
          options={{
            header: () => (
              <SignUpHeader
                step={1}
                disabled={disabledNickname}
                handleClickNext={handleToSelectGenre}
              />
            ),
          }}
        />
        <Stack.Screen
          name="genre"
          options={{
            header: () => (
              <SignUpHeader
                step={2}
                disabled={!genre}
                handleClickNext={handleToOnboarding}
              />
            ),
          }}
        />
      </Stack>
    </NicknameGenreContext.Provider>
  );
}
