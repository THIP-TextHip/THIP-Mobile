import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import {
  useGetRoomDetailQuery,
  useLeaveRoomMutation,
  useReportRoomMutation,
} from "@apis/room";
import {
  AppText,
  GroupInfo,
  LoadingIndicator,
  LoadingOverlay,
} from "@shared/ui";
import { getCurrentDate, parseStringToDate } from "@shared/utils";
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
  const { leaveRoom, isPendingLeaveRoom } = useLeaveRoomMutation();
  const { reportRoom, isPendingReportRoom } = useReportRoomMutation();

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

  const handleReportGroup = () => {
    if (isPendingReportRoom || !roomDetailData) return;

    // 바텀시트를 먼저 닫아야 LoadingOverlay가 가려지지 않는다.
    setIsBottomSheetVisible(false);
    reportRoom(
      { roomId: roomDetailData.roomId },
      {
        onSuccess: () => {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.push("/group");
          }
        },
      },
    );
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setModalType(null);
  };

  const handleModalAccept = () => {
    if (!roomDetailData) return;
    handleCloseModal();
    // TODO: 서버에 삭제 요청
    if (modalType === "delete") {
      Toast.show({
        type: "default",
        text1: "모임방을 성공적으로 삭제했어요.",
      });
      // TODO: 성공했을 때만 사용되도록
      if (router.canGoBack()) {
        router.back();
      } else {
        router.push("/group");
      }
    }
    if (modalType === "leave") {
      if (isPendingLeaveRoom) return;
      leaveRoom(
        { roomId: roomDetailData.roomId },
        {
          onSuccess: () => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.push("/group");
            }
          },
        },
      );
    }
  };

  const disabledHeaderOption =
    !roomDetailData || isPendingRoomDetail || isErrorRoomDetail;

  useEffect(() => {
    const progressEndDate = roomDetailData?.progressEndDate;

    if (!progressEndDate) return;

    const endDate = parseStringToDate(progressEndDate);

    if (!endDate) return;

    const { currentYear, currentMonth, currentDay } = getCurrentDate();

    const today = new Date(currentYear, currentMonth - 1, currentDay);

    if (endDate < today) {
      Toast.show({
        type: "default",
        text1: "완료된 모임방에서는 기존 기록에 대한 조회만 가능해요.",
      });
    }
  }, [roomDetailData?.progressEndDate]);

  return (
    <View style={styles.page}>
      <GroupDetailHeader
        disabled={disabledHeaderOption}
        handlePressMore={handleOpenBottomSheet}
      />
      {!roomId ? (
        <View style={styles.status}>
          <AppText weight="semibold" size="lg" color={colors.white}>
            잘못된 접근이에요. 다시 시도해 주세요.
          </AppText>
        </View>
      ) : isPendingRoomDetail ? (
        <LoadingIndicator variant="page" />
      ) : !roomDetailData || isErrorRoomDetail ? (
        <View style={styles.status}>
          <AppText weight="semibold" size="lg" color={colors.white}>
            데이터를 불러오지 못했어요.{" "}
            {roomDetailError?.code
              ? `${roomDetailError.code}`
              : "다시 시도해 주세요."}
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
            // 우선 방장도 방 삭제 대신 방나가기로 뜨도록. 시도 시 에러 메시지
            isHost={false}
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
          <LoadingOverlay
            visible={isPendingLeaveRoom || isPendingReportRoom}
            label={
              isPendingLeaveRoom
                ? "모임방에서 나가는 중이에요"
                : "모임방을 신고하는 중이에요"
            }
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
