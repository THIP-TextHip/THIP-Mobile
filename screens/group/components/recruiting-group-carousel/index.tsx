import { useWindowDimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";

import { GRID_WIDTH, RECRUITING_GROUP_CAROUSEL_TYPE } from "../../constants";
import RecruitingGroupCarouselItem from "./recruiting-roup-carousel-item";

export default function RecruitingGroupCarousel() {
  const { width: screenWidth } = useWindowDimensions();
  const cardWidth = screenWidth - 60;
  const isGrid = cardWidth > GRID_WIDTH;

  return (
    <Carousel
      loop
      width={screenWidth}
      height={isGrid ? 430 : 730}
      mode="parallax"
      modeConfig={{
        parallaxScrollingScale: 1,
        parallaxScrollingOffset: 55,
      }}
      onConfigurePanGesture={(gesture) => {
        gesture
          .activeOffsetX([-10, 10]) // 가로로 어느 정도 움직였을 때만 캐러셀 동작
          .failOffsetY([-5, 5]); // 세로로 조금이라도 움직이면 캐러셀 제스처 실패 처리
      }}
      data={RECRUITING_GROUP_CAROUSEL_TYPE}
      renderItem={({ item, animationValue }) => (
        <RecruitingGroupCarouselItem
          width={cardWidth}
          carouselType={item}
          animationValue={animationValue}
        />
      )}
    />
  );
}
