import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

import { AppText, CustomSwitch } from "@shared/ui";
import { getFormattedCurrentDateTime } from "@shared/utils";
import { colors } from "@theme/token";

export default function AlarmSettingsScreen() {
  // TODO: 초기값 서버에서 받아오기
  const [isOn, setIsOn] = useState(false);
  const handleToggleSwitch = () => {
    // TODO: 서버 요청 보내기
    // 알림 설정 변경 성공 시 토스트 띄우기
    if (isOn) {
      Toast.show({
        type: "alarm",
        text1: "푸시 알림이 해제되었어요.",
        text2: `${getFormattedCurrentDateTime()}`,
      });
    } else {
      Toast.show({
        type: "alarm",
        text1: "푸시 알림이 설정되었어요.",
        text2: `${getFormattedCurrentDateTime()}`,
      });
    }
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
