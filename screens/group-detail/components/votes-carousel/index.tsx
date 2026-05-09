import { router } from "expo-router";
import { useCallback, useRef } from "react";
import type { GestureResponderEvent } from "react-native";
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
  roomId: number;
  currentVotes: CurrentVoteType[];
}

interface VotesCarouselItemProps {
  roomId: number;
  vote: CurrentVoteType;
}

const TAP_MOVE_THRESHOLD = 8;

const VotesCarouselItem = ({ roomId, vote }: VotesCarouselItemProps) => {
  const pressStartRef = useRef<{ x: number; y: number } | null>(null);

  const handlePressIn = useCallback((event: GestureResponderEvent) => {
    pressStartRef.current = {
      x: event.nativeEvent.pageX,
      y: event.nativeEvent.pageY,
    };
  }, []);

  const handleToRecordBook = useCallback(
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

      // TODO: 추후 특정 페이지로 이동하도록 수정 필요.
      router.push({
        pathname: "/record-book/[roomId]",
        params: { roomId: String(roomId) },
      });
    },
    [roomId],
  );

  return (
    <Pressable
      style={styles.voteContainer}
      onPressIn={handlePressIn}
      onPress={handleToRecordBook}
    >
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

export default function VotesCarousel({
  roomId,
  currentVotes,
}: VotesCarouselProps) {
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
            renderItem={({ item }) => (
              <VotesCarouselItem roomId={roomId} vote={item} />
            )}
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
