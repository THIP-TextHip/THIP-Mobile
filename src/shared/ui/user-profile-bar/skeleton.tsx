import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import {
  SkeletonBox,
  SkeletonCircle,
  SkeletonProvider,
  SkeletonText,
} from "../loading";

interface UserProfileBarSkeletonProps {
  containerStyle?: StyleProp<ViewStyle>;
}

export default function UserProfileBarSkeleton({
  containerStyle,
}: UserProfileBarSkeletonProps) {
  return (
    <SkeletonProvider>
      <View style={[styles.container, containerStyle]}>
        <View style={styles.profileWrapper}>
          <SkeletonCircle size={54} />
          <View style={styles.textWrapper}>
            <SkeletonText width={96} size="base" />
            <SkeletonText width={64} size="xs" />
          </View>
        </View>
        <SkeletonBox width={72} height={36} borderRadius={20} />
      </View>
    </SkeletonProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  textWrapper: {
    gap: 4,
  },
});
