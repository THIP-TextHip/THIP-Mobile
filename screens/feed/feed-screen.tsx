import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { FeedContents, MyFeedContents, TopTabBar } from "./components";

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
      {isMyFeed ? <MyFeedContents /> : <FeedContents />}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});
