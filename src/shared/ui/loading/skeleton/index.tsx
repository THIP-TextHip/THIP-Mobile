import {
  StyleSheet,
  type DimensionValue,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import { colors, typography } from "@theme/token";

import { useSkeletonPulse } from "./skeleton-provider";

interface SkeletonBoxProps {
  width?: DimensionValue;
  height?: DimensionValue;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
}

export function SkeletonBox({
  width = "100%",
  height = 16,
  borderRadius = 4,
  style,
}: SkeletonBoxProps) {
  const pulse = useSkeletonPulse();

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: pulse.value,
  }));

  return (
    <Animated.View
      style={[
        styles.base,
        { width, height, borderRadius },
        style,
        animatedStyle,
      ]}
    />
  );
}

interface SkeletonCircleProps {
  size?: number;
  style?: StyleProp<ViewStyle>;
}

export function SkeletonCircle({ size = 36, style }: SkeletonCircleProps) {
  return (
    <SkeletonBox
      width={size}
      height={size}
      borderRadius={size / 2}
      style={style}
    />
  );
}

interface SkeletonTextProps {
  width?: DimensionValue;
  /** 실제 텍스트와 높이를 맞추기 위해 typography 토큰을 그대로 쓴다. */
  size?: keyof typeof typography.fontSize;
  style?: StyleProp<ViewStyle>;
}

export function SkeletonText({
  width = "100%",
  size = "sm",
  style,
}: SkeletonTextProps) {
  return (
    <SkeletonBox
      width={width}
      height={typography.fontSize[size]}
      style={style}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.darkgrey.main,
  },
});
