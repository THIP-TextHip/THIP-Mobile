import { ReactNode, useMemo } from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";

import { colors } from "@theme/token";

interface CustomButtonProps {
  children: ReactNode;
  type?: "primary" | "cancel";
  size?: "fit" | "full" | "fill";
  disabled?: boolean;
  handlePress: () => void;
}

export default function CustomButton({
  children,
  type = "primary",
  size = "fit",
  disabled = false,
  handlePress,
}: CustomButtonProps) {
  const bgColor =
    type === "cancel" || disabled
      ? colors.grey[300]
      : type === "primary"
        ? colors.purple.main
        : "";

  const sizeStyle = useMemo<ViewStyle | null>(() => {
    if (size === "full") {
      return {
        paddingVertical: 13,
        width: "100%",
        borderRadius: 0,
      };
    }
    if (size === "fill") {
      return { flex: 1 };
    }
    return null;
  }, [size]);

  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor: bgColor,
        },
        sizeStyle,
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
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
