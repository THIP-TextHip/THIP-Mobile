import { StyleSheet, View } from "react-native";

import {
  useChangePushNotificationState,
  useGetPushNotificationState,
} from "@apis/notification";
import { AppText, CustomSwitch } from "@shared/ui";
import { colors } from "@theme/token";

export default function AlarmSettingsScreen() {
  const {
    isPushNotificationEnabled,
    isPendingPushNotificationData,
    isErrorPushNotificationData,
  } = useGetPushNotificationState();
  const { changePushNotification, isPendingChangePushNotification } =
    useChangePushNotificationState();

  const handleToggleSwitch = () => {
    if (
      isPendingChangePushNotification ||
      isPendingPushNotificationData ||
      isErrorPushNotificationData
    )
      return null;
    changePushNotification({ enable: !isPushNotificationEnabled });
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
          <CustomSwitch
            isOn={isPushNotificationEnabled}
            handleToggleButton={handleToggleSwitch}
          />
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
