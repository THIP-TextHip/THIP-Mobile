import { ReactNode } from "react";
import { Pressable, StyleSheet } from "react-native";

import { colors } from "@theme/token";

interface CustomButtonProps {
  children: ReactNode;
  size?: "medium" | "fill";
  disabled?: boolean;
  handlePress: () => void;
}

export default function CustomButton({
  children,
  size = "medium",
  disabled = false,
  handlePress,
}: CustomButtonProps) {
  return (
    <Pressable
      style={[
        styles.container,
        disabled && { backgroundColor: colors.grey[300] },
        size === "fill" && {
          paddingVertical: 13,
          width: "100%",
          borderRadius: "none",
        },
      ]}
      onPress={handlePress}
      disabled={disabled}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.purple.main,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
