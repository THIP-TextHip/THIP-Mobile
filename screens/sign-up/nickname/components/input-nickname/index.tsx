import { StyleSheet, TextInput, View } from "react-native";

import {
  INVALID_NICKNAME_CHARS_REGEX,
  NICKNAME_MAX_LENGTH,
} from "@shared/constants";
import { AppText } from "@shared/ui";
import { colors, typography } from "@theme/token";

interface InputNicknameProps {
  value: string;
  isNicknameDuplicated: boolean;
  setValue: (value: string) => void;
}

export default function InputNickname({
  value,
  isNicknameDuplicated,
  setValue,
}: InputNicknameProps) {
  const handleChangeText = (text: string) => {
    const normalized = text.toLowerCase();
    const sanitized = normalized.replace(INVALID_NICKNAME_CHARS_REGEX, "");
    setValue(sanitized.slice(0, NICKNAME_MAX_LENGTH));
  };

  return (
    <>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            isNicknameDuplicated && { borderWidth: 1, borderColor: colors.red },
          ]}
          value={value}
          onChangeText={handleChangeText}
          placeholder="한글/영문소문자/숫자로 구성"
          placeholderTextColor={colors.grey[300]}
          selectionColor={colors.neongreen}
          cursorColor={colors.neongreen}
          maxLength={NICKNAME_MAX_LENGTH}
        />
        <AppText weight="regular" size="xs" color={colors.grey[100]}>
          {value.length}/{NICKNAME_MAX_LENGTH}
        </AppText>
      </View>
      {isNicknameDuplicated && (
        <AppText
          weight="regular"
          size="xs"
          color={colors.red}
          style={styles.error}
        >
          이미 사용중인 닉네임입니다.
        </AppText>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
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
    paddingTop: 7,
    paddingHorizontal: 4,
  },
});
