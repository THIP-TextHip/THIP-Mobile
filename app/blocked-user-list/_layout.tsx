import { Stack } from "expo-router";

import { BlockedUserListHeader } from "@screens/blocked-user-list";
import { colors } from "@theme/token";

export default function BlockedUserListLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.black.main },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          header: () => <BlockedUserListHeader />,
        }}
      />
    </Stack>
  );
}
