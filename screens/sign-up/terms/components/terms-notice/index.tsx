import { StyleSheet, View } from "react-native";

import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

export default function TermsNotice() {
  return (
    <View style={styles.container}>
      <AppText weight="medium" size="base" color={colors.white} lineHeight={24}>
        THIP 커뮤니티 이용 규칙
      </AppText>
      <View style={styles.content}>
        <AppText
          weight="regular"
          size="sm"
          color={colors.white}
          lineHeight={20}
        >
          THIP은 불쾌감을 주는 게시물과 다른 이용자를 괴롭히는 행위를
          <AppText
            weight="regular"
            size="sm"
            color={colors.red}
            lineHeight={20}
          >
            {" "}
            일절 허용하지 않습니다.
          </AppText>
        </AppText>
        <AppText
          weight="regular"
          size="sm"
          color={colors.white}
          lineHeight={20}
        >
          부적절한 게시물은 언제든 신고할 수 있습니다. 신고된 게시물은 삭제될 수
          있으며, 이를 위반한 이용자는 사전 통보 없이 이용이 제한되거나 계정이
          해지될 수 있습니다.
        </AppText>
        <AppText
          weight="regular"
          size="sm"
          color={colors.white}
          lineHeight={20}
        >
          만 14세 이상부터 가입할 수 있어요.
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    gap: 30,
    backgroundColor: colors.darkgrey.dark,
    borderRadius: 12,
  },
  content: {
    gap: 20,
  },
});
