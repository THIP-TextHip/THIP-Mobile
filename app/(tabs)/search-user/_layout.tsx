import { Stack } from "expo-router";

import { colors } from "@theme/token";

import { SearchUserHeader } from "./_components";

export default function SearchUserLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.black.main },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          header: () => <SearchUserHeader />,
        }}
      />
    </Stack>
  );
}
