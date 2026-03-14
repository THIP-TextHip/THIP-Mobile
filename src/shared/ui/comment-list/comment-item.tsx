import { useRef, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { IcHeart, IcHeartFilled, IcReply } from "@images/icons";
import { colors } from "@theme/token";

import AppText from "../app-text";
import ProfileImage from "../profile-image";
import CommentBottomSheet from "./comment-bottom-sheet";
import { CommentListType, CommentReplyListType } from "./types";

interface CommentItemProps {
  comment: CommentListType | CommentReplyListType;
  handlePressReply: (commentId: number, replyNickname: string) => void;
}

export default function CommentItem({
  comment,
  handlePressReply,
}: CommentItemProps) {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const commentItemRef = useRef<View>(null);

  const handleToUser = () => {
    console.log(comment.creatorId, "번 유저로 이동");
  };
  const handlePressReplyButton = () => {
    handlePressReply(comment.commentId, comment.creatorNickname);
  };
  const handlePressHeart = () => {
    console.log(comment.commentId, "번 댓글 하트 누르기");
  };

  const handleLongPressComment = () => {
    setIsBottomSheetVisible(true);
  };
  const handleCloseBottomSheet = () => {
    setIsBottomSheetVisible(false);
  };

  const renderContents = () => {
    return (
      <Pressable
        ref={commentItemRef}
        style={styles.container}
        onLongPress={handleLongPressComment}
      >
        <Pressable style={styles.header}>
          <Pressable style={styles.profile} onPress={handleToUser}>
            <ProfileImage image={comment.creatorProfileImageUrl} size={24} />
            <View style={styles.creatorInfo}>
              <AppText weight="semibold" size="xs" color={colors.white}>
                {comment.creatorNickname}
              </AppText>
              <AppText weight="regular" size="2xs" color={comment.aliasColor}>
                {comment.aliasName}
              </AppText>
            </View>
          </Pressable>
          <AppText weight="regular" size="2xs" color={colors.grey[200]}>
            {comment.postDate}
          </AppText>
        </Pressable>
        <View style={styles.content}>
          <View style={styles.commentContainer}>
            <AppText
              weight="regular"
              size="sm"
              color={colors.grey[100]}
              style={{ lineHeight: 20 }}
            >
              {"parentCommentCreatorNickname" in comment && (
                <AppText
                  weight="medium"
                  size="sm"
                  color={colors.white}
                  style={{ lineHeight: 20 }}
                >
                  @{comment.parentCommentCreatorNickname}{" "}
                </AppText>
              )}
              {comment.content}
            </AppText>

            <Pressable
              onPress={handlePressReplyButton}
              hitSlop={5}
              style={styles.replyButton}
            >
              <AppText weight="semibold" size="xs" color={colors.grey[300]}>
                답글 작성
              </AppText>
            </Pressable>
          </View>
          <View style={styles.likeWrapper}>
            <Pressable onPress={handlePressHeart} hitSlop={5}>
              {comment.isLike ? <IcHeartFilled /> : <IcHeart />}
            </Pressable>
            <AppText weight="medium" size="2xs" color={colors.grey[100]}>
              {comment.likeCount}
            </AppText>
          </View>
        </View>
        <CommentBottomSheet
          commentId={comment.commentId}
          isWriter={comment.isWriter}
          isVisible={isBottomSheetVisible}
          handleCloseBottomSheet={handleCloseBottomSheet}
        />
      </Pressable>
    );
  };

  return "parentCommentCreatorNickname" in comment ? (
    <View style={styles.replyContainer}>
      <IcReply />
      {renderContents()}
    </View>
  ) : (
    renderContents()
  );
}

const styles = StyleSheet.create({
  replyContainer: { flexDirection: "row", gap: 8 },
  container: { gap: 12, flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profile: {
    flexDirection: "row",
    gap: 8,
  },
  creatorInfo: {
    gap: 4,
  },
  content: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 20,
  },
  commentContainer: {
    flex: 1,
    gap: 12,
  },

  replyButton: {
    alignSelf: "flex-start",
  },
  likeWrapper: {
    gap: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(18, 18, 18, 0.30)",
  },
  modalButton: {
    position: "absolute",
    right: 20,
    zIndex: 10,
    width: 120,
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 20,
    backgroundColor: colors.black.main,
  },
});
