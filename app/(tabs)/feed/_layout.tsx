import { Stack } from "expo-router";

import { colors } from "@theme/token";

import { FeedHeader } from "./_components";

export default function FeedLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.black.main },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          header: () => <FeedHeader />,
        }}
      />
    </Stack>
  );
}
