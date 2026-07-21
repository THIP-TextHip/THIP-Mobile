import { useScrollToTop } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";

import { FloatingFeedWrite } from "@images/icons";

import { FeedContents, FeedTopTabBar, MyFeedContents } from "./components";

export default function FeedScreen() {
  const { tab } = useLocalSearchParams<{ tab?: string }>();
  const [isMyFeed, setIsMyFeed] = useState(tab === "my-feed" ? true : false);
  const listRef = useRef<FlatList>(null);
  const tabPressRef = useRef({
    scrollToTop: () => {},
  });

  const handleScrollToTop = () => {
    listRef.current?.scrollToOffset({
      offset: 0,
      animated: true,
    });
  };

  tabPressRef.current.scrollToTop = () => handleScrollToTop();

  useScrollToTop(tabPressRef);

  const handleFeed = () => {
    if (!isMyFeed) {
      handleScrollToTop();
      return;
    }
    setIsMyFeed(false);
  };

  const handleMyFeed = () => {
    if (isMyFeed) {
      handleScrollToTop();
      return;
    }
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
      {isMyFeed ? (
        <MyFeedContents listRef={listRef} />
      ) : (
        <FeedContents listRef={listRef} />
      )}
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
