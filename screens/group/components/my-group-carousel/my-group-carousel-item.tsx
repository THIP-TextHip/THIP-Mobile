import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useCallback, useRef } from "react";
import type { GestureResponderEvent } from "react-native";
import { Image, Pressable, StyleSheet, View } from "react-native";
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

const TAP_MOVE_THRESHOLD = 8;

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
  const pressStartRef = useRef<{ x: number; y: number } | null>(null);
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

  const handlePressIn = useCallback((event: GestureResponderEvent) => {
    pressStartRef.current = {
      x: event.nativeEvent.pageX,
      y: event.nativeEvent.pageY,
    };
  }, []);

  const handleToGroupDetail = useCallback(
    (event: GestureResponderEvent) => {
      const pressStart = pressStartRef.current;
      pressStartRef.current = null;

      if (!pressStart) {
        return;
      }

      const moveX = Math.abs(event.nativeEvent.pageX - pressStart.x);
      const moveY = Math.abs(event.nativeEvent.pageY - pressStart.y);

      if (moveX > TAP_MOVE_THRESHOLD || moveY > TAP_MOVE_THRESHOLD) {
        return;
      }

      router.push({
        pathname: "/group-detail/[roomId]",
        params: { roomId: String(content.roomId) },
      });
    },
    [content.roomId],
  );

  return (
    <Animated.View style={[styles.cardWrapper, { width }, cardAnimatedStyle]}>
      <LinearGradient
        start={{ x: 0.2, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0.2826, 1]}
        colors={[colors.white, "#989898"]}
        style={styles.carouselItem}
      >
        <Animated.View
          style={[styles.contentAnimatedContainer, contentAnimatedStyle]}
        >
          <Pressable
            style={styles.contentRow}
            onPressIn={handlePressIn}
            onPress={handleToGroupDetail}
          >
            <Image
              source={{ uri: content.bookImageUrl }}
              style={styles.image}
            />

            {/* TODO: 이미지 영역까지 포함해서 눌렀을 때 넘어가도록 수정하고 싶음. 현재는 이유모르게 UX적인 오류가 뜸 */}
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
          </Pressable>
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
  contentAnimatedContainer: {
    flex: 1,
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
