import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { IcXCircleBlack } from "@images/icons";
import { colors, typography } from "@theme/token";

import AppText from "../app-text";
import CustomSwitch from "../custom-switch";

interface VisibilitySectionProps {
  isPublic: boolean;
  password: string;
  handleChangeVisibility: (isPublic: boolean) => void;
  handleChangePassword: (password: string) => void;
}

export default function VisibilitySection({
  isPublic,
  password,
  handleChangeVisibility,
  handleChangePassword,
}: VisibilitySectionProps) {
  const handleToggle = () => {
    handleChangeVisibility(!isPublic);
  };

  const isNotPublic = !isPublic;
  return (
    <View style={styles.section}>
      <View style={styles.row}>
        <AppText
          weight="semibold"
          size="lg"
          color={colors.white}
          lineHeight={24}
        >
          공개 설정
        </AppText>
        {isNotPublic && password.trim().length !== 4 && (
          <AppText weight="regular" size="xs" color={colors.red}>
            비밀번호 4자리를 입력해주세요.
          </AppText>
        )}
      </View>
      <View style={styles.row}>
        <AppText
          weight="regular"
          size="sm"
          color={colors.white}
          lineHeight={24}
        >
          비공개로 설정
        </AppText>
        <CustomSwitch isOn={isNotPublic} handleToggleButton={handleToggle} />
      </View>
      {isNotPublic && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={handleChangePassword}
            placeholder="비밀번호 입력"
            placeholderTextColor={colors.grey[300]}
            selectionColor={colors.neongreen}
            cursorColor={colors.neongreen}
            keyboardType="number-pad"
            maxLength={4}
            contextMenuHidden
          />
          <Pressable onPress={() => handleChangePassword("")}>
            <IcXCircleBlack />
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 12,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    backgroundColor: colors.darkgrey.dark,
  },
  input: {
    flex: 1,
    color: colors.white,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
  },
});
