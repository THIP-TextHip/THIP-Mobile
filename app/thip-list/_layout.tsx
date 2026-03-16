import { Stack } from "expo-router";

import { ThipListHeader } from "@/screens/thip-list";
import { colors } from "@theme/token";

export default function ThipListLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.black.main },
      }}
    >
      <Stack.Screen
        name="[userId]"
        options={{
          header: () => <ThipListHeader />,
        }}
      />
    </Stack>
  );
}
