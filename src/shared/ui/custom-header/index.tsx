import { ReactNode } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { colors } from "@theme/token";

interface CustomHeaderProps {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function CustomHeader({
  left,
  center,
  right,
  containerStyle,
}: CustomHeaderProps) {
  return (
    <View style={[styles.headerContainer, containerStyle]}>
      <View style={styles.headerLeft}>{left}</View>
      <View style={styles.headerContent}>{center}</View>
      <View style={styles.headerRight}>{right}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.black.main,
    paddingVertical: 16,
    paddingHorizontal: 20,
    height: 56,
  },
  headerLeft: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerContent: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  headerRight: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
