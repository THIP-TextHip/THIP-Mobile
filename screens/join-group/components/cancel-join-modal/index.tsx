import { StyleSheet, View } from "react-native";

import { AppText, CustomButton, CustomModal } from "@shared/ui";
import { colors } from "@theme/token";

interface CancelJoinModalProps {
  isVisible: boolean;
  handleClose: () => void;
  handleCancelJoin: () => void;
}

export default function CancelJoinModal({
  isVisible,
  handleClose,
  handleCancelJoin,
}: CancelJoinModalProps) {
  return (
    <CustomModal isVisible={isVisible} handleCloseModal={handleClose}>
      <View style={styles.content}>
        <AppText weight="medium" size="lg" color={colors.white} lineHeight={24}>
          모임방 참여를 취소하시겠어요?
        </AppText>
        <AppText weight="regular" size="sm" color={colors.white}>
          지금 취소해도, 활동 시작 전에 다시 참여 가능해요.
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
          <CustomButton size="fill" handlePress={handleCancelJoin}>
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
