import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { SkeletonCircle, SkeletonList, SkeletonText } from "@shared/ui";

const DEFAULT_COUNT = 4;

interface RecordBookPostItemSkeletonProps {
  count?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function RecordBookPostItemSkeleton({
  count = DEFAULT_COUNT,
  containerStyle,
}: RecordBookPostItemSkeletonProps) {
  return (
    <SkeletonList
      count={count}
      containerStyle={containerStyle}
      renderItem={() => (
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.profile}>
              <SkeletonCircle size={36} />
              <View style={styles.profileText}>
                <SkeletonText width={72} size="sm" />
                <SkeletonText width={40} size="xs" />
              </View>
            </View>
            <SkeletonText width={40} size="2xs" />
          </View>
          <SkeletonText size="sm" />
          <SkeletonText width="70%" size="sm" />
          <View style={styles.actions}>
            <SkeletonText width={72} size="xs" />
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 16,
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
  profileText: {
    gap: 4,
  },
  actions: {
    marginTop: 4,
  },
});
