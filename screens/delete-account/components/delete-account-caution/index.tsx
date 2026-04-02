import { StyleSheet, useWindowDimensions, View } from "react-native";

import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

export default function DeleteAccountCaution() {
  const { height } = useWindowDimensions();
  return (
    <View style={[styles.container, { height: height * 0.55 }]}>
      <AppText weight="medium" size="base" color={colors.white} lineHeight={24}>
        탈퇴 주의사항
      </AppText>
      <View style={styles.content}>
        <AppText
          weight="regular"
          size="sm"
          color={colors.white}
          lineHeight={20}
        >
          회원탈퇴 시 계정 및 활동 데이터는
          <AppText
            weight="regular"
            size="sm"
            color={colors.red}
            lineHeight={20}
          >
            {" "}
            즉시 삭제
          </AppText>
          되며,
          <AppText
            weight="regular"
            size="sm"
            color={colors.red}
            lineHeight={20}
          >
            {" "}
            복구가 불가능
          </AppText>
          합니다.
        </AppText>
        <AppText
          weight="regular"
          size="sm"
          color={colors.white}
          lineHeight={20}
        >
          백업 및 로그 역시 보안 저장 후 최대 90일 내 자동 삭제됩니다.
        </AppText>
        <AppText
          weight="regular"
          size="sm"
          color={colors.white}
          lineHeight={20}
        >
          법령상 보존 의무가 있는 정보는 해당 기간 동안 보관됩니다.
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    gap: 40,
    backgroundColor: colors.darkgrey.dark,
    borderRadius: 12,
  },
  content: {
    gap: 20,
  },
});
