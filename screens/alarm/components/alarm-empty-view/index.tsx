import { StyleSheet, View } from "react-native";

import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

export default function AlarmEmptyView() {
  return (
    <View style={styles.empty}>
      <AppText weight="semibold" size="lg" color={colors.white}>
        새로운 알림이 없어요
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
