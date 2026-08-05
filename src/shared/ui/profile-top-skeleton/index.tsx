import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { colors } from "@theme/token";

import { SkeletonProvider, SkeletonText } from "../loading";
import UserProfileBarSkeleton from "../user-profile-bar/skeleton";

/**
 * 내 피드 탭(MyFeedTopContents)과 유저 프로필(UserProfileTopContents)의
 * 상단 블록 스켈레톤. 두 화면이 같은 구성(UserProfileBar + ThipPreview +
 * ListTotalCountHeader)과 같은 여백을 쓰고 있어 하나로 공유한다.
 * 실제 렌더링과 높이를 맞추기 위해 각 요소의 고정 높이를 그대로 따른다.
 */
const THIP_PREVIEW_HEIGHT = 24;

interface ProfileTopSkeletonProps {
  containerStyle?: StyleProp<ViewStyle>;
}

export default function ProfileTopSkeleton({
  containerStyle,
}: ProfileTopSkeletonProps) {
  return (
    <SkeletonProvider>
      <View style={[styles.topContents, containerStyle]}>
        <View style={styles.profile}>
          <UserProfileBarSkeleton />
          <View style={styles.thipPreview}>
            <SkeletonText width={148} size="sm" />
          </View>
        </View>
        <View style={styles.entireCount}>
          <SkeletonText width={56} size="sm" />
        </View>
      </View>
    </SkeletonProvider>
  );
}

const styles = StyleSheet.create({
  topContents: {
    marginTop: 32,
    marginBottom: 20,
  },
  profile: {
    gap: 16,
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  thipPreview: {
    height: THIP_PREVIEW_HEIGHT,
    justifyContent: "center",
  },
  entireCount: {
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkgrey.dark,
    marginHorizontal: 20,
  },
});
