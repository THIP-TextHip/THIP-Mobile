import { Pressable, StyleSheet } from "react-native";

import { colors } from "@theme/token";

import AppText from "../../app-text";

interface ButtonHeaderProps {
  children: string;
  disabled?: boolean;
  handleClickButton: () => void;
}

export default function ButtonHeader({
  children,
  disabled,
  handleClickButton,
}: ButtonHeaderProps) {
  return (
    <Pressable
      style={[
        styles.buttonContainer,
        disabled
          ? { backgroundColor: colors.grey[300] }
          : { backgroundColor: colors.purple.main },
      ]}
      onPress={handleClickButton}
      disabled={disabled}
    >
      <AppText weight="semibold" size="sm" color={colors.white}>
        {children}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: 28,
    paddingVertical: 4,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});
