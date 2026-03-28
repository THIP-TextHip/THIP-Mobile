import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { FloatingFeedWrite } from "@images/icons";

import { FeedContents, FeedTopTabBar, MyFeedContents } from "./components";

export default function FeedScreen() {
  const [isMyFeed, setIsMyFeed] = useState(false);

  const handleFeed = () => {
    setIsMyFeed(false);
  };

  const handleMyFeed = () => {
    setIsMyFeed(true);
  };

  const handleToWriteFeed = () => {
    // TODO: 피드 글 작성 페이지로 이동
    console.log("피드 글 작성하러 가기");
  };

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
