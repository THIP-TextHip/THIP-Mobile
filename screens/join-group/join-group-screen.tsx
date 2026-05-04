import {
  type NavigationProp,
  type ParamListBase,
  useNavigation,
  usePreventRemove,
} from "@react-navigation/native";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  BackHandler,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import {
  CancelJoinModal,
  FinishRecruitingModal,
  JoinButton,
  JoinGroupBook,
  JoinGroupHeader,
  JoinGroupInfo,
  JoinPassword,
  RecommendGroupSection,
} from "./components";
import { DUMMY_JOIN_GROUP_INFO } from "./constants";

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
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { bottom } = useSafeAreaInsets();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);

  usePreventPasswordOverlayNavigation(isPasswordOpen, navigation);

  // TODO: 추후 서버에서 데이터 가져오기. url 파라미터의 roomId 이용
  const {
    isHost,
    isJoining,
    roomId,
    roomName,
    roomImageUrl,
    isPublic,
    progressStartDate,
    progressEndDate,
    recruitEndDate,
    category,
    categoryColor,
    roomDescription,
    memberCount,
    recruitCount,
    isbn,
    bookImageUrl,
    bookTitle,
    authorName,
    bookDescription,
    publisher,
    recommendRooms,
  } = DUMMY_JOIN_GROUP_INFO;

  const isRecruitingFull = memberCount === recruitCount;

  const handlePressJoinButton = useCallback(() => {
    if (isRecruitingFull) {
      Toast.show({
        type: "default",
        text1: "모임방 인원이 다 찼어요.",
      });
      return;
    }
    // TODO: 모집 마감 및 참여 취소 모달 추가 필요 / roomId로 신청 및 해제
    if (isHost) {
      setIsFinishModalOpen(true);
    } else if (isJoining) {
      setIsCancelModalOpen(true);
    } else if (!isPublic) {
      setIsPasswordOpen(true);
    } else {
      Toast.show({
        type: "default",
        text1: "모임방 참여가 완료되었어요!",
      });
    }
  }, [isHost, isJoining, isPublic, isRecruitingFull]);

  const handleCloseCancelModal = useCallback(() => {
    setIsCancelModalOpen(false);
  }, []);

  const handleCancelJoin = useCallback(() => {
    setIsCancelModalOpen(false);
    router.push("/group");
    Toast.show({
      type: "default",
      text1: "모임방 참여가 취소되었어요! 다른 방을 찾아보세요.",
    });
  }, []);

  const handleCloseFinishModal = useCallback(() => {
    setIsFinishModalOpen(false);
  }, []);

  // TODO: 서버에 요청 성공 시 토스트 띄우고 모임방 상세 페이지로 이동
  const handleFinishRecruiting = useCallback(() => {
    setIsFinishModalOpen(false);
    Toast.show({
      type: "default",
      text1: "독서메이트 모집을 성공적으로 마감했어요.",
    });
  }, []);

  const handleClosePassword = useCallback(() => {
    setIsPasswordOpen(false);
  }, []);

  return (
    <View style={styles.page}>
      <JoinGroupHeader />
      <ScrollView contentContainerStyle={{ paddingBottom: bottom + 90 }}>
        <JoinGroupInfo
          roomName={roomName}
          roomImageUrl={roomImageUrl}
          isPublic={isPublic}
          progressStartDate={progressStartDate}
          progressEndDate={progressEndDate}
          recruitEndDate={recruitEndDate}
          category={category}
          categoryColor={categoryColor}
          roomDescription={roomDescription}
          memberCount={memberCount}
          recruitCount={recruitCount}
        />
        <View style={styles.wrapper}>
          <View style={styles.bookWrapper}>
            <JoinGroupBook
              isbn={isbn}
              bookImageUrl={bookImageUrl}
              bookTitle={bookTitle}
              authorName={authorName}
              bookDescription={bookDescription}
              publisher={publisher}
            />
          </View>
          {recommendRooms.length !== 0 && (
            <RecommendGroupSection recommendRooms={recommendRooms} />
          )}
        </View>
      </ScrollView>
      <JoinButton
        isHost={isHost}
        isJoining={isJoining}
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
        roomId={roomId}
        isOpen={isPasswordOpen}
        handleClose={handleClosePassword}
      />
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
});
