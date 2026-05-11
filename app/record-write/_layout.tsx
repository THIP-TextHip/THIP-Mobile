import { Stack } from "expo-router";

import { colors } from "@theme/token";

export default function RecordWriteLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.black.main },
      }}
    >
      <Stack.Screen
        name="[roomId]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
