import { router } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";

import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

export default function MyFeedContents() {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <AppText
        weight="extrabold"
        size="lg"
        color={colors.purple.sub}
        // TODO: 로그인 페이지 테스트를 위한 것이니 추후 제거 필요
        onPress={() => router.push("/login")}
      >
        로그인으로
      </AppText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    gap: 40,
  },
});
