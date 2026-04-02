import { Stack } from "expo-router";

import { DeleteAccountCompleteHeader } from "@screens/delete-account-complete";
import { colors } from "@theme/token";

export default function DeleteAccountCompleteLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.black.main },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          header: () => <DeleteAccountCompleteHeader />,
        }}
      />
    </Stack>
  );
}
