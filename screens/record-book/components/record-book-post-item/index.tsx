import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import {
  IcComment,
  IcHeartLeft,
  IcHeartLeftFilled,
  IcPin,
} from "@images/icons";
import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

import {
  RecordComment,
  RecordModal,
  RecordOptionBottomSheet,
} from "../../components";
import { RecordBookPostType } from "../../types";

interface RecordBookPostItemProps {
  roomId: number;
  post: RecordBookPostType;
}

// TODO: 서버 연결하면서 이벤트 핸들러 구현
export default function RecordBookPostItem({
  roomId,
  post,
}: RecordBookPostItemProps) {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"delete" | "pin" | null>(null);

  const handleToProfile = () => {
    router.push({
      pathname: "/user-profile/[userId]",
      params: { userId: String(post.userId) },
    });
  };

  const handleVote = (voteItemId: number) => {
    console.log(roomId, "번 방 ", voteItemId, "번 투표");
  };

  const handlePressLike = () => {
    console.log(post.postId, "번 기록 좋아요 클릭");
  };

  const handleOpenComment = () => {
    setIsCommentOpen(true);
  };
  const handleCloseComment = () => {
    setIsCommentOpen(false);
  };

  const handleOpenOption = () => {
    setIsOptionOpen(true);
  };
  const handleCloseOption = () => {
    setIsOptionOpen(false);
  };

  const handleReport = () => {
    console.log(post.postId, "번 기록 신고");
    setIsOptionOpen(false);
  };
  const handleToEdit = () => {
    console.log(post.postId, "번 기록 수정하러 가기");
    setIsOptionOpen(false);
  };
  const handleDelete = () => {
    console.log(post.postId, "번 기록 삭제");
    setIsModalOpen(false);
  };

  const handleToPin = () => {
    console.log(post.postId, "번 핀하러 가기");
    setIsModalOpen(false);
  };

  const handleOpenDeleteModal = () => {
    setModalType("delete");
    setIsOptionOpen(false);
    setIsModalOpen(true);
  };

  const handleOpenPinModal = () => {
    setModalType("pin");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalType(null);
    setIsModalOpen(false);
  };

  const getFillPercent = (voteCount: number) => {
    let totalCount = 0;
    post.voteItems.map((item) => {
      totalCount += item.count;
    });

    return (voteCount / totalCount) * 100;
  };

  return (
    <>
      <Pressable style={styles.container} onLongPress={handleOpenOption}>
        <View style={styles.header}>
          <Pressable style={styles.profile} onPress={handleToProfile}>
            <Image
              style={styles.profileImage}
              source={{ uri: post.profileImageUrl }}
            />
            <View style={styles.profileText}>
              <AppText weight="medium" size="sm" color={colors.white}>
                {post.nickName}
              </AppText>
              <AppText weight="regular" size="xs" color={colors.purple.sub}>
                {post.page}p
              </AppText>
            </View>
          </Pressable>
          <AppText weight="regular" size="2xs" color={colors.grey[200]}>
            {post.postDate}
          </AppText>
        </View>
        <AppText
          weight="regular"
          size="sm"
          color={colors.grey[100]}
          lineHeight={20}
        >
          {post.content}
        </AppText>
        {post.voteItems.length > 0 && (
          <View style={styles.voteWrapper}>
            {post.voteItems.map((item, index) => (
              <Pressable
                key={item.voteItemId}
                style={[styles.voteItem, item.isVoted && styles.isVotedItem]}
                onPress={() => handleVote(item.voteItemId)}
              >
                <AppText
                  style={styles.voteContent}
                  weight="semibold"
                  size="sm"
                  color={item.isVoted ? colors.neongreen : colors.white}
                >
                  {index + 1}. {item.itemName}
                </AppText>
                <AppText
                  style={styles.voteCount}
                  weight="semibold"
                  size="sm"
                  color={item.isVoted ? colors.neongreen : colors.white}
                >
                  {item.count}표
                </AppText>
                <View
                  style={[
                    styles.voteFill,
                    item.isVoted && { backgroundColor: colors.purple.main },
                    { width: `${getFillPercent(item.count)}%` },
                    getFillPercent(item.count) >= 97 && {
                      borderRadius: 12,
                    },
                  ]}
                />
              </Pressable>
            ))}
          </View>
        )}

        <View style={styles.likeCommentWrapper}>
          <Pressable
            style={styles.likeComment}
            onPress={handlePressLike}
            hitSlop={5}
          >
            {post.isLiked ? <IcHeartLeftFilled /> : <IcHeartLeft />}
            <AppText weight="medium" size="xs" color={colors.white}>
              {post.likeCount}
            </AppText>
          </Pressable>
          <Pressable
            style={styles.likeComment}
            onPress={handleOpenComment}
            hitSlop={5}
          >
            <IcComment />
            <AppText weight="medium" size="xs" color={colors.white}>
              {post.commentCount}
            </AppText>
          </Pressable>
          {post.isWriter && (
            <Pressable onPress={handleOpenPinModal} hitSlop={5}>
              <IcPin />
            </Pressable>
          )}
        </View>
      </Pressable>
      <RecordComment
        isVisible={isCommentOpen}
        handleClose={handleCloseComment}
      />
      <RecordOptionBottomSheet
        isWriter={post.isWriter}
        isVisible={isOptionOpen}
        handleCloseBottomSheet={handleCloseOption}
        handleReport={handleReport}
        handleToEdit={handleToEdit}
        handleDelete={handleOpenDeleteModal}
      />
      <RecordModal
        modalType={modalType}
        isVisible={isModalOpen}
        handleCloseModal={handleCloseModal}
        handleDelete={handleDelete}
        handleToPin={handleToPin}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profile: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 36,
    borderWidth: 0.5,
    borderColor: colors.grey[300],
  },
  profileText: {
    gap: 4,
  },
  voteWrapper: {
    gap: 12,
  },
  voteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: colors.darkgrey.main,
    height: 44,
  },
  voteFill: {
    position: "absolute",
    height: 44,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    left: 0,
    backgroundColor: colors.grey[300],
    zIndex: -1,
  },
  voteContent: {
    paddingLeft: 12,
  },
  voteCount: {
    paddingRight: 12,
  },
  isVotedItem: {
    backgroundColor: colors.purple.dark,
  },
  likeCommentWrapper: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  likeComment: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
  },
});
