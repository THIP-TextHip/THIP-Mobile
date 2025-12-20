import { useRef } from "react";
import { Animated, Easing, Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

const TAB_WIDTH = 60;
const TAB_GAP = 20;
const INDICATOR_MOVE_X = TAB_WIDTH + TAB_GAP;

interface TopTabBarProps {
  isMyFeed: boolean;
  handleFeed: () => void;
  handleMyFeed: () => void;
}

export default function TopTabBar({
  isMyFeed,
  handleFeed,
  handleMyFeed,
}: TopTabBarProps) {
  const translateX = useRef(new Animated.Value(0)).current;

  const animateIndicator = (toValue: number) => {
    Animated.timing(translateX, {
      toValue,
      duration: 500,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  };

  const handleClickFeed = () => {
    handleFeed();
    animateIndicator(0);
  };

  const handleClickMyFeed = () => {
    handleMyFeed();
    animateIndicator(INDICATOR_MOVE_X);
  };

  return (
    <View style={styles.tabBarContainer}>
      <Pressable style={styles.tabBarItem} onPress={handleClickFeed}>
        <AppText
          weight={isMyFeed ? "medium" : "semibold"}
          size="lg"
          color={isMyFeed ? colors.grey[300] : colors.white}
        >
          피드
        </AppText>
      </Pressable>
      <Pressable style={styles.tabBarItem} onPress={handleClickMyFeed}>
        <AppText
          weight={isMyFeed ? "semibold" : "medium"}
          size="lg"
          color={isMyFeed ? colors.white : colors.grey[300]}
        >
          내 피드
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
    paddingTop: 32,
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
