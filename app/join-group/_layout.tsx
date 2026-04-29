import { Stack } from "expo-router";

import { JoinGroupHeader } from "@screens/join-group";
import { colors } from "@theme/token";

export default function JoinGroupLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.black.main },
      }}
    >
      <Stack.Screen
        name="[roomId]"
        options={{
          header: () => <JoinGroupHeader />,
        }}
      />
    </Stack>
  );
}
