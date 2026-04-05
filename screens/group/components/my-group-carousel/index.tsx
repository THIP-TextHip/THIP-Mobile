import { Pressable, StyleSheet, useWindowDimensions, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

import { IcRightRight } from "@images/icons";
import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

// TODO: 서버에서 온 데이터로 수정
import { CharacterSearch } from "@/assets/images/thip/character";
import { LinearGradient } from "expo-linear-gradient";
import { DUMMY_MY_GROUP_CAROUSEL } from "../../constants";
import MyGroupCarouselItem from "../my-group-carousel-item";

export default function MyGroupCarousel() {
  const { width: screenWidth } = useWindowDimensions();
  const cardWidth = screenWidth - 60;

  const handleToMyGroup = () => {
    console.log("내 모임방 페이지로 이동");
  };

  const MyGroupEmpty = () => {
    return (
      <LinearGradient
        start={{ x: 0.2, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0.2826, 1]}
        colors={[colors.white, "#989898"]}
        style={styles.emptyContainer}
      >
        <View style={styles.emptyTextWrapper}>
          <AppText
            weight="semibold"
            size="lg"
            color={colors.black.main}
            lineHeight={24}
          >
            참여 중인 모임방이 없어요
          </AppText>
          <AppText weight="regular" size="sm" color={colors.grey[300]}>
            모임방을 찾아 참여해보세요!
          </AppText>
        </View>
        <CharacterSearch style={{ paddingTop: 1 }} />
      </LinearGradient>
    );
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
        <MyGroupEmpty />
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
  emptyContainer: {
    marginHorizontal: 30,
    borderRadius: 12,
    paddingTop: 34,
    alignItems: "center",
    gap: 20,
  },
  emptyTextWrapper: {
    gap: 4,
    alignItems: "center",
  },
});
