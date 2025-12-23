import { Stack } from "expo-router";

import { colors } from "@theme/token";

import { AlarmHeader } from "./_components";

export default function AlarmLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.black.main },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          header: () => <AlarmHeader />,
        }}
      />
    </Stack>
  );
}
