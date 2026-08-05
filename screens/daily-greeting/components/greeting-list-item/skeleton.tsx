import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { SkeletonBox, SkeletonList } from "@shared/ui";

const DEFAULT_COUNT = 6;
/** 날짜 칩: paddingVertical 8 * 2 + lineHeight 24 */
const DATE_CHIP_HEIGHT = 40;

interface GreetingListItemSkeletonProps {
  count?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function GreetingListItemSkeleton({
  count = DEFAULT_COUNT,
  containerStyle,
}: GreetingListItemSkeletonProps) {
  return (
    <View style={[styles.wrapper, containerStyle]}>
      <View style={styles.dateWrapper}>
        <SkeletonBox
          width={96}
          height={DATE_CHIP_HEIGHT}
          borderRadius={16}
        />
      </View>
      <SkeletonList
        count={count}
        containerStyle={styles.list}
        renderItem={(index) => (
          <View
            style={index % 2 === 0 ? styles.itemLeft : styles.itemRight}
          >
            <SkeletonBox
              width={index % 3 === 0 ? "55%" : "70%"}
              height={44}
              borderRadius={12}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 20,
  },
  dateWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    gap: 20,
  },
  itemLeft: {
    alignItems: "flex-start",
  },
  itemRight: {
    alignItems: "flex-end",
  },
});
