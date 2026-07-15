import { router } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";

import { useGetHomeMyRoomQuery } from "@apis/room";
import { IcRightRight } from "@images/icons";
import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

import MyGroupCarouselStatus from "./my-group-carousel-empty";
import MyGroupCarouselItem from "./my-group-carousel-item";

// TODO: 추후 모임방 여러 개 참여 후 정상 작동하는지 테스트 필요

export default function MyGroupCarousel() {
  const { width: screenWidth } = useWindowDimensions();
  const cardWidth = screenWidth - 60;

  const {
    homeMyRoomData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPendingHomeMyRoom,
    isErrorHomeMyRoom,
    homeMyRoomError,
  } = useGetHomeMyRoomQuery();

  const handleLoadMore = () => {
    if (!hasNextPage || isFetchingNextPage) return;

    fetchNextPage();
  };

  const handleSnapToItem = (index: number) => {
    const DEFAULT_PRELOAD_THRESHOLD = 2;
    const shouldLoadNextCarouselPage =
      homeMyRoomData.length - 1 - index <= DEFAULT_PRELOAD_THRESHOLD;
    if (shouldLoadNextCarouselPage) handleLoadMore();
  };

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
      {isPendingHomeMyRoom ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.white} />
        </View>
      ) : homeMyRoomData.length === 0 ? (
        <MyGroupCarouselStatus
          isError={isErrorHomeMyRoom}
          errorCode={homeMyRoomError?.code}
        />
      ) : homeMyRoomData.length === 1 ? (
        <MyGroupCarouselItem width={cardWidth} content={homeMyRoomData[0]} />
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
          data={homeMyRoomData}
          onSnapToItem={handleSnapToItem}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 175,
  },
});
