import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

import { TopTabBar } from "./components";
import MyThipPreview from "./components/my-thip-preview";

export default function FeedScreen() {
  const [isMyFeed, setIsMyFeed] = useState(false);

  const handleFeed = () => {
    setIsMyFeed(false);
  };

  const handleMyFeed = () => {
    setIsMyFeed(true);
  };

  return (
    <View style={styles.page}>
      <TopTabBar
        isMyFeed={isMyFeed}
        handleFeed={handleFeed}
        handleMyFeed={handleMyFeed}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <MyThipPreview />
        <AppText
          weight="extrabold"
          size="lg"
          color={colors.purple.sub}
          // TODO: 로그인 페이지 테스트를 위한 것이니 추후 제거 필요
          onPress={() => router.push("/login")}
        >
          {isMyFeed ? "내 피드" : "피드"}
        </AppText>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  content: {
    padding: 20,
    gap: 40,
  },
});
