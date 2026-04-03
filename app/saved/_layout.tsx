import { Stack } from "expo-router";

import { SavedHeader } from "@screens/saved";
import { colors } from "@theme/token";

export default function SavedLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.black.main },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          header: () => <SavedHeader />,
        }}
      />
    </Stack>
  );
}
