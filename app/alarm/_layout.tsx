import { Stack } from "expo-router";

import { colors } from "@theme/token";

import AlarmHeader from "./_components/alarm-header";

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
          headerShown: true,
          header: () => <AlarmHeader />,
        }}
      />
    </Stack>
  );
}
