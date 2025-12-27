import { Stack } from "expo-router";

import { SignUpNicknameHeader } from "@screens/sign-up/nickname";
import { colors } from "@theme/token";

export default function SignUpNicknameLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.black.main },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          header: () => <SignUpNicknameHeader />,
        }}
      />
    </Stack>
  );
}
