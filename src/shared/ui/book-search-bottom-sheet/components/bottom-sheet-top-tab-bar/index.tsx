import { useRef } from "react";
import { Animated, Easing, Pressable, StyleSheet, View } from "react-native";

import { colors } from "@theme/token";

import AppText from "../../../app-text";

const TAB_WIDTH = 60;
const TAB_GAP = 20;
const INDICATOR_MOVE_X = TAB_WIDTH + TAB_GAP;

interface BottomSheetTopTabBarProps {
  bookType: "SAVED" | "JOINING";
  handleSetBookType: (type: "SAVED" | "JOINING") => void;
}

export default function BottomSheetTopTabBar({
  bookType,
  handleSetBookType,
}: BottomSheetTopTabBarProps) {
  const translateX = useRef(
    new Animated.Value(bookType === "JOINING" ? INDICATOR_MOVE_X : 0),
  ).current;

  const animateIndicator = (toValue: number) => {
    Animated.timing(translateX, {
      toValue,
      duration: 500,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  };

  const handlePressSavedBook = () => {
    handleSetBookType("SAVED");
    animateIndicator(0);
  };

  const handlePressGroupBook = () => {
    handleSetBookType("JOINING");
    animateIndicator(INDICATOR_MOVE_X);
  };

  return (
    <View style={styles.tabBar}>
      <Pressable
        style={[
          styles.tab,
          bookType === "SAVED" && { borderBottomColor: colors.white },
        ]}
        onPress={handlePressSavedBook}
      >
        <AppText
          weight={bookType === "SAVED" ? "semibold" : "medium"}
          size="sm"
          color={bookType === "SAVED" ? colors.white : colors.grey[300]}
          lineHeight={24}
        >
          저장한 책
        </AppText>
      </Pressable>
      <Pressable
        style={[
          styles.tab,
          bookType === "JOINING" && { borderBottomColor: colors.white },
        ]}
        onPress={handlePressGroupBook}
      >
        <AppText
          weight={bookType === "JOINING" ? "semibold" : "medium"}
          size="sm"
          color={bookType === "JOINING" ? colors.white : colors.grey[300]}
          lineHeight={24}
        >
          모임 책
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
  tabBar: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    gap: TAB_GAP,
  },
  tab: {
    width: TAB_WIDTH,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  tabIndicator: {
    position: "absolute",
    bottom: 0,
    width: TAB_WIDTH,
    height: 2,
    backgroundColor: colors.white,
  },
});
