import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import { ChatInputBar, FeedPostDetail } from "@shared/ui";

import { FeedDetailBottomSheet, FeedDetailHeader } from "./components";
import { DUMMY_FEED_DETAIL } from "./constants";

export default function FeedDetailScreen() {
  const { bottom } = useSafeAreaInsets();
  const { feedId } = useLocalSearchParams<{ feedId: string }>();

  const [comment, setComment] = useState("");
  // TODO: 테스트용 상태입니다. 답글 작성 상태 관련으로 수정
  const [replyNickname, setReplyNickname] = useState("사용자1");

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const handleSendText = () => {
    console.log(comment.trim(), " 전송");
    setComment("");
  };

  // TODO: 답글 작성 상태 초기화로
  const handleResetReply = () => {
    setReplyNickname("");
  };

  const handlePressMore = () => {
    setIsBottomSheetVisible(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetVisible(false);
  };

  const handleReport = () => {
    console.log("피드 신고하기");
  };
  const handleToEdit = () => {
    console.log("피드 수정하기");
  };
  const handleDelete = () => {
    console.log("피드 삭제하기");
  };

  useEffect(() => {
    if (!feedId) {
      Toast.show({
        type: "error",
        text1: "해당 피드가 존재하지 않습니다.",
      });
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace("/feed");
      }
    }
  }, [feedId]);

  if (!feedId) return null;

  return (
    <View style={[styles.page, { paddingBottom: bottom }]}>
      <FeedDetailHeader handlePressMore={handlePressMore} />
      <ScrollView>
        <FeedPostDetail feedDetail={DUMMY_FEED_DETAIL} />
        {/* TODO: 댓글 리스트 및 입력창 구현 예정 */}
        <View style={{ height: 200 }}></View>
      </ScrollView>

      <ChatInputBar
        text={comment}
        placeholder="여러분의 생각을 남겨주세요."
        setText={setComment}
        handleSend={handleSendText}
        targetName={replyNickname}
        handleResetReply={handleResetReply}
      />

      <FeedDetailBottomSheet
        // TODO: 서버에서 받아온 데이터로 수정 예정
        isWriter={DUMMY_FEED_DETAIL.isWriter}
        isVisible={isBottomSheetVisible}
        handleCloseBottomSheet={handleCloseBottomSheet}
        handleReport={handleReport}
        handleToEdit={handleToEdit}
        handleDelete={handleDelete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});
