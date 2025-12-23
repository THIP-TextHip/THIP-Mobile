import { colors } from "@theme/token";
import { Stack } from "expo-router";

import { MyPageHeader } from "./_components";

export default function MyPageLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.black.main },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          header: () => <MyPageHeader />,
        }}
      />
    </Stack>
  );
}
