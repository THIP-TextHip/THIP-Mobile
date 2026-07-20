import { BlurView } from "expo-blur";
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

import { useGetCommentListQuery, useWriteCommentMutation } from "@apis/comment";
import { useDeleteFeedMutation, useGetFeedDetailQuery } from "@apis/feed";
import { AppText, ChatInputBar, CommentRoot, FeedPostDetail } from "@shared/ui";
import { usePrevFeedStore } from "@stores/feed-edit";
import { colors } from "@theme/token";

import {
  FeedDeleteModal,
  FeedDetailBottomSheet,
  FeedDetailHeader,
} from "./components";

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
  const {
    commentList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPendingCommentList,
    isErrorCommentList,
    refetchCommentList,
    isRefetchingCommentList,
  } = useGetCommentListQuery(feedId, "FEED");
  const { deleteFeed, isPendingDeleteFeed } = useDeleteFeedMutation();
  const { writeComment, isPendingWriteComment } = useWriteCommentMutation();
  const { setPrevFeed } = usePrevFeedStore();

  const [comment, setComment] = useState("");
  const [replyCommentId, setReplyCommentId] = useState<number | null>(null);
  const [replyNickname, setReplyNickname] = useState("");
  const [isInputFocus, setIsInputFocus] = useState(false);

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSendText = () => {
    const content = comment.trim();

    if (isPendingWriteComment || !content) return;

    writeComment(
      {
        postId: feedId,
        content,
        isReplyRequest: replyCommentId !== null,
        parentId: replyCommentId,
        postType: "FEED",
      },
      {
        onSuccess: () => {
          setComment("");
          handleResetReply();
          refetchFeedDetail();
        },
      },
    );
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
    setIsBottomSheetVisible(false);
    if (!feedDetail) return null;
    setPrevFeed({
      feedId: feedDetail.feedId,
      feedBook: {
        bookTitle: feedDetail.bookTitle,
        authorName: feedDetail.bookAuthor,
        bookImageUrl: feedDetail.bookImageUrl,
        isbn: feedDetail.isbn,
      },
      contentBody: feedDetail.contentBody,
      isPublic: feedDetail.isPublic,
      imageUrls: feedDetail.contentUrls,
      selectedTagList: feedDetail.tagList,
    });
    router.push("/feed-write");
  };
  const handleOpenDeleteModal = () => {
    setIsBottomSheetVisible(false);
    setIsModalVisible(true);
  };

  const handleFeedDelete = () => {
    if (isPendingDeleteFeed || !feedDetail) return null;
    deleteFeed(feedDetail?.feedId);
  };

  const handleRefresh = async () => {
    await Promise.all([refetchFeedDetail(), refetchCommentList()]);
  };

  const handleLoadMoreComments = () => {
    if (!hasNextPage || isFetchingNextPage) return;

    fetchNextPage();
  };

  const renderCommentEmpty = () => {
    if (isPendingCommentList) {
      return (
        <View style={styles.empty}>
          <ActivityIndicator color={colors.white} />
        </View>
      );
    }

    if (isErrorCommentList) {
      return (
        <View style={styles.empty}>
          <AppText weight="medium" size="sm" color={colors.grey[200]}>
            댓글을 불러오지 못했어요.
          </AppText>
        </View>
      );
    }

    return (
      <View style={styles.empty}>
        <AppText weight="semibold" size="lg" color={colors.white}>
          아직 댓글이 없어요
        </AppText>
        <AppText weight="regular" size="sm" color={colors.grey[100]}>
          첫번째 댓글을 남겨보세요
        </AppText>
      </View>
    );
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

  if (isErrorFeedDetail || !feedDetail) {
    return (
      <View style={[styles.page, { paddingBottom: bottom }]}>
        <FeedDetailHeader handlePressMore={handlePressMore} />
        <View style={styles.error}>
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
        ListHeaderComponent={() => (
          <FeedPostDetail feedDetail={feedDetail} isDetailPage={true} />
        )}
        contentContainerStyle={[styles.list, { paddingBottom: inputBarHeight }]}
        data={commentList}
        keyExtractor={(item) => String(item.commentId)}
        renderItem={({ item }) => (
          <CommentRoot
            postId={feedId}
            postType="FEED"
            comment={item}
            handlePressReply={handlePressReply}
          />
        )}
        ListEmptyComponent={renderCommentEmpty}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator
              style={styles.commentFooter}
              color={colors.white}
            />
          ) : null
        }
        onEndReached={handleLoadMoreComments}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingFeedDetail || isRefetchingCommentList}
            onRefresh={handleRefresh}
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
        isFocus={isInputFocus}
        handleIsFocus={setIsInputFocus}
        isPendingSend={isPendingWriteComment}
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
      {(isPendingFeedDetail || isPendingDeleteFeed) && (
        <BlurView intensity={12} tint="dark" style={styles.linearBlur}>
          <ActivityIndicator size="large" color={colors.white} />
        </BlurView>
      )}
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
  error: {
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
  commentFooter: {
    marginVertical: 24,
  },
  linearBlur: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});
