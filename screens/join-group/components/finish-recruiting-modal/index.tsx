import { StyleSheet, View } from "react-native";

import { AppText, CustomButton, CustomModal } from "@shared/ui";
import { colors } from "@theme/token";

interface FinishRecruitingModalProps {
  isVisible: boolean;
  handleClose: () => void;
  handleFinishRecruiting: () => void;
}

export default function FinishRecruitingModal({
  isVisible,
  handleClose,
  handleFinishRecruiting,
}: FinishRecruitingModalProps) {
  return (
    <CustomModal isVisible={isVisible} handleCloseModal={handleClose}>
      <View style={styles.content}>
        <AppText weight="medium" size="lg" color={colors.white} lineHeight={24}>
          정말로 탈퇴하시겠어요?
        </AppText>
        <AppText weight="regular" size="sm" color={colors.white}>
          {`‘예’를 누르면 모든 기록이 사라져요.\n지금 바로 모임방 활동을 시작할 수 있어요.`}
        </AppText>
        <View style={styles.buttonWrapper}>
          <CustomButton type="cancel" size="fill" handlePress={handleClose}>
            <AppText
              weight="semibold"
              size="base"
              color={colors.white}
              lineHeight={24}
            >
              아니오
            </AppText>
          </CustomButton>
          <CustomButton size="fill" handlePress={handleFinishRecruiting}>
            <AppText
              weight="semibold"
              size="base"
              color={colors.white}
              lineHeight={24}
            >
              예
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
