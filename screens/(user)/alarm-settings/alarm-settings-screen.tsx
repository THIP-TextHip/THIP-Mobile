import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { AppText, CustomSwitch } from "@shared/ui";
import { colors } from "@theme/token";

export default function AlarmSettingsScreen() {
  // TODO: 초기값 서버에서 받아오기
  const [isOn, setIsOn] = useState(false);
  const handleToggleSwitch = () => {
    // TODO: 서버 요청 보내기
    setIsOn((prev) => !prev);
  };
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <AppText weight="semibold" size="lg" color={colors.white}>
          푸시 알림
        </AppText>
        <View style={styles.content}>
          <AppText weight="regular" size="sm" color={colors.white}>
            알림센터의 모든 알림을 포함해요
          </AppText>
          <CustomSwitch isOn={isOn} handleToggleButton={handleToggleSwitch} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  container: {
    gap: 12,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
