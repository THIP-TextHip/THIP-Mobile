import { Stack } from "expo-router";

import { BookRecruitingGroupHeader } from "@screens/book-recruiting-group";
import { colors } from "@theme/token";

export default function BookRecruitingGroupLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: colors.black.main },
      }}
    >
      <Stack.Screen
        name="[isbn]"
        options={{
          header: () => <BookRecruitingGroupHeader />,
        }}
      />
    </Stack>
  );
}
