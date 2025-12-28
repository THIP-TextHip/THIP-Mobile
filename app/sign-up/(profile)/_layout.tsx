import { Stack } from "expo-router";

import { SignUpHeader } from "@screens/sign-up/components";
import { NicknameGenreContext, useSignUpProfile } from "@screens/sign-up/hooks";
import { colors } from "@theme/token";

export default function NicknameGenreLayout() {
  const {
    nickname,
    setNickname,
    isNicknameDuplicated,
    genre,
    setGenre,
    disabledNickname,
    handleToSelectGenre,
    handleToOnboarding,
  } = useSignUpProfile();

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
