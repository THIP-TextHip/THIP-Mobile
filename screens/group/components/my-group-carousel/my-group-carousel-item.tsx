import { LinearGradient } from "expo-linear-gradient";
import { Image, StyleSheet, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  type SharedValue,
} from "react-native-reanimated";

import { IcGroup } from "@images/icons";
import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

import { GroupCarouselItemType } from "../../types";

interface MyGroupCarouselItemProps {
  width: number;
  content: GroupCarouselItemType;
  animationValue?: SharedValue<number>;
}

export default function MyGroupCarouselItem({
  width,
  content,
  animationValue,
}: MyGroupCarouselItemProps) {
  const fallbackAnimationValue = useSharedValue(0);
  const currentAnimationValue = animationValue ?? fallbackAnimationValue;

  const cardAnimatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      currentAnimationValue.value,
      [-1, 0, 1],
      [175, 175, 175],
      Extrapolation.CLAMP,
    );

    const scale = interpolate(
      currentAnimationValue.value,
      [-1, 0, 1],
      [0.8, 1, 0.8],
      Extrapolation.CLAMP,
    );

    return {
      height,
      transform: [{ scale }],
    };
  });

  const contentAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      currentAnimationValue.value,
      [-1, 0, 1],
      [0, 1, 0],
      Extrapolation.CLAMP,
    );

    return {
      opacity,
    };
  });

  const overlayAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      currentAnimationValue.value,
      [-1, 0, 1],
      [1, 0, 1],
      Extrapolation.CLAMP,
    );

    return {
      opacity,
    };
  });

  return (
    <Animated.View style={[styles.cardWrapper, { width }, cardAnimatedStyle]}>
      <LinearGradient
        start={{ x: 0.2, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0.2826, 1]}
        colors={[colors.white, "#989898"]}
        style={styles.carouselItem}
      >
        <Animated.View style={[styles.contentRow, contentAnimatedStyle]}>
          <Image source={{ uri: content.bookImageUrl }} style={styles.image} />

          <View style={styles.content}>
            <View style={styles.groupInfo}>
              <AppText
                weight="semibold"
                size="lg"
                color={colors.black.main}
                lineHeight={24}
                numberOfLines={1}
              >
                {content.roomTitle}
              </AppText>

              <View style={styles.member}>
                <IcGroup width={20} height={20} />
                <AppText
                  weight="semibold"
                  size="sm"
                  color={colors.grey[300]}
                  lineHeight={24}
                >
                  {content.memberCount}명
                </AppText>
              </View>
            </View>

            <View style={styles.myProgressWrapper}>
              <View style={styles.progressLabel}>
                <AppText weight="medium" size="sm" color={colors.grey[300]}>
                  내 진행도
                </AppText>
                <AppText
                  weight="semibold"
                  size="base"
                  color={colors.purple.main}
                  lineHeight={20}
                >
                  {content.userPercentage}
                  <AppText
                    weight="semibold"
                    size="xs"
                    color={colors.purple.main}
                  >
                    %
                  </AppText>
                </AppText>
              </View>

              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.currentProgress,
                    { width: `${content.userPercentage}%` },
                  ]}
                />
              </View>
            </View>
          </View>
        </Animated.View>

        <Animated.View
          pointerEvents="none"
          style={[styles.darkOverlay, overlayAnimatedStyle]}
        />
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    alignSelf: "center",
  },
  carouselItem: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
    paddingVertical: 34,
    paddingHorizontal: 12,
  },
  contentRow: {
    flex: 1,
    flexDirection: "row",
    gap: 12,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.darkgrey.card,
  },
  image: {
    width: 80,
    height: 107,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
  },
  groupInfo: {
    gap: 4,
  },
  member: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  myProgressWrapper: {
    gap: 12,
  },
  progressLabel: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
  },
  progressBar: {
    height: 7,
    borderRadius: 12,
    backgroundColor: colors.grey[300],
    overflow: "hidden",
  },
  currentProgress: {
    position: "absolute",
    left: 0,
    height: 7,
    borderRadius: 12,
    backgroundColor: colors.purple.main,
  },
});
