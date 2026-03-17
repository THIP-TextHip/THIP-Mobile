import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import { AppText, ChatInputBar, CommentRoot, FeedPostDetail } from "@shared/ui";
import { colors } from "@theme/token";

import {
  FeedDeleteModal,
  FeedDetailBottomSheet,
  FeedDetailHeader,
} from "./components";
import { DUMMY_COMMENT_LIST, DUMMY_FEED_DETAIL } from "./constants";

export default function FeedDetailScreen() {
  const { bottom } = useSafeAreaInsets();
  const { feedId } = useLocalSearchParams<{ feedId: string }>();

  const [comment, setComment] = useState("");

  const [replyCommentId, setReplyCommentId] = useState<number | null>(null);
  const [replyNickname, setReplyNickname] = useState("");

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSendText = () => {
    if (replyCommentId !== null) {
      console.log(
        replyNickname,
        "에게 ",
        replyCommentId,
        "번에 대한 답글 ",
        comment.trim(),
        " 전송",
      );
    } else {
      console.log(comment.trim(), " 전송");
    }
    setComment("");
  };

  const handlePressReply = (commentId: number, replyNickname: string) => {
    setReplyCommentId(commentId);
    setReplyNickname(replyNickname);
  };

  const handleResetReply = () => {
    setReplyCommentId(null);
    setReplyNickname("");
  };

  const handlePressMore = () => {
    setIsBottomSheetVisible(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetVisible(false);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleReport = () => {
    console.log("피드 신고하기");
  };
  const handleToEdit = () => {
    console.log("피드 수정 페이지로 이동");
  };
  const handleOpenDeleteModal = () => {
    setIsBottomSheetVisible(false);
    setIsModalVisible(true);
  };

  const handleFeedDelete = () => {
    // TODO: 삭제 성공 시 토스트로 알림
    setIsModalVisible(false);
    router.back();
    Toast.show({
      type: "default",
      text1: "피드가 삭제되었어요.",
    });
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
      <FlatList
        ListHeaderComponent={() => (
          <FeedPostDetail feedDetail={DUMMY_FEED_DETAIL} />
        )}
        contentContainerStyle={{ paddingBottom: bottom + 40 }}
        data={DUMMY_COMMENT_LIST}
        keyExtractor={(item) => String(item.commentId)}
        renderItem={({ item, index }) => (
          <CommentRoot
            comment={item}
            isFirst={index === 0}
            isLast={index === DUMMY_COMMENT_LIST.length - 1}
            handlePressReply={handlePressReply}
          />
        )}
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <AppText weight="semibold" size="lg" color={colors.white}>
              아직 댓글이 없어요
            </AppText>
            <AppText weight="regular" size="sm" color={colors.grey[100]}>
              첫번째 댓글을 남겨보세요
            </AppText>
          </View>
        )}
      />

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
        handleDelete={handleOpenDeleteModal}
      />
      <FeedDeleteModal
        isVisible={isModalVisible}
        handleCloseModal={handleCloseModal}
        handleFeedDelete={handleFeedDelete}
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
    gap: 8,
    minHeight: 300,
    alignItems: "center",
    justifyContent: "center",
  },
});
