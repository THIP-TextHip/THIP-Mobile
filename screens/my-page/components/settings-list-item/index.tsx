import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { Pressable, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

import { IcRightRight } from "@images/icons";
import { MYPAGE_URL } from "@shared/constants";
import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

import { SETTINGS_ID, type SettingsItem } from "../../constants";

interface SettingsListItemProps {
  item: SettingsItem;
}

export default function SettingsListItem({ item }: SettingsListItemProps) {
  const handlePress = async () => {
    switch (item.id) {
      case SETTINGS_ID.save:
        router.push("/saved");
        break;
      case SETTINGS_ID.alarm:
        router.push("/alarm-settings");
        break;
      case SETTINGS_ID.support:
        try {
          await WebBrowser.openBrowserAsync(MYPAGE_URL.CUSTOMER_CENTER_URL);
        } catch (e) {
          Toast.show({
            type: "error",
            text1: `링크 열기 실패: ${e}`,
          });
        }
        break;
      case SETTINGS_ID.notice:
        try {
          await WebBrowser.openBrowserAsync(MYPAGE_URL.NOTICE_URL);
        } catch (e) {
          Toast.show({
            type: "error",
            text1: `링크 열기 실패: ${e}`,
          });
        }
        break;
      case SETTINGS_ID.policy:
        try {
          await WebBrowser.openBrowserAsync(MYPAGE_URL.POLICY_URL);
        } catch (e) {
          Toast.show({
            type: "error",
            text1: `링크 열기 실패: ${e}`,
          });
        }
        break;
      case SETTINGS_ID.guide:
        try {
          await WebBrowser.openBrowserAsync(MYPAGE_URL.GUIDE_URL);
        } catch (e) {
          Toast.show({
            type: "error",
            text1: `링크 열기 실패: ${e}`,
          });
        }
        break;
      case SETTINGS_ID.version:
        try {
          await WebBrowser.openBrowserAsync(MYPAGE_URL.VERSION_URL);
        } catch (e) {
          Toast.show({
            type: "error",
            text1: `링크 열기 실패: ${e}`,
          });
        }
        break;
    }
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <View style={styles.content}>
        <item.icon />
        <AppText weight="semibold" size="base" color={colors.white}>
          {item.label}
        </AppText>
      </View>
      <IcRightRight />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: colors.darkgrey.dark,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
