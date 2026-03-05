import { router } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";

import { AppText, CustomButton, CustomModal } from "@shared/ui";
import { colors } from "@theme/token";
import { useState } from "react";

export default function MyFeedContents() {
  const [isModalVisible, setIsModalVisible] = useState(false);
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
        onPress={handleShowToastTest}
      >
        바텀시트
      </AppText>
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
            <CustomButton handlePress={handleCloseModal}>
              <AppText weight="semibold" size="base" color={colors.white}>
                아니오
              </AppText>
            </CustomButton>
            <CustomButton handlePress={() => console.log("예 버튼 클릭")}>
              <AppText weight="semibold" size="base" color={colors.white}>
                예
              </AppText>
            </CustomButton>
          </View>
        </View>
      </CustomModal>
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
});
