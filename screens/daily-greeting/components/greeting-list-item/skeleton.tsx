import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { SkeletonBox, SkeletonList, SkeletonText } from "@shared/ui";

/** 아이템 하나가 약 84px(프로필 24 + gap 8 + 본문 20 + paddingBottom 32)이라 화면을 채우려면 넉넉히 둔다. */
const DEFAULT_COUNT = 7;
/** GreetingItem의 프로필 이미지 크기 */
const PROFILE_IMAGE_SIZE = 24;
/** 날짜 칩: paddingVertical 8 * 2 + lineHeight 24 */
const DATE_CHIP_HEIGHT = 40;

interface GreetingListItemSkeletonProps {
  count?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

/**
 * GreetingListItem은 날짜 칩(하루의 첫 글에만)과 GreetingItem으로 이루어진다.
 * GreetingItem은 말풍선이 아니라 프로필 24px + 닉네임/날짜 2줄 + 더보기 아이콘,
 * 그 아래 본문이 오는 게시물 형태다.
 */
export default function GreetingListItemSkeleton({
  count = DEFAULT_COUNT,
  containerStyle,
}: GreetingListItemSkeletonProps) {
  return (
    <View style={[styles.wrapper, containerStyle]}>
      <View style={styles.dateWrapper}>
        <SkeletonBox width={96} height={DATE_CHIP_HEIGHT} borderRadius={16} />
      </View>
      <SkeletonList
        count={count}
        renderItem={(index) => (
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.profile}>
                <SkeletonBox
                  width={PROFILE_IMAGE_SIZE}
                  height={PROFILE_IMAGE_SIZE}
                  borderRadius={PROFILE_IMAGE_SIZE / 2}
                />
                <View style={styles.nicknameDateWrapper}>
                  <SkeletonText width={64} size="xs" />
                  <SkeletonText width={40} size="2xs" />
                </View>
              </View>
              <SkeletonBox width={16} height={16} />
            </View>
            <SkeletonText width={index % 2 === 0 ? "80%" : "55%"} size="sm" />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 20,
    gap: 20,
  },
  dateWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
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
  nicknameDateWrapper: {
    gap: 2,
  },
});
