import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { Pressable, StyleSheet, View } from "react-native";

import { IcRightRight } from "@images/icons";
import { CUSTOMER_CENTER_URL } from "@shared/constants";
import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

import { SETTINGS_ID, type SettingsItem } from "../../constants";

interface SettingsListItemProps {
  item: SettingsItem;
}

export default function SettingsListItem({ item }: SettingsListItemProps) {
  // TODO: 각 아이템에 대한 action 연결
  const handlePress = async () => {
    switch (item.id) {
      case SETTINGS_ID.save:
        console.log("저장 페이지로 이동");
        break;
      case SETTINGS_ID.alarm:
        router.push("/alarm-settings");
        break;
      case SETTINGS_ID.support:
        try {
          await WebBrowser.openBrowserAsync(CUSTOMER_CENTER_URL);
        } catch (e) {
          // TODO: 추후 토스트 메시지로 알려주기
          alert(`링크 열기 실패: ${e}`);
        }
        break;
      case SETTINGS_ID.notice:
        console.log("공지사항 페이지로 이동");
        break;
      case SETTINGS_ID.policy:
        console.log("개인정보처리방침 & 이용약관 페이지로 이동");
        break;
      case SETTINGS_ID.guide:
        router.push({
          pathname: "/sign-up/onboarding",
          params: { from: "my-page" },
        });
        break;
      case SETTINGS_ID.version:
        console.log("버전 관련 액션");
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
