import { colors } from "@/src/theme/token";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  tabBarOuter: {
    backgroundColor: colors.black.main,
  },

  tabBarContainer: {
    flexDirection: "row",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.black.main,
    borderTopColor: colors.grey[300],
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  tabBarItemContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },

  tabBarItemIcon: {
    display: "flex",
    alignSelf: "center",
  },

  tabBarItemTitle: {
    textAlign: "center",
  },
});
