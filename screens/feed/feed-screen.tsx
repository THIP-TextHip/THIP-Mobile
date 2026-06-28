import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { FloatingFeedWrite } from "@images/icons";

import { FeedContents, FeedTopTabBar, MyFeedContents } from "./components";

export default function FeedScreen() {
  const { tab } = useLocalSearchParams<{ tab?: string }>();
  const [isMyFeed, setIsMyFeed] = useState(tab === "my-feed" ? true : false);

  const handleFeed = () => {
    setIsMyFeed(false);
  };

  const handleMyFeed = () => {
    setIsMyFeed(true);
  };

  const handleToWriteFeed = useCallback(() => {
    router.push("/feed-write");
  }, []);

  return (
    <View style={styles.page}>
      <FeedTopTabBar
        isMyFeed={isMyFeed}
        handleFeed={handleFeed}
        handleMyFeed={handleMyFeed}
      />
      {isMyFeed ? <MyFeedContents /> : <FeedContents />}
      <Pressable style={styles.floating} onPress={handleToWriteFeed}>
        <FloatingFeedWrite />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  floating: {
    position: "absolute",
    bottom: 32,
    right: 20,
  },
});
