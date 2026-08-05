import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { SkeletonBox, SkeletonList, SkeletonText } from "@shared/ui";
import { colors } from "@theme/token";

const DEFAULT_COUNT = 5;

interface MostSearchedBookItemSkeletonProps {
  count?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function MostSearchedBookItemSkeleton({
  count = DEFAULT_COUNT,
  containerStyle,
}: MostSearchedBookItemSkeletonProps) {
  return (
    <SkeletonList
      count={count}
      containerStyle={containerStyle}
      renderItem={(index) => (
        <View
          style={[
            styles.container,
            index === count - 1 && styles.lastItem,
          ]}
        >
          <SkeletonText width={12} size="sm" style={styles.ranking} />
          <View style={styles.content}>
            <SkeletonBox width={45} height={60} />
            <SkeletonText width={120} size="sm" />
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 2,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.darkgrey.dark,
    gap: 4,
    width: "100%",
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  ranking: {
    width: 16,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
