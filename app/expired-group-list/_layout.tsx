import { Stack } from "expo-router";

import { ExpiredGroupListHeader } from "@screens/expired-group-list";
import { colors } from "@theme/token";

export default function ExpiredGroupListLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.black.main },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          header: () => <ExpiredGroupListHeader />,
        }}
      />
    </Stack>
  );
}
