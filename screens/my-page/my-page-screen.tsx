import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

import { ProfileSection, SettingsListItem } from "./components";
import { SETTINGS_MY_ACTIVITY, SETTINGS_OTHER } from "./constants";

export default function MyPageScreen() {
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <ProfileSection />
      <View style={styles.section}>
        <AppText weight="semibold" size="lg" color={colors.white}>
          내 활동
        </AppText>
        <SettingsListItem item={SETTINGS_MY_ACTIVITY} />
      </View>
      <View style={styles.section}>
        <AppText weight="semibold" size="lg" color={colors.white}>
          기타
        </AppText>
        <View style={styles.list}>
          {SETTINGS_OTHER.map((item) => (
            <SettingsListItem key={item.id} item={item} />
          ))}
        </View>
      </View>
      <View style={styles.account}>
        <Pressable>
          <AppText weight="regular" size="sm" color={colors.grey[200]}>
            로그아웃
          </AppText>
        </Pressable>
        <Pressable>
          <AppText weight="regular" size="sm" color={colors.grey[300]}>
            회원탈퇴
          </AppText>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 20,
    paddingHorizontal: 20,
    gap: 40,
  },
  section: {
    gap: 12,
  },
  list: {
    gap: 16,
  },
  account: {
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
    // TODO: 너무 밑에 있다고 느껴지면 줄이기
    // paddingTop: 144,
    paddingTop: 100,
    paddingBottom: 20,
  },
});
