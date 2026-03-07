import { Pressable, StyleSheet } from "react-native";

import { colors } from "@theme/token";

import AppText from "../../app-text";

interface ButtonOutlineProps {
  children: string;
  handlePress?: () => void;
}

export default function ButtonOutline({
  children,
  handlePress,
}: ButtonOutlineProps) {
  return (
    <Pressable style={styles.button} onPress={handlePress}>
      <AppText weight="medium" size="sm" color={colors.grey[100]}>
        {children}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: colors.grey[300],
  },
});
