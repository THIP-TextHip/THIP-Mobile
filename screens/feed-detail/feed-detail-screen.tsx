import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import { useGetFeedDetailQuery } from "@apis/feed";
import { AppText, ChatInputBar, CommentRoot, FeedPostDetail } from "@shared/ui";
import { colors } from "@theme/token";

import {
  FeedDeleteModal,
  FeedDetailBottomSheet,
  FeedDetailHeader,
} from "./components";
import { DUMMY_COMMENT_LIST } from "./constants";

export default function FeedDetailScreen() {
  const { bottom } = useSafeAreaInsets();
  const [inputBarHeight, setInputBarHeight] = useState(0);
  const { feedId } = useLocalSearchParams<{ feedId: string }>();

  // TODO: 로딩 시 인디케이터 대신 스켈레톤 보여주기
  const {
    feedDetail,
    isPendingFeedDetail,
    isErrorFeedDetail,
    refetchFeedDetail,
    isRefetchingFeedDetail,
  } = useGetFeedDetailQuery(feedId);

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
    if (!feedDetail) return;

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

  if (isPendingFeedDetail) {
    return (
      <View style={[styles.page, { paddingBottom: bottom }]}>
        <FeedDetailHeader handlePressMore={handlePressMore} />
        <View style={styles.status}>
          <ActivityIndicator color={colors.white} />
        </View>
      </View>
    );
  }

  if (isErrorFeedDetail || !feedDetail) {
    return (
      <View style={[styles.page, { paddingBottom: bottom }]}>
        <FeedDetailHeader handlePressMore={handlePressMore} />
        <View style={styles.status}>
          <AppText weight="medium" size="sm" color={colors.grey[200]}>
            피드를 불러오지 못했어요.
          </AppText>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.page, { paddingBottom: bottom }]}>
      <FeedDetailHeader handlePressMore={handlePressMore} />
      <FlatList
        ListHeaderComponent={() => <FeedPostDetail feedDetail={feedDetail} />}
        contentContainerStyle={[styles.list, { paddingBottom: inputBarHeight }]}
        data={DUMMY_COMMENT_LIST}
        keyExtractor={(item) => String(item.commentId)}
        renderItem={({ item, index }) => (
          <CommentRoot
            comment={item}
            isFirst={index === 0}
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
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingFeedDetail}
            onRefresh={refetchFeedDetail}
            tintColor={colors.white}
            colors={[colors.white]}
          />
        }
      />

      <ChatInputBar
        text={comment}
        placeholder="여러분의 생각을 남겨주세요."
        setText={setComment}
        handleSend={handleSendText}
        targetName={replyNickname}
        handleResetReply={handleResetReply}
        onLayout={(event) => {
          setInputBarHeight(event.nativeEvent.layout.height);
        }}
      />

      <FeedDetailBottomSheet
        isWriter={feedDetail.isWriter}
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
  list: {
    gap: 24,
  },
  status: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  empty: {
    flex: 1,
    gap: 8,
    minHeight: 300,
    alignItems: "center",
    justifyContent: "center",
  },
});
