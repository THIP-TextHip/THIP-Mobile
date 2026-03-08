import { Stack } from "expo-router";

import { colors } from "@theme/token";

export default function FeedDetailLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.black.main },
        headerShown: false,
      }}
    >
      {/* TODO: feedId가 없거나 잘못되었을 때 보여줄 페이지 설계 필요 */}
      <Stack.Screen name="[feedId]" />
    </Stack>
  );
}
