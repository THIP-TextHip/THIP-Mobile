import { router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

import { AppText, ButtonHeader, CustomHeader } from "@shared/ui";
import { colors } from "@theme/token";

import { OnboardingCarouselItem } from "./components";
import { ONBOARDING } from "./constants";

export default function OnboardingScreen() {
  const { width } = useWindowDimensions();

  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isLastItem = currentIndex === ONBOARDING.length - 1;

  const { from } = useLocalSearchParams<{ from?: string }>();
  const isFromNickname = from === "my-page";

  const handlePressNext = () => {
    if (isLastItem) {
      if (isFromNickname) {
        router.push("/my-page");
        return;
      }
      router.push("/sign-up/welcome");
    } else {
      ref.current?.scrollTo({
        count: 1,
        animated: true,
      });
    }
  };

  const handlePressDot = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  const handlePressSkip = () => {
    ref.current?.scrollTo({
      count: ONBOARDING.length - progress.value - 1,
      animated: true,
    });
  };

  return (
    <View style={styles.page}>
      <CustomHeader
        right={
          <ButtonHeader handleClickButton={handlePressNext}>
            {isLastItem ? "완료" : "다음"}
          </ButtonHeader>
        }
      />
      {/* TODO: 캐러셀 관련 스타일링 디테일 수정 */}
      <ScrollView contentContainerStyle={styles.container}>
        <Carousel
          width={width - 40}
          height={585}
          ref={ref}
          data={ONBOARDING}
          loop={false}
          onProgressChange={progress}
          onSnapToItem={(index) => setCurrentIndex(index)}
          renderItem={({ item }) => <OnboardingCarouselItem item={item} />}
        />
        <Pagination.Basic
          progress={progress}
          data={ONBOARDING}
          dotStyle={styles.dotStyle}
          activeDotStyle={styles.activeDotStyle}
          containerStyle={styles.paginationContainer}
          onPress={handlePressDot}
        />
        <Pressable onPress={handlePressSkip}>
          <AppText
            weight="regular"
            size="xs"
            color={colors.grey[200]}
            style={styles.skipText}
          >
            건너뛰기
          </AppText>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    alignItems: "center",
    gap: 20,
    marginTop: 10,
    marginBottom: 30,
  },
  paginationContainer: {
    gap: 12,
  },
  dotStyle: {
    width: 4,
    height: 4,
    backgroundColor: colors.grey[300],
    borderRadius: 999,
  },
  activeDotStyle: {
    backgroundColor: colors.white,
    borderRadius: 999,
  },
  skipText: {
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
});
