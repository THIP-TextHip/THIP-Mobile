import { BlurView } from "expo-blur";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

import { type RoomPostType } from "@apis/room";
import {
  useChangeRoomPostLikeStatusMutation,
  useDeleteRoomPostMutation,
  useDoRoomVoteMutation,
  useGetBookInfoForPinQuery,
  useReportRoomPostMutation,
  type RoomPostContent,
} from "@apis/room-post";
import { AppText, LoadingOverlay } from "@shared/ui";
import { usePrevRecordStore, useRecordBookPinStore } from "@stores/record-book";
import { colors } from "@theme/token";

import RecordModal from "../record-modal";
import RecordOptionBottomSheet from "../record-option-bottom-sheet";
import RecordPostActions from "./record-post-actions";
import RecordVoteList from "./record-vote-list";

interface RecordBookPostItemProps {
  roomId: number;
  post: RoomPostContent;
  handleOpenComment: (postId: number, postType: RoomPostType) => void;
}

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

  const {
    bookInfoForPin,
    isPendingBookInfoForPin,
    isErrorBookInfoForPin,
    bookInfoForPinError,
  } = useGetBookInfoForPinQuery({
    roomId,
    recordId: post.postId,
    isRecord: post.postType === "RECORD",
    isModalOpen: isModalOpen,
  });
  const {
    deleteRoomRecord,
    deleteRoomVote,
    isPendingDeleteRoomRecord,
    isPendingDeleteRoomVote,
  } = useDeleteRoomPostMutation();
  const { doVote, isPendingDoVote } = useDoRoomVoteMutation();
  const {
    reportRoomRecord,
    reportRoomVote,
    isPendingReportRoomRecord,
    isPendingReportRoomVote,
  } = useReportRoomPostMutation();
  const { changeRoomPostLikeStatus, isPendingChangeRoomPostLikeStatus } =
    useChangeRoomPostLikeStatusMutation(roomId);

  const handleToProfile = () => {
    router.push({
      pathname: "/user-profile/[userId]",
      params: { userId: String(post.userId) },
    });
  };

  const handleVote = (voteItemId: number, isVoted: boolean) => {
    if (isPendingDoVote) return;
    doVote({ roomId, voteId: post.postId, voteItemId, type: !isVoted });
  };

  const handlePressLike = (isLiked: boolean) => {
    if (isPendingChangeRoomPostLikeStatus) return;

    changeRoomPostLikeStatus({
      postId: post.postId,
      type: !isLiked,
      roomPostType: post.postType,
    });
  };

  const handleOpenOption = () => {
    setIsOptionOpen(true);
  };
  const handleCloseOption = () => {
    setIsOptionOpen(false);
  };

  const handleReport = () => {
    if (isPendingReportRoomRecord || isPendingReportRoomVote) return;

    // 바텀시트를 먼저 닫아야 LoadingOverlay가 가려지지 않는다.
    setIsOptionOpen(false);
    if (post.postType === "RECORD") {
      reportRoomRecord({ roomId, recordId: post.postId });
    } else {
      reportRoomVote({ roomId, voteId: post.postId });
    }
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
    if (isPendingDeleteRoomRecord || isPendingDeleteRoomVote) return;

    // RN Modal은 두 개를 동시에 띄울 수 없어 확인 모달을 먼저 닫는다.
    setIsModalOpen(false);
    if (post.postType === "RECORD") {
      deleteRoomRecord({ roomId, recordId: post.postId });
    } else {
      deleteRoomVote({ roomId, voteId: post.postId });
    }
  };

  const handleToPin = () => {
    if (!bookInfoForPin || isPendingBookInfoForPin || isErrorBookInfoForPin) {
      Toast.show({
        type: "error",
        text1: `핀을 위한 책 조회에 실패했어요. (${bookInfoForPinError?.code})`,
      });
      return;
    }

    setPinInfo({ bookInfo: bookInfoForPin, content: post.content });
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
      <Pressable
        style={styles.container}
        onLongPress={handleOpenOption}
        disabled={post.isLocked}
      >
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
          postType={post.postType}
          likeCount={post.likeCount}
          commentCount={post.commentCount}
          handlePressLike={handlePressLike}
          handleOpenComment={handleOpenComment}
          handleOpenPinModal={handleOpenPinModal}
        />
        {post.isLocked && (
          <BlurView intensity={15} tint="dark" style={styles.blur} />
        )}
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
        isPending={
          isPendingBookInfoForPin ||
          isPendingDeleteRoomRecord ||
          isPendingDeleteRoomVote
        }
        handleCloseModal={handleCloseModal}
        handleDelete={handleDelete}
        handleToPin={handleToPin}
      />
      <LoadingOverlay
        visible={
          isPendingDeleteRoomRecord ||
          isPendingDeleteRoomVote ||
          isPendingReportRoomRecord ||
          isPendingReportRoomVote
        }
        label={
          isPendingReportRoomRecord || isPendingReportRoomVote
            ? "신고하는 중이에요"
            : "삭제하는 중이에요"
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 16,
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
  blur: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },
});
