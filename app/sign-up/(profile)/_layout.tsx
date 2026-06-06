import { Stack } from "expo-router";

import {
  NicknameGenreContext,
  SignUpHeader,
  useSignUpProfile,
} from "@screens/sign-up";
import { colors } from "@theme/token";

export default function NicknameGenreLayout() {
  const {
    nickname,
    setNickname,
    isNicknameDuplicated,
    genre,
    setGenre,
    disabledNickname,
    handleCheckNickname,
    handleSignupAndToOnboarding,
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
                handleClickNext={handleCheckNickname}
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
                handleClickNext={handleSignupAndToOnboarding}
              />
            ),
          }}
        />
      </Stack>
    </NicknameGenreContext.Provider>
  );
}
