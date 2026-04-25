import { router } from "expo-router";
import { Pressable, StyleSheet, useWindowDimensions, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

import { IcRightRight } from "@images/icons";
import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

// TODO: 서버에서 온 데이터로 수정
import { DUMMY_MY_GROUP_CAROUSEL } from "../../constants";
import MyGroupCarouselEmpty from "./my-group-carousel-empty";
import MyGroupCarouselItem from "./my-group-carousel-item";

export default function MyGroupCarousel() {
  const { width: screenWidth } = useWindowDimensions();
  const cardWidth = screenWidth - 60;

  const handleToMyGroup = () => {
    router.push("/my-group-list");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText weight="bold" size="xl" color={colors.white} lineHeight={24}>
          내 모임방
        </AppText>
        <Pressable onPress={handleToMyGroup} hitSlop={10}>
          <IcRightRight />
        </Pressable>
      </View>
      {DUMMY_MY_GROUP_CAROUSEL.length === 0 ? (
        <MyGroupCarouselEmpty />
      ) : DUMMY_MY_GROUP_CAROUSEL.length === 1 ? (
        <MyGroupCarouselItem
          width={cardWidth}
          content={DUMMY_MY_GROUP_CAROUSEL[0]}
        />
      ) : (
        <Carousel
          loop
          width={screenWidth}
          height={175}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 1,
            parallaxScrollingOffset: 80,
          }}
          onConfigurePanGesture={(gesture) => {
            gesture
              .activeOffsetX([-10, 10]) // 가로로 어느 정도 움직였을 때만 캐러셀 동작
              .failOffsetY([-5, 5]); // 세로로 조금이라도 움직이면 캐러셀 제스처 실패 처리
          }}
          data={DUMMY_MY_GROUP_CAROUSEL}
          renderItem={({ item, animationValue }) => (
            <MyGroupCarouselItem
              width={cardWidth}
              content={item}
              animationValue={animationValue}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  header: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
