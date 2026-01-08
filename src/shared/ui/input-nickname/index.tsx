import { StyleSheet, TextInput, View } from "react-native";

import { colors, typography } from "@theme/token";

import AppText from "../app-text";
import {
  INVALID_NICKNAME_CHARS_REGEX,
  NICKNAME_MAX_LENGTH,
  NICKNAME_PLACEHOLDER,
} from "./constants";

interface InputNicknameProps {
  value: string;
  isError: boolean;
  errorMessage: string;
  setValue: (value: string) => void;
}

export default function InputNickname({
  value,
  isError,
  errorMessage,
  setValue,
}: InputNicknameProps) {
  const handleChangeText = (text: string) => {
    const normalized = text.toLowerCase();
    const sanitized = normalized.replace(INVALID_NICKNAME_CHARS_REGEX, "");
    setValue(sanitized.slice(0, NICKNAME_MAX_LENGTH));
  };

  return (
    <View
      style={[
        styles.inputContainer,
        isError && { borderWidth: 1, borderColor: colors.red },
      ]}
    >
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={handleChangeText}
        placeholder={NICKNAME_PLACEHOLDER}
        placeholderTextColor={colors.grey[300]}
        selectionColor={colors.neongreen}
        cursorColor={colors.neongreen}
        maxLength={NICKNAME_MAX_LENGTH}
      />
      <AppText weight="regular" size="xs" color={colors.grey[100]}>
        {value.length}/{NICKNAME_MAX_LENGTH}
      </AppText>
      {isError && (
        <AppText
          weight="regular"
          size="xs"
          color={colors.red}
          style={styles.error}
        >
          {errorMessage}
        </AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    height: 48,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: colors.darkgrey.dark,
  },
  input: {
    flex: 1,
    color: colors.white,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
  },

  error: {
    position: "absolute",
    left: 4,
    bottom: -22,
  },
});
