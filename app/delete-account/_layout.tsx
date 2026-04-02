import { Stack } from "expo-router";

import { DeleteAccountHeader } from "@screens/delete-account";
import { colors } from "@theme/token";

export default function DeleteAccountLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.black.main },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          header: () => <DeleteAccountHeader />,
        }}
      />
    </Stack>
  );
}
