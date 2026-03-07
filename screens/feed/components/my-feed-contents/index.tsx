import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

import {
  AppText,
  CustomBottomSheet,
  CustomButton,
  CustomModal,
} from "@shared/ui";
import { colors } from "@theme/token";

export default function MyFeedContents() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  // TODO: 토스트 메시지 테스트용. 삭제 예정
  const handleShowToastTest = () => {
    Toast.show({
      type: "default",
      text1:
        "Hello, 엄청 긴 텍스트, 엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트엄청 긴 텍스트",
    });
  };

  // TODO: 모달 컴포넌트 테스트용. 삭제 예정
  const handleOpenModal = () => {
    setIsModalVisible(true);
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  // TODO: 바텀시트 컴포넌트 테스트용
  const handleOpenBottomSheet = () => {
    setIsBottomSheetVisible(true);
  };
  const handleCloseBottomSheet = () => {
    setIsBottomSheetVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <AppText
        weight="extrabold"
        size="lg"
        color={colors.purple.sub}
        // TODO: 로그인 페이지 테스트를 위한 것이니 추후 제거 필요
        onPress={() => router.push("/login")}
      >
        로그인으로
      </AppText>
      {/* TODO: 토스트 메시지 테스트를 위한 부분 추후 제거 필요 */}
      <AppText
        weight="extrabold"
        size="lg"
        color={colors.purple.sub}
        onPress={handleShowToastTest}
      >
        토스트 메시지
      </AppText>
      {/* TODO: 모달 컴포넌트 테스트를 위한 부분 추후 제거 필요 */}
      <AppText
        weight="extrabold"
        size="lg"
        color={colors.purple.sub}
        onPress={handleOpenModal}
      >
        모달 컴포넌트
      </AppText>
      {/* TODO: 바텀시트 테스트를 위한 부분 추후 제거 필요 */}
      <AppText
        weight="extrabold"
        size="lg"
        color={colors.purple.sub}
        onPress={handleOpenBottomSheet}
      >
        바텀시트
      </AppText>
      {/* TODO: 각 페이지에 필요한 모달은 components 하위에 생성. ex) DeleteModal */}
      <CustomModal
        isVisible={isModalVisible}
        handleCloseModal={handleCloseModal}
      >
        <View style={styles.modalContentWrapper}>
          <AppText weight="medium" size="lg" color={colors.white}>
            이 피드를 삭제하시겠어요?
          </AppText>
          <AppText weight="regular" size="sm" color={colors.white}>
            삭제 후에는 되돌릴 수 없어요.
          </AppText>
          <View style={styles.modalButtonWrapper}>
            <CustomButton
              type="cancel"
              size="fill"
              handlePress={handleCloseModal}
            >
              <AppText
                weight="semibold"
                size="base"
                color={colors.white}
                style={{ lineHeight: 24 }}
              >
                아니오
              </AppText>
            </CustomButton>
            <CustomButton
              size="fill"
              handlePress={() => console.log("'예' 버튼 클릭")}
            >
              <AppText
                weight="semibold"
                size="base"
                color={colors.white}
                style={{ lineHeight: 24 }}
              >
                예
              </AppText>
            </CustomButton>
          </View>
        </View>
      </CustomModal>
      <CustomBottomSheet
        isVisible={isBottomSheetVisible}
        handleClose={handleCloseBottomSheet}
      >
        <View style={styles.bottomSheetContentWrapper}>
          <Pressable
            style={styles.bottomSheetButton}
            onPress={() => console.log("수정하기")}
          >
            <AppText weight="medium" size="base" color={colors.white}>
              수정하기
            </AppText>
          </Pressable>
          <View style={styles.bottomSheetDivider} />
          <Pressable
            style={styles.bottomSheetButton}
            onPress={() => console.log("삭제하기")}
          >
            <AppText weight="medium" size="base" color={colors.red}>
              삭제하기
            </AppText>
          </Pressable>
        </View>
      </CustomBottomSheet>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    gap: 40,
  },
  // TODO: 모달 테스트용. 추후 삭제 예정
  modalContentWrapper: {
    gap: 30,
  },
  modalButtonWrapper: {
    flexDirection: "row",
    gap: 20,
  },

  // TODO: 바텀시트 테스트용. 삭제 예정
  bottomSheetContentWrapper: {
    gap: 8,
  },
  bottomSheetDivider: {
    backgroundColor: "#525252",
    width: "100%",
    height: 1,
  },
  bottomSheetButton: {
    paddingHorizontal: 12,
    height: 50,
    justifyContent: "center",
  },
});
