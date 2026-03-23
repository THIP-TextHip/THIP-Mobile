import { Stack } from "expo-router";

import { SearchUserHeader } from "@screens/search-user";
import { colors } from "@theme/token";

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
