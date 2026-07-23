import {
  type NavigationProp,
  type ParamListBase,
  useNavigation,
  usePreventRemove,
} from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import {
  useChangeRoomJoinStatusMutation,
  useCloseRoomRecruitingMutation,
  useGetRecruitingRoomDetailQuery,
} from "@apis/room";
import { AppText, GroupInfo } from "@shared/ui";
import { colors } from "@theme/token";

import {
  CancelJoinModal,
  FinishRecruitingModal,
  JoinButton,
  JoinGroupBook,
  JoinGroupHeader,
  JoinPassword,
  RecommendGroupSection,
} from "./components";

function usePreventPasswordOverlayNavigation(
  isPasswordOpen: boolean,
  navigation: NavigationProp<ParamListBase>,
) {
  usePreventRemove(isPasswordOpen, () => {});

  useEffect(() => {
    const gestureEnabled = !isPasswordOpen;
    const parentNavigation = navigation.getParent();

    navigation.setOptions({ gestureEnabled });
    parentNavigation?.setOptions({ gestureEnabled });

    return () => {
      navigation.setOptions({ gestureEnabled: true });
      parentNavigation?.setOptions({ gestureEnabled: true });
    };
  }, [isPasswordOpen, navigation]);

  useEffect(() => {
    if (!isPasswordOpen || Platform.OS !== "android") return;

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true,
    );

    return () => subscription.remove();
  }, [isPasswordOpen]);
}

export default function JoinGroupScreen() {
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { bottom } = useSafeAreaInsets();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);

  usePreventPasswordOverlayNavigation(isPasswordOpen, navigation);

  const {
    recruitingRoomDetailData,
    isPendingRecruitingRoomDetail,
    isErrorRecruitingRoomDetail,
    recruitingRoomDetailError,
    refetchRecruitingRoomDetail,
    isRefetchingRecruitingRoomDetail,
  } = useGetRecruitingRoomDetailQuery(roomId);
  const { changeRoomJoinStatus, isPendingChangeRoomJoinStatus } =
    useChangeRoomJoinStatusMutation();
  const { closeRoomRecruiting, isPendingCloseRoomRecruiting } =
    useCloseRoomRecruitingMutation();

  const isRecruitingFull =
    recruitingRoomDetailData?.memberCount ===
    recruitingRoomDetailData?.recruitCount;

  const handlePressJoinButton = useCallback(() => {
    if (isPendingChangeRoomJoinStatus) return;
    if (isRecruitingFull) {
      Toast.show({
        type: "default",
        text1: "모임방 인원이 다 찼어요.",
      });
      return;
    }
    if (recruitingRoomDetailData?.isHost) {
      setIsFinishModalOpen(true);
    } else if (recruitingRoomDetailData?.isJoining) {
      setIsCancelModalOpen(true);
    } else if (!recruitingRoomDetailData?.isPublic) {
      setIsPasswordOpen(true);
    } else {
      changeRoomJoinStatus({
        roomId: recruitingRoomDetailData.roomId,
        type: "join",
      });
    }
  }, [
    recruitingRoomDetailData,
    isRecruitingFull,
    isPendingChangeRoomJoinStatus,
    changeRoomJoinStatus,
  ]);

  const handleCloseCancelModal = useCallback(() => {
    setIsCancelModalOpen(false);
  }, []);

  const handleCancelJoin = useCallback(() => {
    if (!recruitingRoomDetailData || isPendingChangeRoomJoinStatus) return;
    changeRoomJoinStatus(
      {
        roomId: recruitingRoomDetailData.roomId,
        type: "cancel",
      },
      {
        onSuccess: () => {
          setIsCancelModalOpen(false);
          if (router.canGoBack()) {
            router.back();
          } else {
            router.push("/group");
          }
        },
      },
    );
  }, [
    changeRoomJoinStatus,
    recruitingRoomDetailData,
    isPendingChangeRoomJoinStatus,
  ]);

  const handleCloseFinishModal = useCallback(() => {
    setIsFinishModalOpen(false);
  }, []);

  const handleFinishRecruiting = useCallback(() => {
    if (!recruitingRoomDetailData || isPendingCloseRoomRecruiting) return;
    closeRoomRecruiting(
      { roomId: recruitingRoomDetailData.roomId },
      {
        onSettled: () => {
          setIsFinishModalOpen(false);
        },
      },
    );
  }, [
    closeRoomRecruiting,
    recruitingRoomDetailData,
    isPendingCloseRoomRecruiting,
  ]);

  const handleClosePassword = useCallback(() => {
    setIsPasswordOpen(false);
  }, []);

  return (
    <View style={styles.page}>
      <JoinGroupHeader />
      {!roomId ? (
        <View style={styles.status}>
          <AppText weight="semibold" size="lg" color={colors.white}>
            잘못된 접근이에요. 다시 시도해 주세요.
          </AppText>
        </View>
      ) : isPendingRecruitingRoomDetail ? (
        <View style={styles.status}>
          <ActivityIndicator size="large" color={colors.white} />
        </View>
      ) : !recruitingRoomDetailData || isErrorRecruitingRoomDetail ? (
        <View style={styles.status}>
          <AppText weight="semibold" size="lg" color={colors.white}>
            데이터를 불러오지 못했어요.{" "}
            {recruitingRoomDetailError?.code
              ? `(${recruitingRoomDetailError.code})`
              : "다시 시도해 주세요."}
          </AppText>
        </View>
      ) : (
        <>
          <ScrollView
            contentContainerStyle={{ paddingBottom: bottom + 90 }}
            refreshControl={
              <RefreshControl
                refreshing={isRefetchingRecruitingRoomDetail}
                onRefresh={refetchRecruitingRoomDetail}
                tintColor={colors.white}
                colors={[colors.white]}
              />
            }
          >
            <GroupInfo
              roomId={recruitingRoomDetailData.roomId}
              isRecruiting={true}
              roomName={recruitingRoomDetailData.roomName}
              roomImageUrl={recruitingRoomDetailData.roomImageUrl}
              isPublic={recruitingRoomDetailData.isPublic}
              progressStartDate={recruitingRoomDetailData.progressStartDate}
              progressEndDate={recruitingRoomDetailData.progressEndDate}
              recruitEndDate={recruitingRoomDetailData.recruitEndDate}
              category={recruitingRoomDetailData.category}
              categoryColor={recruitingRoomDetailData.categoryColor}
              roomDescription={recruitingRoomDetailData.roomDescription}
              memberCount={recruitingRoomDetailData.memberCount}
              recruitCount={recruitingRoomDetailData.recruitCount}
            />
            <View style={styles.wrapper}>
              <View style={styles.bookWrapper}>
                <JoinGroupBook
                  isbn={recruitingRoomDetailData.isbn}
                  bookImageUrl={recruitingRoomDetailData.bookImageUrl}
                  bookTitle={recruitingRoomDetailData.bookTitle}
                  authorName={recruitingRoomDetailData.authorName}
                  bookDescription={recruitingRoomDetailData.bookDescription}
                  publisher={recruitingRoomDetailData.publisher}
                />
              </View>
              {recruitingRoomDetailData.recommendRooms.length !== 0 && (
                <RecommendGroupSection
                  recommendRooms={recruitingRoomDetailData.recommendRooms}
                />
              )}
            </View>
          </ScrollView>
          <JoinButton
            isHost={recruitingRoomDetailData.isHost}
            isJoining={recruitingRoomDetailData.isJoining}
            disabled={isRecruitingFull}
            handlePressJoinButton={handlePressJoinButton}
          />
          <CancelJoinModal
            isVisible={isCancelModalOpen}
            handleClose={handleCloseCancelModal}
            handleCancelJoin={handleCancelJoin}
          />
          <FinishRecruitingModal
            isVisible={isFinishModalOpen}
            handleClose={handleCloseFinishModal}
            handleFinishRecruiting={handleFinishRecruiting}
          />
          <JoinPassword
            roomId={recruitingRoomDetailData.roomId}
            isOpen={isPasswordOpen}
            handleClose={handleClosePassword}
            changeRoomJoinStatus={changeRoomJoinStatus}
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

  wrapper: {
    gap: 40,
  },
  bookWrapper: {
    paddingHorizontal: 20,
  },
  status: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
