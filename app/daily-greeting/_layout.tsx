import { Stack } from "expo-router";

import { DailyGreetingHeader } from "@screens/daily-greeting";
import { colors } from "@theme/token";

export default function DailyGreetingLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.black.main },
      }}
    >
      <Stack.Screen
        name="[roomId]"
        options={{
          header: () => <DailyGreetingHeader />,
        }}
      />
    </Stack>
  );
}
