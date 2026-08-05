import { StyleSheet, useWindowDimensions, View } from "react-native";

import { SkeletonBox, SkeletonProvider, SkeletonText } from "@shared/ui";
import { colors } from "@theme/token";

/** 캐러셀 높이와 동일하게 맞춰 로딩 전후로 레이아웃이 움직이지 않게 한다. */
const CARD_HEIGHT = 175;
const CARD_HORIZONTAL_MARGIN = 60;

export default function MyGroupCarouselSkeleton() {
  const { width: screenWidth } = useWindowDimensions();
  const cardWidth = screenWidth - CARD_HORIZONTAL_MARGIN;

  return (
    <SkeletonProvider>
      <View style={[styles.card, { width: cardWidth, height: CARD_HEIGHT }]}>
        <View style={styles.contentRow}>
          <SkeletonBox width={80} height={107} />
          <View style={styles.content}>
            <View style={styles.groupInfo}>
              <SkeletonText width="75%" size="base" />
              <SkeletonText width={64} size="sm" />
            </View>
            <View style={styles.progressWrapper}>
              <SkeletonText width={96} size="sm" />
              <SkeletonBox height={7} borderRadius={12} />
            </View>
          </View>
        </View>
      </View>
    </SkeletonProvider>
  );
}

const styles = StyleSheet.create({
  card: {
    alignSelf: "center",
    borderRadius: 12,
    overflow: "hidden",
    paddingVertical: 34,
    paddingHorizontal: 12,
    backgroundColor: colors.darkgrey.card,
  },
  contentRow: {
    flex: 1,
    flexDirection: "row",
    gap: 12,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  groupInfo: {
    gap: 4,
  },
  progressWrapper: {
    gap: 12,
  },
});
