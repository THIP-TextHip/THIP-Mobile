import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

import { IcMore } from "@images/icons";
import { AppText, CustomBottomSheet } from "@shared/ui";
import { colors } from "@theme/token";

import { DailyGreetingCommentType } from "../../types";

interface GreetingItemProps {
  isLatest: boolean;
  greetingItem: DailyGreetingCommentType;
}

export default function GreetingItem({
  isLatest,
  greetingItem,
}: GreetingItemProps) {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const handleOpenBottomSheet = () => {
    setIsBottomSheetVisible(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetVisible(false);
  };

  const handleToUserProfile = () => {
    router.push({
      pathname: "/user-profile/[userId]",
      params: { userId: String(greetingItem.creatorId) },
    });
  };

  const handlePressBottomSheetButton = () => {
    if (greetingItem.isWriter) {
      Toast.show({
        type: "default",
        text1: "성공적으로 삭제했어요.",
      });
    } else {
      Toast.show({
        type: "default",
        text1: "성공적으로 신고했어요.",
      });
    }
    setIsBottomSheetVisible(false);
  };

  return (
    <>
      <View style={[styles.container, isLatest && { paddingBottom: 0 }]}>
        <View style={styles.header}>
          <Pressable style={styles.profile} onPress={handleToUserProfile}>
            <Image
              source={{ uri: greetingItem.creatorProfileImageUrl }}
              style={styles.image}
            />
            <View style={styles.nicknameDateWrapper}>
              <AppText weight="semibold" size="xs" color={colors.white}>
                {greetingItem.creatorNickname}
              </AppText>
              <AppText weight="regular" size="2xs" color={colors.grey[200]}>
                {greetingItem.postDate}
              </AppText>
            </View>
          </Pressable>
          <Pressable onPress={handleOpenBottomSheet} hitSlop={5}>
            <IcMore />
          </Pressable>
        </View>
        <AppText
          weight="regular"
          size="sm"
          color={colors.grey[100]}
          lineHeight={20}
        >
          {greetingItem.todayComment}
        </AppText>
      </View>
      <CustomBottomSheet
        isVisible={isBottomSheetVisible}
        handleClose={handleCloseBottomSheet}
      >
        <Pressable
          style={styles.bottomSheetButton}
          onPress={handlePressBottomSheetButton}
        >
          <AppText weight="medium" size="base" color={colors.red}>
            {greetingItem.isWriter ? "삭제하기" : "신고하기"}
          </AppText>
        </Pressable>
      </CustomBottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profile: {
    flexDirection: "row",
    gap: 4,
  },
  image: {
    width: 24,
    height: 24,
    borderRadius: 24,
    borderWidth: 0.5,
    borderColor: colors.grey[300],
  },
  nicknameDateWrapper: {
    gap: 2,
  },
  bottomSheetButton: {
    paddingHorizontal: 12,
    height: 50,
    justifyContent: "center",
  },
});
