import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { colors } from "@theme/token";

import { SkeletonBox, SkeletonList, SkeletonText } from "../loading";

const DEFAULT_COUNT = 4;

interface MyGroupCardSkeletonProps {
  count?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function MyGroupCardSkeleton({
  count = DEFAULT_COUNT,
  containerStyle,
}: MyGroupCardSkeletonProps) {
  return (
    <SkeletonList
      count={count}
      containerStyle={[styles.list, containerStyle]}
      renderItem={() => (
        <View style={styles.container}>
          <SkeletonBox width={80} height={107} />
          <View style={styles.content}>
            <SkeletonText width="70%" size="lg" />
            <View style={styles.info}>
              <SkeletonText width={64} size="sm" />
              <SkeletonText width={96} size="xs" />
            </View>
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
    alignItems: "center",
    gap: 12,
    padding: 12,
    backgroundColor: colors.darkgrey.main,
    borderRadius: 12,
  },
  content: {
    flex: 1,
    gap: 8,
  },
  info: {
    gap: 4,
  },
});
