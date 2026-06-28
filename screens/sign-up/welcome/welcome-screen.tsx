import { router } from "expo-router";
import { useCallback } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { useGetMyInfoQuery } from "@apis/user";
import { IcArrowLeft } from "@images/icons";
import { AppText, CustomButton, CustomHeader } from "@shared/ui";
import { colors } from "@theme/token";

export default function WelcomeScreen() {
  // TODO: 추후 로딩 및 예외처리 isPendingUserInfo, isErrorUserInfo, userInfoError
  const { myInfo } = useGetMyInfoQuery();

  const handleGoBack = useCallback(() => {
    router.back();
  }, []);

  const handlePressStart = () => {
    router.replace("/feed");
  };

  return (
    <View style={styles.page}>
      <CustomHeader
        left={
          <Pressable onPress={handleGoBack}>
            <IcArrowLeft />
          </Pressable>
        }
      />
      <View style={styles.container}>
        <View style={styles.textWrapper}>
          <AppText weight="bold" size="xl" color={colors.white}>
            안녕하세요, {myInfo?.nickname}님
          </AppText>
          <AppText weight="medium" size="sm" color={colors.white}>
            이제 Thip에서 활동할 준비를 모두 마쳤어요!
          </AppText>
        </View>
        <View style={styles.content}>
          <View style={styles.profileContainer}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{ uri: myInfo?.profileImageUrl }}
              />
            </View>
            <View style={styles.profileWrapper}>
              <AppText weight="semibold" size="lg" color={colors.white}>
                {myInfo?.nickname}
              </AppText>
              <AppText weight="regular" size="sm" color={myInfo?.aliasColor}>
                {myInfo?.aliasName}
              </AppText>
            </View>
          </View>
          <CustomButton handlePress={handlePressStart}>
            <AppText weight="semibold" size="base" color={colors.white}>
              지금 바로 Thip 시작하기
            </AppText>
          </CustomButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    marginTop: 40,
    paddingHorizontal: 20,
    gap: 100,
  },
  textWrapper: {
    gap: 8,
  },
  content: {
    alignItems: "center",
    gap: 76,
  },
  profileContainer: {
    gap: 8,
    alignItems: "center",
  },
  imageContainer: {
    width: 54,
    height: 54,
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 0.5,
    borderColor: colors.grey[200],
    overflow: "hidden",
  },
  image: {
    width: 54,
    height: 54,
  },
  profileWrapper: {
    alignItems: "center",
    gap: 4,
  },
});
