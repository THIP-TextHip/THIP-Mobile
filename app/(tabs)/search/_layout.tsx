import { colors } from "@/src/theme/token";
import { Stack } from "expo-router";

import SearchHeader from "./_components/search-header";

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
          headerShown: true,
          header: () => <SearchHeader />,
        }}
      />
    </Stack>
  );
}
