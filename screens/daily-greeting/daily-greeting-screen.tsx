import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppText, ChatInputBar } from "@shared/ui";
import { colors } from "@theme/token";

import { DailyGreetingHeader } from "./components";

export default function DailyGreetingScreen() {
  const { bottom } = useSafeAreaInsets();
  // const { roomId } = useLocalSearchParams<{ roomId: string }>();

  const [comment, setComment] = useState("");

  const [inputBarHeight, setInputBarHeight] = useState(0);

  const handleSendText = () => {
    if (comment.trim() === "") return;
    console.log(comment.trim(), " 전송");
    setComment("");
  };

  return (
    <View style={[styles.page, { paddingBottom: bottom }]}>
      <DailyGreetingHeader />
      <FlatList
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: inputBarHeight },
        ]}
        data={[1, 2, 3, 4, 5, 6]}
        renderItem={({ item }) => (
          <AppText weight="bold" size="2xl" color={colors.white}>
            {item}
          </AppText>
        )}
      />
      <ChatInputBar
        text={comment}
        placeholder="메이트들과 간단한 인사를 나눠보세요!"
        setText={setComment}
        handleSend={handleSendText}
        onLayout={(event) => {
          setInputBarHeight(event.nativeEvent.layout.height);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  listContent: {
    gap: 200,
  },
});
