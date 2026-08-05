import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { SkeletonBox, SkeletonList, SkeletonText } from "@shared/ui";

const DEFAULT_COUNT = 5;

interface SearchedGroupItemSkeletonProps {
  count?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function SearchedGroupItemSkeleton({
  count = DEFAULT_COUNT,
  containerStyle,
}: SearchedGroupItemSkeletonProps) {
  return (
    <SkeletonList
      count={count}
      containerStyle={containerStyle}
      renderItem={() => (
        <View style={styles.container}>
          <SkeletonBox width={60} height={80} />
          <View style={styles.infoWrapper}>
            <SkeletonText width="65%" size="base" />
            <SkeletonText width={72} size="xs" />
            <SkeletonText width={96} size="xs" />
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  infoWrapper: {
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
});
