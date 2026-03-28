import { Pressable, StyleSheet, View } from "react-native";

import { colors } from "@theme/token";

import AppText from "../../../app-text";

interface BottomSheetTopTabBarProps {
  bookType: "SAVED" | "JOINING";
  handleSetBookType: (type: "SAVED" | "JOINING") => void;
}

export default function BottomSheetTopTabBar({
  bookType,
  handleSetBookType,
}: BottomSheetTopTabBarProps) {
  return (
    <View style={styles.tabBar}>
      <Pressable
        style={[
          styles.tab,
          bookType === "SAVED" && { borderBottomColor: colors.white },
        ]}
        onPress={() => handleSetBookType("SAVED")}
      >
        <AppText
          weight="semibold"
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
        onPress={() => handleSetBookType("JOINING")}
      >
        <AppText
          weight="semibold"
          size="sm"
          color={bookType === "JOINING" ? colors.white : colors.grey[300]}
          lineHeight={24}
        >
          모임 책
        </AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    gap: 20,
  },
  tab: {
    paddingTop: 8,
    paddingBottom: 6,
    paddingHorizontal: 4,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
});
