import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import {
  useGetDailyGreetingQuery,
  useWriteDailyGreetingMutation,
} from "@apis/room";
import { AppText, ChatInputBar } from "@shared/ui";
import { colors } from "@theme/token";

import { DailyGreetingHeader, GreetingListItem } from "./components";

// TODO: 반드시 역방향 무한스크롤 잘 되는지 테스트해보기
export default function DailyGreetingScreen() {
  const { bottom } = useSafeAreaInsets();
  const { roomId } = useLocalSearchParams<{ roomId: string }>();

  const [comment, setComment] = useState("");
  const [inputBarHeight, setInputBarHeight] = useState(0);
  const [isInputFocus, setIsInputFocus] = useState(false);

  const {
    dailyGreetingData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPendingDailyGreeting,
    isErrorDailyGreeting,
    dailyGreetingError,
  } = useGetDailyGreetingQuery(roomId);
  const { writeDailyGreeting, isPendingWriteDailyGreeting } =
    useWriteDailyGreetingMutation();

  const handleSendText = () => {
    const normalizedComment = comment.trim();
    if (normalizedComment === "" || isPendingWriteDailyGreeting) return;
    writeDailyGreeting(
      { roomId, content: normalizedComment },
      { onSuccess: () => setComment("") },
    );
  };

  const handleLoadMore = () => {
    if (!hasNextPage || isFetchingNextPage) return;

    fetchNextPage();
  };

  if (!roomId) {
    Toast.show({
      type: "error",
      text1: "잘못된 접근이에요. 다시 시도해 주세요.",
    });
    router.back();
  }

  const StatusView = () => {
    if (isPendingDailyGreeting)
      return (
        <View style={[styles.empty, { marginBottom: inputBarHeight }]}>
          <ActivityIndicator size="large" color={colors.white} />
        </View>
      );
    return (
      <View style={[styles.empty, { marginBottom: inputBarHeight }]}>
        {isErrorDailyGreeting ? (
          <AppText
            weight="semibold"
            size="lg"
            color={colors.white}
            lineHeight={24}
          >
            데이터를 불러오지 못했어요 ({dailyGreetingError?.code})
          </AppText>
        ) : (
          <>
            <AppText
              weight="semibold"
              size="lg"
              color={colors.white}
              lineHeight={24}
            >
              아직 대화가 없어요
            </AppText>
            <AppText weight="regular" size="sm" color={colors.grey[100]}>
              첫번째 한마디를 남겨보세요!
            </AppText>
          </>
        )}
      </View>
    );
  };

  return (
    <View style={[styles.page, { paddingBottom: bottom }]}>
      <DailyGreetingHeader />
      {dailyGreetingData.length === 0 ? (
        <StatusView />
      ) : (
        <FlatList
          inverted
          contentContainerStyle={{
            paddingTop: inputBarHeight,
          }}
          data={dailyGreetingData}
          keyExtractor={(item) => String(item.attendanceCheckId)}
          renderItem={({ item, index }) => {
            const isLatestComment = index === 0;
            const isOldestComment = dailyGreetingData[index + 1] === undefined;
            const isFirstCommentOfDate =
              item.date !== dailyGreetingData[index + 1]?.date;

            return (
              <GreetingListItem
                isLatestComment={isLatestComment}
                isOldestComment={isOldestComment}
                isFirstCommentOfDate={isFirstCommentOfDate}
                greetingItem={item}
              />
            );
          }}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator style={styles.footer} color={colors.white} />
            ) : null
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
        />
      )}

      <ChatInputBar
        text={comment}
        placeholder="메이트들과 간단한 인사를 나눠보세요!"
        setText={setComment}
        handleSend={handleSendText}
        onLayout={(event) => {
          setInputBarHeight(event.nativeEvent.layout.height);
        }}
        isFocus={isInputFocus}
        handleIsFocus={setIsInputFocus}
        isPendingSend={isPendingWriteDailyGreeting}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  footer: {
    marginBottom: 40,
  },
});
