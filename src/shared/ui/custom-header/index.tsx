import { colors } from "@theme/token";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

interface CustomHeaderProps {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
}

export default function CustomHeader({
  left,
  center,
  right,
}: CustomHeaderProps) {
  return (
    <View style={styles.headerContainer}>
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
