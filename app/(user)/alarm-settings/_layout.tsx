import { Stack } from "expo-router";

import { AlarmSettingsHeader } from "@screens/(user)/alarm-settings";
import { colors } from "@theme/token";

export default function AlarmSettingsLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.black.main },
      }}
    >
      <Stack.Screen
        name="index"
        options={{ header: () => <AlarmSettingsHeader /> }}
      />
    </Stack>
  );
}
