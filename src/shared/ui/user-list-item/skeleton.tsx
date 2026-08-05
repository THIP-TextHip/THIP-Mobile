import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { SkeletonCircle, SkeletonList, SkeletonText } from "../loading";

const DEFAULT_COUNT = 6;

interface UserListItemSkeletonProps {
  count?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function UserListItemSkeleton({
  count = DEFAULT_COUNT,
  containerStyle,
}: UserListItemSkeletonProps) {
  return (
    <SkeletonList
      count={count}
      containerStyle={containerStyle}
      renderItem={() => (
        <View style={styles.container}>
          <View style={styles.profile}>
            <SkeletonCircle size={36} />
            <View style={styles.profileText}>
              <SkeletonText width={80} size="sm" />
              <SkeletonText width={56} size="xs" />
            </View>
          </View>
          <SkeletonText width={104} size="2xs" />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  profileText: {
    gap: 4,
  },
});
