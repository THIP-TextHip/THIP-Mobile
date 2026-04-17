import { Stack } from "expo-router";

import { SearchGroupHeader } from "@screens/search-group";
import { colors } from "@theme/token";

export default function SearchGroupLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.black.main },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          header: () => <SearchGroupHeader />,
        }}
      />
    </Stack>
  );
}
