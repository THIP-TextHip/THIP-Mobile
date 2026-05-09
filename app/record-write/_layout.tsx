import { Stack } from "expo-router";

import { RecordWriteHeader } from "@screens/record-write";
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
          header: () => <RecordWriteHeader />,
        }}
      />
    </Stack>
  );
}
