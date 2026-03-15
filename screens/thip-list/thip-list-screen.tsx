import { useLocalSearchParams } from "expo-router";

import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

export default function ThipListScreen() {
  const { userId } = useLocalSearchParams<{ userId: string }>();

  return <AppText color={colors.white}>{userId}유저 띱 목록 페이지</AppText>;
}
