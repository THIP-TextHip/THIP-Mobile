import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { SkeletonBox, SkeletonList, SkeletonText } from "@shared/ui";
import { colors } from "@theme/token";

const DEFAULT_COUNT = 6;
/** AlarmItem의 알림 타입 칩과 동일한 높이 */
const TYPE_CHIP_HEIGHT = 24;

interface AlarmItemSkeletonProps {
  count?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function AlarmItemSkeleton({
  count = DEFAULT_COUNT,
  containerStyle,
}: AlarmItemSkeletonProps) {
  return (
    <SkeletonList
      count={count}
      containerStyle={[styles.list, containerStyle]}
      renderItem={() => (
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <SkeletonBox
                width={56}
                height={TYPE_CHIP_HEIGHT}
                borderRadius={40}
              />
              <SkeletonText width={96} size="sm" />
            </View>
            <SkeletonText width={40} size="2xs" />
          </View>
          <SkeletonText width="85%" size="xs" />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 20,
  },
  container: {
    padding: 16,
    gap: 12,
    borderRadius: 12,
    backgroundColor: colors.darkgrey.dark,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
