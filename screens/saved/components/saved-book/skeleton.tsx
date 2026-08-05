import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { SkeletonBox, SkeletonList, SkeletonText } from "@shared/ui";
import { colors } from "@theme/token";

const DEFAULT_COUNT = 5;

interface SavedBookItemSkeletonProps {
  count?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function SavedBookItemSkeleton({
  count = DEFAULT_COUNT,
  containerStyle,
}: SavedBookItemSkeletonProps) {
  return (
    <SkeletonList
      count={count}
      containerStyle={[styles.list, containerStyle]}
      separator={<View style={styles.separator} />}
      renderItem={() => (
        <View style={styles.item}>
          <SkeletonBox width={80} height={107} />
          <View style={styles.textWrapper}>
            <SkeletonText width="80%" size="base" />
            <SkeletonText width="55%" size="sm" />
          </View>
          <SkeletonBox width={24} height={24} borderRadius={4} />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingTop: 32,
    paddingHorizontal: 20,
    gap: 20,
  },
  separator: {
    marginTop: 20,
    height: 1,
    backgroundColor: colors.darkgrey.dark,
  },
  item: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
  },
  textWrapper: {
    flex: 1,
    minWidth: 0,
    gap: 8,
  },
});
