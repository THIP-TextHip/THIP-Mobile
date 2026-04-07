import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

import { DUMMY_RECRUITING_GROUP_CAROUSEL, GRID_WIDTH } from "../../constants";
import {
  RecruitingGroupCarouselType,
  RecruitingGroupCategoryType,
} from "../../types";
import RecruitingGroupCard from "./recruiting-group-card";
import RecruitingGroupCarouselHeader from "./recruiting-group-carousel-header";

interface RecruitingGroupCarouselItemProps {
  width: number;
  carouselType: RecruitingGroupCarouselType;
  animationValue?: SharedValue<number>;
}

export default function RecruitingGroupCarouselItem({
  width,
  carouselType,
  animationValue,
}: RecruitingGroupCarouselItemProps) {
  // 서버에서 카테고리에 따라 다른 list 줌.
  const [selectedCategory, setSelectedCategory] =
    useState<RecruitingGroupCategoryType>("문학");
  // TODO: 서버에서 가져오기. 여기에 selectedCategory도 추가로 필터링 해야함
  const roomList = DUMMY_RECRUITING_GROUP_CAROUSEL[carouselType];
  const isGrid = width > GRID_WIDTH;
  const gridCardWidth = (width - 40) / 2 - 10;

  const cardHeight = isGrid ? 430 : 730;

  const label =
    carouselType === "deadlineRoomList"
      ? "마감 임박한"
      : carouselType === "popularRoomList"
        ? "인기 있는"
        : "최근 생성된";

  const fallbackAnimationValue = useSharedValue(0);
  const currentAnimationValue = animationValue ?? fallbackAnimationValue;

  const cardAnimatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      currentAnimationValue.value,
      [-1, 0, 1],
      [cardHeight, cardHeight, cardHeight],
      Extrapolation.CLAMP,
    );

    const scale = interpolate(
      currentAnimationValue.value,
      [-1, 0, 1],
      [0.95, 1, 0.95],
      Extrapolation.CLAMP,
    );

    return {
      height,
      transform: [{ scale }],
    };
  });

  const handleChangeCategory = (category: RecruitingGroupCategoryType) => {
    setSelectedCategory(category);
  };

  return (
    <Animated.View style={[styles.wrapper, { width }, cardAnimatedStyle]}>
      <LinearGradient
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        locations={[0, 1]}
        colors={[colors.darkgrey.card, colors.black.main]}
        style={[styles.container, { width: width }, { height: cardHeight }]}
      >
        <RecruitingGroupCarouselHeader
          label={label}
          selectedCategory={selectedCategory}
          handleChangeCategory={handleChangeCategory}
        />
        {roomList.length === 0 ? (
          <View style={styles.empty}>
            <AppText
              weight="semibold"
              size="lg"
              color={colors.white}
              lineHeight={24}
            >
              모임방이 아직 없어요.
            </AppText>
            <AppText weight="regular" size="sm" color={colors.grey[100]}>
              해당 장르의 모임방이 생기면 보여줄게요!
            </AppText>
          </View>
        ) : (
          <View
            style={[
              styles.roomListWrapper,
              isGrid && styles.roomListWrapperGrid,
            ]}
          >
            {roomList.map((room) => (
              <View
                key={room.roomId}
                style={isGrid ? { width: gridCardWidth } : undefined}
              >
                <RecruitingGroupCard roomInfo={room} />
              </View>
            ))}
          </View>
        )}
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: "center",
  },
  container: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingVertical: 20,
  },
  roomListWrapper: {
    paddingHorizontal: 20,
    gap: 20,
  },
  roomListWrapperGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 20,
  },
  empty: {
    marginTop: 40,
    gap: 8,
    alignItems: "center",
  },
});
