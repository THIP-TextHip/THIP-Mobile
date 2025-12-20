import { colors } from "@theme/token";
import { Stack } from "expo-router";

import GroupHeader from "./_components/group-header";

export default function GroupLayout() {
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
          header: () => <GroupHeader />,
        }}
      />
    </Stack>
  );
}
