import * as WebBrowser from "expo-web-browser";
import { Pressable, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

import { IcCheckGreen } from "@images/icons";
import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

interface TermsAgreementRowProps {
  label: string;
  checked: boolean;
  handleToggle: () => void;
  /** 전달하면 라벨 옆에 전문 보기 버튼이 노출된다. */
  url?: string;
  isEmphasized?: boolean;
}

export default function TermsAgreementRow({
  label,
  checked,
  handleToggle,
  url,
  isEmphasized,
}: TermsAgreementRowProps) {
  const handleOpenUrl = async () => {
    if (!url) return;

    try {
      await WebBrowser.openBrowserAsync(url);
    } catch (e) {
      Toast.show({
        type: "error",
        text1: `링크 열기 실패: ${e}`,
      });
    }
  };

  return (
    <View style={styles.row}>
      <Pressable
        style={styles.labelWrapper}
        onPress={handleToggle}
        hitSlop={10}
        accessibilityRole="checkbox"
        accessibilityState={{ checked }}
        accessibilityLabel={label}
      >
        <View style={[styles.checkbox, isEmphasized && styles.checkboxLarge]}>
          {checked && <IcCheckGreen />}
        </View>
        <AppText
          weight={isEmphasized ? "medium" : "regular"}
          size={isEmphasized ? "base" : "sm"}
          color={isEmphasized ? colors.white : colors.grey[100]}
          lineHeight={20}
        >
          {label}
        </AppText>
      </Pressable>
      {url && (
        <Pressable
          onPress={handleOpenUrl}
          hitSlop={10}
          accessibilityRole="link"
          accessibilityLabel={`${label} 전문 보기`}
        >
          <AppText
            weight="regular"
            size="xs"
            color={colors.grey[200]}
            lineHeight={20}
            style={styles.viewText}
          >
            보기
          </AppText>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  labelWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.grey[200],
  },
  checkboxLarge: {
    width: 30,
    height: 30,
  },
  viewText: {
    textDecorationLine: "underline",
  },
});
