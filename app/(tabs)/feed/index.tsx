import { AppText } from "@shared/ui";
import { colors } from "@theme/token";
import { View } from "react-native";

import { useState } from "react";
import TopTabBar from "./_components/top-tab-bar";

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
      <AppText weight="extrabold" size="lg" color={colors.purple.sub}>
        {isMyFeed ? "내 피드" : "피드"}
      </AppText>
    </View>
  );
}
