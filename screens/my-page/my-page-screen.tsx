import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import { useGetMyInfoQuery } from "@apis/user";
import { AppText, UserProfileBar } from "@shared/ui";
import { colors } from "@theme/token";

import { LogoutModal, SettingsListItem } from "./components";
import { SETTINGS_MY_ACTIVITY, SETTINGS_OTHER } from "./constants";

export default function MyPageScreen() {
  const { myInfo, isPendingMyInfo } = useGetMyInfoQuery();
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);

  const handleToEdit = () => {
    router.push("/edit-profile");
  };

  const handleOpenLogoutModal = () => {
    setLogoutModalVisible(true);
  };
  const handleCloseLogoutModal = () => {
    setLogoutModalVisible(false);
  };

  const handleToDeleteAccount = () => {
    router.push("/delete-account");
  };

  return (
    <ScrollView contentContainerStyle={styles.page}>
      {isPendingMyInfo ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={colors.white} />
        </View>
      ) : (
        <UserProfileBar
          type="edit-profile"
          userProfile={{
            nickname: myInfo?.nickname ?? "",
            genre: myInfo?.aliasName ?? "",
            profileColor: myInfo?.aliasColor ?? colors.grey[300],
          }}
          handleToEdit={handleToEdit}
        />
      )}

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
        {/* TODO: 추후 api로 수정 */}
        <Pressable onPress={handleOpenLogoutModal} hitSlop={5}>
          <AppText
            weight="regular"
            size="sm"
            color={colors.grey[200]}
            lineHeight={20}
          >
            로그아웃
          </AppText>
        </Pressable>
        <Pressable onPress={handleToDeleteAccount} hitSlop={5}>
          <AppText
            weight="regular"
            size="sm"
            color={colors.grey[300]}
            lineHeight={20}
          >
            회원탈퇴
          </AppText>
        </Pressable>
      </View>
      <LogoutModal
        isVisible={isLogoutModalVisible}
        handleCloseModal={handleCloseLogoutModal}
      />
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
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.black.main,
  },
});
