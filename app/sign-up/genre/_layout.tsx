import { Stack } from "expo-router";

import { colors } from "@theme/token";

export default function SignUpGenreLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.black.main },
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
