import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppText, ChatInputBar } from "@shared/ui";
import { colors } from "@theme/token";

import { DailyGreetingHeader, GreetingListItem } from "./components";
// TODO: 추후 서버 제공 배열로 수정. 무한 스크롤 적용
import { DUMMY_DAILY_GREETING } from "./constants";

export default function DailyGreetingScreen() {
  const { bottom } = useSafeAreaInsets();
  // const { roomId } = useLocalSearchParams<{ roomId: string }>();

  const [comment, setComment] = useState("");

  const [inputBarHeight, setInputBarHeight] = useState(0);
  const [isInputFocus, setIsInputFocus] = useState(false);

  // TODO: 추후 하루에 최대 5개까지 작성할 수 있다는 에러 메시지 토스트로 알림. 서버에서 주는 에러메시지 활용
  const handleSendText = () => {
    if (comment.trim() === "") return;
    console.log(comment.trim(), " 전송");
    setComment("");
  };

  const EmptyView = () => {
    return (
      <View style={[styles.empty, { marginBottom: inputBarHeight }]}>
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
      </View>
    );
  };

  return (
    <View style={[styles.page, { paddingBottom: bottom }]}>
      <DailyGreetingHeader />
      {DUMMY_DAILY_GREETING.length === 0 ? (
        <EmptyView />
      ) : (
        <FlatList
          inverted
          contentContainerStyle={{ paddingTop: inputBarHeight }}
          data={DUMMY_DAILY_GREETING}
          keyExtractor={(item) => String(item.attendanceCheckId)}
          renderItem={({ item, index }) => {
            const isLatestComment = index === 0;
            const isOldestComment =
              DUMMY_DAILY_GREETING[index + 1] === undefined;
            const isFirstCommentOfDate =
              item.date !== DUMMY_DAILY_GREETING[index + 1]?.date;

            return (
              <GreetingListItem
                isLatestComment={isLatestComment}
                isOldestComment={isOldestComment}
                isFirstCommentOfDate={isFirstCommentOfDate}
                greetingItem={item}
              />
            );
          }}
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
        // TODO: 추후 반영
        isPendingSend={false}
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
});
