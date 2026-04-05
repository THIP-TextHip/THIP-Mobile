import { useState } from "react";
import { Pressable, StyleSheet, useWindowDimensions, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

import { IcRightRight } from "@images/icons";
import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

import { DUMMY_MY_GROUP_CAROUSEL } from "../../constants";
import MyGroupCarouselItem from "../my-group-carousel-item";

export default function MyGroupCarousel() {
  const { width: screenWidth } = useWindowDimensions();
  const cardWidth = screenWidth - 60;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleToMyGroup = () => {
    console.log("내 모임방 페이지로 이동");
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
      <Carousel
        loop
        width={screenWidth}
        height={175}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: 60,
          parallaxAdjacentItemScale: 0.9,
        }}
        onScrollStart={() => setIsScrolling(true)}
        onScrollEnd={() => setIsScrolling(false)}
        onSnapToItem={(index) => setActiveIndex(index)}
        data={DUMMY_MY_GROUP_CAROUSEL}
        renderItem={({ item, index }) => (
          <MyGroupCarouselItem
            width={cardWidth}
            isActive={isScrolling || index === activeIndex}
            content={item}
          />
        )}
      />
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
