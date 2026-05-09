import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { GroupInfo } from "@shared/ui";

import { router } from "expo-router";
import Toast from "react-native-toast-message";
import {
  DailyGreetingButton,
  GroupBook,
  GroupDetailBottomSheet,
  GroupDetailHeader,
  GroupDetailModal,
  RecordBookOverview,
  VotesCarousel,
} from "./components";
import { DUMMY_GROUP_DETAIL } from "./constants";

export default function GroupDetailScreen() {
  const { bottom } = useSafeAreaInsets();
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"delete" | "leave" | null>(null);

  // TODO: 추후 서버에서 데이터 가져오기. url 파라미터의 roomId 이용
  const {
    isHost,
    roomId,
    roomName,
    roomImageUrl,
    isPublic,
    progressStartDate,
    progressEndDate,
    category,
    categoryColor,
    roomDescription,
    memberCount,
    recruitCount,
    isbn,
    bookTitle,
    authorName,
    currentPage,
    userPercentage,
    currentVotes,
  } = DUMMY_GROUP_DETAIL;

  const handleToReadingMateList = () => {
    console.log(roomId, "번 독서메이트 목록 페이지로 이동");
  };

  const handleOpenBottomSheet = () => {
    setIsBottomSheetVisible(true);
  };
  const handleCloseBottomSheet = () => {
    setIsBottomSheetVisible(false);
  };

  const handleDeleteGroup = () => {
    setIsModalVisible(true);
    setModalType("delete");
    setIsBottomSheetVisible(false);
  };

  const handleLeaveGroup = () => {
    setIsModalVisible(true);
    setModalType("leave");
    setIsBottomSheetVisible(false);
  };

  // TODO: 서버에 요청
  const handleReportGroup = () => {
    setIsBottomSheetVisible(false);
    Toast.show({
      type: "default",
      text1: "모임방 신고를 완료했어요.",
    });
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/group");
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setModalType(null);
  };

  // TODO: 서버에 요청
  const handleModalAccept = () => {
    handleCloseModal();
    if (modalType === "delete") {
      Toast.show({
        type: "default",
        text1: "모임방을 성공적으로 삭제했어요.",
      });
    }
    if (modalType === "leave") {
      Toast.show({
        type: "default",
        text1: "모임 나가기를 완료했어요.",
      });
    }
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push("/group");
    }
  };

  return (
    <View style={styles.page}>
      <GroupDetailHeader handlePressMore={handleOpenBottomSheet} />
      <ScrollView contentContainerStyle={{ paddingBottom: bottom + 20 }}>
        <GroupInfo
          roomId={roomId}
          roomName={roomName}
          roomImageUrl={roomImageUrl}
          isPublic={isPublic}
          progressStartDate={progressStartDate}
          progressEndDate={progressEndDate}
          category={category}
          categoryColor={categoryColor}
          roomDescription={roomDescription}
          memberCount={memberCount}
          recruitCount={recruitCount}
          onPressReadingMate={handleToReadingMateList}
        />
        <View style={styles.content}>
          <GroupBook
            isbn={isbn}
            bookTitle={bookTitle}
            authorName={authorName}
          />
          <RecordBookOverview
            roomId={roomId}
            currentPage={currentPage}
            userPercentage={userPercentage}
          />
          <DailyGreetingButton roomId={roomId} />
          <VotesCarousel currentVotes={currentVotes} />
        </View>
      </ScrollView>
      <GroupDetailBottomSheet
        isHost={isHost}
        isVisible={isBottomSheetVisible}
        handleClose={handleCloseBottomSheet}
        handleDelete={handleDeleteGroup}
        handleLeave={handleLeaveGroup}
        handleReport={handleReportGroup}
      />
      <GroupDetailModal
        type={modalType}
        isVisible={isModalVisible}
        handleCloseModal={handleCloseModal}
        handleAccept={handleModalAccept}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    gap: 20,
  },
});
