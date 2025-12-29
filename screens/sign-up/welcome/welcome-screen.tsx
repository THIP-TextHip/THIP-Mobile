import { router } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

import { IcArrowLeft } from "@images/icons";
import { GENRES } from "@screens/sign-up/genre/constants";
import { AppText, CustomButton, CustomHeader } from "@shared/ui";
import { colors } from "@theme/token";

// TODO: 서버에서 사용자 닉네임, 장르 가져오기
const nickname = "Username01";
const genre = "철학자";
const profileColor = colors.character.orange;

export default function WelcomeScreen() {
  const GenreImage = GENRES.find((item) => item.subTitle === genre)?.image;

  const handleGoBack = () => {
    router.back();
  };

  const handlePressStart = () => {
    router.replace("/feed");
  };

  return (
    <View style={styles.page}>
      <CustomHeader left={<IcArrowLeft onPress={handleGoBack} />} />
      <View style={styles.container}>
        <View style={styles.textWrapper}>
          <AppText weight="bold" size="xl" color={colors.white}>
            안녕하세요, {nickname}님
          </AppText>
          <AppText weight="medium" size="sm" color={colors.white}>
            이제 Thip에서 활동할 준비를 모두 마쳤어요!
          </AppText>
        </View>
        <View style={styles.content}>
          <View style={styles.profileContainer}>
            {/* TODO: 이미지 관련 스타일링 디테일 확인 */}
            <View style={styles.image}>
              {GenreImage && <GenreImage width={43} height={43} />}
            </View>
            <View style={styles.profileWrapper}>
              <AppText weight="semibold" size="lg" color={colors.white}>
                {nickname}
              </AppText>
              <AppText weight="regular" size="sm" color={profileColor}>
                {genre}
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
  image: {
    width: 54,
    height: 54,
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 0.5,
    borderColor: colors.grey[200],
    overflow: "hidden",
  },
  profileWrapper: {
    alignItems: "center",
    gap: 4,
  },
});
