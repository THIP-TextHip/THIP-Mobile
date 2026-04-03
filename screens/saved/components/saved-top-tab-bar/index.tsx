import { useRef } from "react";
import { Animated, Easing, Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

const TAB_WIDTH = 60;
const TAB_GAP = 20;
const INDICATOR_MOVE_X = TAB_WIDTH + TAB_GAP;

interface SavedTopTabBarProps {
  type: "FEED" | "BOOK";
  handleChangeType: (type: "FEED" | "BOOK") => void;
}

export default function SavedTopTabBar({
  type,
  handleChangeType,
}: SavedTopTabBarProps) {
  const translateX = useRef(new Animated.Value(0)).current;

  const animateIndicator = (toValue: number) => {
    Animated.timing(translateX, {
      toValue,
      duration: 500,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  };

  const handlePressFeed = () => {
    handleChangeType("FEED");
    animateIndicator(0);
  };

  const handlePressBook = () => {
    handleChangeType("BOOK");
    animateIndicator(INDICATOR_MOVE_X);
  };

  return (
    <View style={styles.tabBarContainer}>
      <Pressable style={styles.tabBarItem} onPress={handlePressFeed}>
        <AppText
          weight={type === "FEED" ? "semibold" : "medium"}
          size="lg"
          color={type === "FEED" ? colors.white : colors.grey[300]}
        >
          피드
        </AppText>
      </Pressable>
      <Pressable style={styles.tabBarItem} onPress={handlePressBook}>
        <AppText
          weight={type === "BOOK" ? "semibold" : "medium"}
          size="lg"
          color={type === "BOOK" ? colors.white : colors.grey[300]}
        >
          책
        </AppText>
      </Pressable>
      <Animated.View
        style={[
          styles.tabIndicator,
          {
            transform: [{ translateX }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    paddingTop: 20,
    paddingHorizontal: 20,
    gap: TAB_GAP,
  },

  tabBarItem: {
    width: TAB_WIDTH,
    height: 40,
    paddingVertical: 8,
    paddingHorizontal: 4,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  tabIndicator: {
    position: "absolute",
    left: 20,
    bottom: 0,
    width: TAB_WIDTH,
    height: 2,
    backgroundColor: colors.white,
  },
});
