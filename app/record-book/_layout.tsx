import { Stack } from "expo-router";

import { RecordBookHeader } from "@screens/record-book";
import { colors } from "@theme/token";

export default function RecordBookLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.black.main },
      }}
    >
      <Stack.Screen
        name="[roomId]"
        options={{
          header: () => <RecordBookHeader />,
        }}
      />
    </Stack>
  );
}
