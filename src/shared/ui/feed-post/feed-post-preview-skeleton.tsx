import { Fragment } from "react";
import { StyleSheet, View } from "react-native";

import { colors } from "@theme/token";

import { SkeletonBox, SkeletonCircle, SkeletonText } from "../loading";
import { SkeletonProvider } from "../loading/skeleton/skeleton-provider";

/**
 * FeedPostPreview는 이미지 유무·본문 길이에 따라 높이가 크게 달라져서
 * 정확한 예고가 불가능하다. 대표 형태 하나로 고정하고 화면을 꽉 채우지 않아,
 * 실제 데이터가 도착했을 때 레이아웃 점프가 덜 눈에 띄게 한다.
 */
const DEFAULT_COUNT = 3;
/** BookInfoBar: paddingVertical 10 * 2 + lineHeight 24 */
const BOOK_INFO_BAR_HEIGHT = 44;

interface FeedPostPreviewSkeletonProps {
  count?: number;
  /**
   * 작성자 영역 표시 여부. 내 피드·유저 프로필처럼 한 사람의 글만 모인 목록은
   * 실제 FeedPostPreview도 헤더를 그리지 않으므로 false로 넘긴다.
   */
  withHeader?: boolean;
}

export default function FeedPostPreviewSkeleton({
  count = DEFAULT_COUNT,
  withHeader = true,
}: FeedPostPreviewSkeletonProps) {
  return (
    <SkeletonProvider>
      <View>
        {Array.from({ length: count }, (_, index) => (
          <Fragment key={index}>
            {index > 0 && <View style={styles.separator} />}
            <View style={styles.container}>
              {withHeader && (
                <View style={styles.header}>
                  <View style={styles.profile}>
                    <SkeletonCircle size={36} />
                    <View style={styles.creatorInfo}>
                      <SkeletonText width={72} size="sm" />
                      <SkeletonText width={48} size="xs" />
                    </View>
                  </View>
                  <SkeletonText width={56} size="2xs" />
                </View>
              )}

              <SkeletonBox height={BOOK_INFO_BAR_HEIGHT} borderRadius={12} />

              <View style={styles.body}>
                <SkeletonText size="sm" />
                <SkeletonText size="sm" />
                <SkeletonText width="60%" size="sm" />
              </View>

              <View style={styles.footer}>
                <SkeletonText width={96} size="xs" />
                <SkeletonText width={40} size="xs" />
              </View>
            </View>
          </Fragment>
        ))}
      </View>
    </SkeletonProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    gap: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profile: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  creatorInfo: {
    gap: 4,
  },
  body: {
    gap: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  separator: {
    marginVertical: 40,
    height: 6,
    backgroundColor: colors.darkgrey.divider,
  },
});
