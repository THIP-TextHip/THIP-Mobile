import { Redirect, Stack } from "expo-router";

import {
  NicknameGenreContext,
  SignUpHeader,
  useSignUpProfile,
} from "@screens/sign-up";
import { useSignUpAgreementStore } from "@stores/sign-up-agreement";
import { colors } from "@theme/token";

export default function NicknameGenreLayout() {
  const { hasAgreedToTerms } = useSignUpAgreementStore();
  const {
    nickname,
    setNickname,
    isNicknameDuplicated,
    genre,
    setGenre,
    disabledNickname,
    handleCheckNickname,
    handleSignupAndToOnboarding,
    isPendingCheckNickname,
    isPendingSignup,
  } = useSignUpProfile();

  // 딥링크로 닉네임·장르 화면에 바로 들어오는 것을 막는다.
  if (!hasAgreedToTerms) {
    return <Redirect href="/sign-up/terms" />;
  }

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
                disabled={disabledNickname || isPendingCheckNickname}
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
                disabled={!genre || isPendingSignup}
                handleClickNext={handleSignupAndToOnboarding}
              />
            ),
          }}
        />
      </Stack>
    </NicknameGenreContext.Provider>
  );
}
