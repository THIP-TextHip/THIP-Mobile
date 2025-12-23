import { colors } from "@/src/theme/token";
import { Stack } from "expo-router";

import { SearchHeader } from "./_components";

export default function SearchLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.black.main },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          header: () => <SearchHeader />,
        }}
      />
    </Stack>
  );
}
