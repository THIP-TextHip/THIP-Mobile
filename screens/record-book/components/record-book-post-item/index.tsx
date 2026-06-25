import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@shared/ui";
import { usePrevRecordStore, useRecordBookPinStore } from "@stores/record-book";
import { colors } from "@theme/token";

import { DUMMY_RECORD_PIN_BOOK_INFO } from "../../constants";
import { RecordBookPostType } from "../../types";
import RecordModal from "../record-modal";
import RecordOptionBottomSheet from "../record-option-bottom-sheet";
import RecordPostActions from "./record-post-actions";
import RecordVoteList from "./record-vote-list";

interface RecordBookPostItemProps {
  roomId: number;
  post: RecordBookPostType;
  handleOpenComment: (postId: number) => void;
}

// TODO: 서버 연결하면서 이벤트 핸들러 구현
export default function RecordBookPostItem({
  roomId,
  post,
  handleOpenComment,
}: RecordBookPostItemProps) {
  const { setPrevRecord } = usePrevRecordStore();
  const { setPinInfo } = useRecordBookPinStore();

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
    setPrevRecord({
      postId: post.postId,
      page: post.page,
      isOverview: post.isOverview,
      content: post.content,
      voteItems: post.voteItems,
    });
    setIsOptionOpen(false);
    if (post.voteItems.length === 0) {
      router.push({
        pathname: "/record-write/[roomId]",
        params: { roomId },
      });
    } else {
      router.push({
        pathname: "/create-vote/[roomId]",
        params: { roomId },
      });
    }
  };

  const handleDelete = () => {
    console.log(post.postId, "번 기록 삭제");
    setIsModalOpen(false);
  };

  // TODO: 추후 서버 api를 통해 핀을 위한 책 정보 조회
  const handleToPin = () => {
    setPinInfo({ bookInfo: DUMMY_RECORD_PIN_BOOK_INFO, content: post.content });
    router.push("/feed-write");
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
        <RecordVoteList voteItems={post.voteItems} handleVote={handleVote} />
        <RecordPostActions
          postId={post.postId}
          isLiked={post.isLiked}
          isWriter={post.isWriter}
          likeCount={post.likeCount}
          commentCount={post.commentCount}
          handlePressLike={handlePressLike}
          handleOpenComment={handleOpenComment}
          handleOpenPinModal={handleOpenPinModal}
        />
      </Pressable>
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
});
