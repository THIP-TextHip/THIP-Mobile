import { useRef } from "react";
import { Pressable, StyleSheet, useWindowDimensions, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";

import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

import { CurrentVoteType } from "../../types";

interface VotesCarouselProps {
  currentVotes: CurrentVoteType[];
}

const VotesCarouselItem = (vote: CurrentVoteType) => {
  const handleToRecordBook = () => {
    console.log(vote.page, " 페이지에 해당하는 기록장 페이지로 이동");
  };
  return (
    <Pressable style={styles.voteContainer} onPress={handleToRecordBook}>
      <AppText weight="medium" size="xs" color={colors.grey[100]}>
        {vote.content}
      </AppText>
      {vote.voteItems.map((item, index) => (
        <View key={item.itemName} style={styles.voteItem}>
          <AppText
            weight="regular"
            size="sm"
            color={colors.white}
            lineHeight={20}
          >
            {index + 1}. {item.itemName}
          </AppText>
        </View>
      ))}
    </Pressable>
  );
};

export default function VotesCarousel({ currentVotes }: VotesCarouselProps) {
  const { width } = useWindowDimensions();

  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const handlePressDot = (index: number) => {
    ref.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText
          weight="semibold"
          size="base"
          color={colors.white}
          lineHeight={24}
        >
          모임방의 뜨거운 감자
        </AppText>
      </View>
      {currentVotes.length === 0 ? (
        <View style={styles.empty}>
          <AppText weight="medium" size="xs" color={colors.grey[100]}>
            모임방에 생성된 투표가 없어요
          </AppText>
        </View>
      ) : (
        <>
          <Carousel
            width={width - 40}
            height={185}
            ref={ref}
            data={currentVotes}
            loop={true}
            onProgressChange={progress}
            renderItem={({ item }) => <VotesCarouselItem {...item} />}
          />
          <Pagination.Basic
            progress={progress}
            data={currentVotes}
            dotStyle={styles.dotStyle}
            activeDotStyle={styles.activeDotStyle}
            containerStyle={styles.paginationContainer}
            onPress={handlePressDot}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    gap: 12,
    borderRadius: 12,
    backgroundColor: colors.darkgrey.dark,
  },
  header: {
    paddingHorizontal: 12,
  },
  voteContainer: {
    gap: 12,
    paddingHorizontal: 12,
  },
  voteItem: {
    height: 44,
    paddingHorizontal: 12,
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: colors.darkgrey.main,
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
  empty: {
    paddingVertical: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
