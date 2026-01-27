import { router } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";

import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

export default function MyFeedContents() {
  // TODO: 토스트 메시지 테스트용. 삭제 예정
  const handleShowToastTest = () => {
    Toast.show({
      type: "default",
      text1:
        "Hello, 엄청 긴 텍스트, 엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트",
    });
  };
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
      {/* TODO: 토스트 메시지 테스트를 위한 부분 */}
      <AppText
        weight="extrabold"
        size="lg"
        color={colors.purple.sub}
        onPress={handleShowToastTest}
      >
        토스트 메시지!
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
