import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

import { AppText, CustomButton, CustomModal } from "@shared/ui";
import { colors } from "@theme/token";

interface LogoutModalProps {
  isVisible: boolean;
  handleCloseModal: () => void;
}

export default function LogoutModal({
  isVisible,
  handleCloseModal,
}: LogoutModalProps) {
  // TODO: 로그아웃 연동
  const handleLogout = () => {
    handleCloseModal();
    router.push("/login");
  };

  return (
    <CustomModal isVisible={isVisible} handleCloseModal={handleCloseModal}>
      <View style={styles.content}>
        <AppText weight="medium" size="lg" color={colors.white} lineHeight={24}>
          로그아웃
        </AppText>
        <AppText weight="regular" size="sm" color={colors.white}>
          또 THIP 해주실거죠?
        </AppText>
        <View style={styles.buttonWrapper}>
          <CustomButton
            type="cancel"
            size="fill"
            handlePress={handleCloseModal}
          >
            <AppText
              weight="semibold"
              size="base"
              color={colors.white}
              lineHeight={24}
            >
              취소
            </AppText>
          </CustomButton>
          <CustomButton size="fill" handlePress={handleLogout}>
            <AppText
              weight="semibold"
              size="base"
              color={colors.white}
              lineHeight={24}
            >
              확인
            </AppText>
          </CustomButton>
        </View>
      </View>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 30,
  },
  buttonWrapper: {
    flexDirection: "row",
    gap: 20,
  },
});
