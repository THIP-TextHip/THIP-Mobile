import { Alert, Linking, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

import {
  useChangePushNotificationState,
  useGetPushNotificationState,
  useRegisterNotificationToken,
} from "@apis/notification";
import {
  requestNotificationPermission,
  tryRegisterCurrentDeviceNotificationToken,
} from "@apis/notification-token";
import { AppText, CustomSwitch } from "@shared/ui";
import { colors } from "@theme/token";

const showNotificationPermissionSettingsAlert = () => {
  Alert.alert(
    "알림 권한이 꺼져 있어요",
    "푸시 알림을 받으려면 앱 설정에서 알림 권한을 허용해 주세요.",
    [
      { text: "취소", style: "cancel" },
      {
        text: "설정으로 이동",
        onPress: () => {
          void Linking.openSettings().catch((error) => {
            console.error("[notification] open settings failed", error);
            Toast.show({
              type: "error",
              text1: "앱 설정을 열지 못했어요.",
            });
          });
        },
      },
    ],
  );
};

export default function AlarmSettingsScreen() {
  const { registerNotificationTokenAsync } = useRegisterNotificationToken();

  const { isPushNotificationEnabled, isPendingPushNotificationData } =
    useGetPushNotificationState();
  const { changePushNotification, isPendingChangePushNotification } =
    useChangePushNotificationState();

  const handleToggleSwitch = async () => {
    if (isPendingChangePushNotification || isPendingPushNotificationData) {
      return;
    }

    try {
      if (isPushNotificationEnabled) {
        changePushNotification({ enable: false });
        return;
      }

      const hasPermission = await requestNotificationPermission();

      if (!hasPermission) {
        showNotificationPermissionSettingsAlert();
        return;
      }

      const isTokenRegistered = await tryRegisterCurrentDeviceNotificationToken(
        registerNotificationTokenAsync,
      );

      if (!isTokenRegistered) {
        Toast.show({
          type: "error",
          text1: "푸시 알림 설정에 실패했어요. 다시 시도해 주세요.",
        });
        return;
      }

      changePushNotification({ enable: true });
    } catch (error) {
      console.error(
        "[AlarmSettingsScreen] notification permission failed",
        error,
      );
      Toast.show({
        type: "error",
        text1: "알림 권한을 확인하지 못했어요. 다시 시도해 주세요.",
      });
    }
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
