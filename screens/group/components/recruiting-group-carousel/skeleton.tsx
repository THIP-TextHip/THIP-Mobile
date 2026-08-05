import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { SkeletonBox, SkeletonList, SkeletonText } from "@shared/ui";
import { colors } from "@theme/token";

const DEFAULT_COUNT = 3;

interface RecruitingGroupCardSkeletonProps {
  count?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function RecruitingGroupCardSkeleton({
  count = DEFAULT_COUNT,
  containerStyle,
}: RecruitingGroupCardSkeletonProps) {
  return (
    <SkeletonList
      count={count}
      containerStyle={[styles.list, containerStyle]}
      renderItem={() => (
        <View style={styles.roomContainer}>
          <SkeletonBox width={80} height={107} />
          <View style={styles.roomInfo}>
            <SkeletonText width="80%" size="base" />
            <SkeletonText width={64} size="sm" style={styles.memberCount} />
            <SkeletonText width={96} size="xs" />
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20,
    gap: 20,
  },
  roomContainer: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.grey[300],
    backgroundColor: colors.darkgrey.main,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  roomInfo: {
    flex: 1,
  },
  memberCount: {
    marginTop: 8,
    marginBottom: 4,
  },
});
