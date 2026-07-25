import * as Notifications from "expo-notifications";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, AppState, Linking, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

import {
  useChangePushNotificationState,
  useGetPushNotificationState,
  useRegisterNotificationToken,
} from "@apis/notification";
import {
  isNotificationPermissionGranted,
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
  const isHandlingPermissionRef = useRef(false);
  const shouldPrepareNotificationAgainRef = useRef(false);
  const [canRequestNotificationServer, setCanRequestNotificationServer] =
    useState(false);
  const { registerNotificationTokenAsync } = useRegisterNotificationToken();

  const { isPushNotificationEnabled, isPendingPushNotificationData } =
    useGetPushNotificationState(canRequestNotificationServer);
  const { changePushNotification, isPendingChangePushNotification } =
    useChangePushNotificationState();

  const prepareNotificationServer = useCallback(async () => {
    if (isHandlingPermissionRef.current) {
      shouldPrepareNotificationAgainRef.current = true;
      return;
    }

    isHandlingPermissionRef.current = true;

    try {
      do {
        shouldPrepareNotificationAgainRef.current = false;
        setCanRequestNotificationServer(false);

        const hasPermission = isNotificationPermissionGranted(
          await Notifications.getPermissionsAsync(),
        );

        if (!hasPermission) {
          continue;
        }

        const isTokenRegistered =
          await tryRegisterCurrentDeviceNotificationToken(
            registerNotificationTokenAsync,
          );

        if (!shouldPrepareNotificationAgainRef.current) {
          setCanRequestNotificationServer(isTokenRegistered);
        }
      } while (shouldPrepareNotificationAgainRef.current);
    } catch (error) {
      console.error(
        "[AlarmSettingsScreen] notification preparation failed",
        error,
      );
      setCanRequestNotificationServer(false);
    } finally {
      isHandlingPermissionRef.current = false;
    }
  }, [registerNotificationTokenAsync]);

  useEffect(() => {
    void prepareNotificationServer();

    const subscription = AppState.addEventListener("change", (nextState) => {
      if (nextState === "active") {
        void prepareNotificationServer();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [prepareNotificationServer]);

  const handleToggleSwitch = async () => {
    if (
      isPendingChangePushNotification ||
      isPendingPushNotificationData ||
      isHandlingPermissionRef.current
    )
      return;

    isHandlingPermissionRef.current = true;
    setCanRequestNotificationServer(false);

    try {
      const hasPermission = await requestNotificationPermission();

      if (!hasPermission) {
        showNotificationPermissionSettingsAlert();
        return;
      }

      if (isPushNotificationEnabled) {
        setCanRequestNotificationServer(true);
        changePushNotification({ enable: false });
        return;
      }

      const isTokenRegistered = await tryRegisterCurrentDeviceNotificationToken(
        registerNotificationTokenAsync,
      );
      setCanRequestNotificationServer(isTokenRegistered);

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
    } finally {
      isHandlingPermissionRef.current = false;

      if (shouldPrepareNotificationAgainRef.current) {
        void prepareNotificationServer();
      }
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
