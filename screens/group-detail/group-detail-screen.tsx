import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import { useGetRoomDetailQuery } from "@apis/room";
import { AppText, GroupInfo } from "@shared/ui";
import { colors } from "@theme/token";

import {
  DailyGreetingButton,
  GroupBook,
  GroupDetailBottomSheet,
  GroupDetailHeader,
  GroupDetailModal,
  RecordBookOverview,
  VotesCarousel,
} from "./components";

export default function GroupDetailScreen() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const { bottom } = useSafeAreaInsets();
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState<"delete" | "leave" | null>(null);

  const {
    roomDetailData,
    isPendingRoomDetail,
    isErrorRoomDetail,
    roomDetailError,
    refetchRoomDetail,
    isRefetchingRoomDetail,
  } = useGetRoomDetailQuery(roomId);

  const handleToReadingMateList = () => {
    router.push({
      pathname: "/reading-mate/[roomId]",
      params: { roomId: String(roomId) },
    });
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

  const disabledHeaderOption =
    !roomDetailData || isPendingRoomDetail || isErrorRoomDetail;

  return (
    <View style={styles.page}>
      <GroupDetailHeader
        disabled={disabledHeaderOption}
        handlePressMore={handleOpenBottomSheet}
      />
      {isPendingRoomDetail ? (
        <View style={styles.status}>
          <ActivityIndicator size="large" color={colors.white} />
        </View>
      ) : !roomDetailData || isErrorRoomDetail ? (
        <View style={styles.status}>
          <AppText weight="semibold" size="lg" color={colors.white}>
            데이터를 불러오지 못했어요 ({roomDetailError?.code})
          </AppText>
        </View>
      ) : (
        <>
          <ScrollView
            contentContainerStyle={{ paddingBottom: bottom + 20 }}
            refreshControl={
              <RefreshControl
                refreshing={isRefetchingRoomDetail}
                onRefresh={refetchRoomDetail}
                tintColor={colors.white}
                colors={[colors.white]}
              />
            }
          >
            <GroupInfo
              roomId={roomDetailData.roomId}
              roomName={roomDetailData.roomName}
              roomImageUrl={roomDetailData.roomImageUrl}
              isPublic={roomDetailData.isPublic}
              progressStartDate={roomDetailData.progressStartDate}
              progressEndDate={roomDetailData.progressEndDate}
              category={roomDetailData.category}
              categoryColor={roomDetailData.categoryColor}
              roomDescription={roomDetailData.roomDescription}
              memberCount={roomDetailData.memberCount}
              recruitCount={roomDetailData.recruitCount}
              onPressReadingMate={handleToReadingMateList}
            />
            <View style={styles.content}>
              <GroupBook
                isbn={roomDetailData.isbn}
                bookTitle={roomDetailData.bookTitle}
                authorName={roomDetailData.authorName}
              />
              <RecordBookOverview
                roomId={roomDetailData.roomId}
                currentPage={roomDetailData.currentPage}
                userPercentage={roomDetailData.userPercentage}
              />
              <DailyGreetingButton roomId={roomDetailData.roomId} />
              <VotesCarousel
                roomId={roomDetailData.roomId}
                currentVotes={roomDetailData.currentVotes}
              />
            </View>
          </ScrollView>
          <GroupDetailBottomSheet
            isHost={roomDetailData.isHost}
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
        </>
      )}
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
  status: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
