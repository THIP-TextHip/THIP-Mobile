import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";

import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

import { TopTabBar } from "./_components";

export default function Feed() {
  const [isMyFeed, setIsMyFeed] = useState(false);

  const handleFeed = () => {
    setIsMyFeed(false);
  };

  const handleMyFeed = () => {
    setIsMyFeed(true);
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <TopTabBar
        isMyFeed={isMyFeed}
        handleFeed={handleFeed}
        handleMyFeed={handleMyFeed}
      />
      <ScrollView style={{ padding: 20 }}>
        <AppText
          weight="extrabold"
          size="lg"
          color={colors.purple.sub}
          onPress={() => router.push("/login")}
        >
          {isMyFeed ? "내 피드" : "피드"}
        </AppText>
      </ScrollView>
    </View>
  );
}
