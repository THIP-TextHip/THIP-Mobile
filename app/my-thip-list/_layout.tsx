import { Stack } from "expo-router";

import { MyThipListHeader } from "@screens/my-thip-list";
import { colors } from "@theme/token";

export default function MyThipListLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.black.main },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          header: () => <MyThipListHeader />,
        }}
      />
    </Stack>
  );
}
