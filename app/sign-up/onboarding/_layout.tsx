import { Stack } from "expo-router";

import { colors } from "@theme/token";

export default function OnboardingLayout() {
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
