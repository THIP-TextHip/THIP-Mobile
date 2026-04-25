import { Stack } from "expo-router";

import { MyGroupListHeader } from "@screens/my-group-list";
import { colors } from "@theme/token";

export default function MyGroupListLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.black.main },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          header: () => <MyGroupListHeader />,
        }}
      />
    </Stack>
  );
}
