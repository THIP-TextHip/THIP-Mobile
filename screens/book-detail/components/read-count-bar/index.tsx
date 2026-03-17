import { StyleSheet, View } from "react-native";

import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

interface ReadCountBarProps {
  readCount: number;
}

export default function ReadCountBar({ readCount }: ReadCountBarProps) {
  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <AppText size="sm">🔥</AppText>
        <AppText
          weight="regular"
          size="sm"
          color={colors.neongreen}
          style={{ lineHeight: 24 }}
        >
          {readCount}명이 읽기에 참여중이에요!
        </AppText>
        <AppText size="sm">🔥</AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 8,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 20,
  },

  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.darkgrey.dark,
    borderRadius: 16,
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
});
