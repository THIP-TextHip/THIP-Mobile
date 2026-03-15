import { Stack } from "expo-router";

import { UserProfileHeader } from "@screens/user-profile";
import { colors } from "@theme/token";

export default function UserProfileLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.black.main },
      }}
    >
      <Stack.Screen
        name="[userId]"
        options={{ header: () => <UserProfileHeader /> }}
      />
    </Stack>
  );
}
