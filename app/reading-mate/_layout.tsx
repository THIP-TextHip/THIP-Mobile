import { Stack } from "expo-router";

import { ReadingMateHeader } from "@screens/reading-mate";
import { colors } from "@theme/token";

export default function ReadingMateLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.black.main },
      }}
    >
      <Stack.Screen
        name="[roomId]"
        options={{
          header: () => <ReadingMateHeader />,
        }}
      />
    </Stack>
  );
}
