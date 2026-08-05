import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { SkeletonBox, SkeletonList, SkeletonText } from "@shared/ui";

const DEFAULT_COUNT = 5;

interface SearchedBookItemSkeletonProps {
  count?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function SearchedBookItemSkeleton({
  count = DEFAULT_COUNT,
  containerStyle,
}: SearchedBookItemSkeletonProps) {
  return (
    <SkeletonList
      count={count}
      containerStyle={[styles.list, containerStyle]}
      renderItem={() => (
        <View style={styles.container}>
          <SkeletonBox width={80} height={107} />
          <View style={styles.textWrapper}>
            <SkeletonText width="80%" size="base" />
            <SkeletonText width="55%" size="sm" />
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 20,
  },
  container: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  textWrapper: {
    flex: 1,
    minWidth: 0,
    gap: 8,
  },
});
