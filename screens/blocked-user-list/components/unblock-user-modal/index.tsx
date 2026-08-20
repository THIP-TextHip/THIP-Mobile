import { StyleSheet, View } from "react-native";

import { AppText, CustomButton, CustomModal } from "@shared/ui";
import { colors } from "@theme/token";

interface UnblockUserModalProps {
  isVisible: boolean;
  handleCloseModal: () => void;
  handleUnblock: () => void;
}

export default function UnblockUserModal({
  isVisible,
  handleCloseModal,
  handleUnblock,
}: UnblockUserModalProps) {
  return (
    <CustomModal isVisible={isVisible} handleCloseModal={handleCloseModal}>
      <View style={styles.content}>
        <AppText weight="medium" size="lg" color={colors.white} lineHeight={24}>
          차단을 해제하시겠어요?
        </AppText>
        <AppText weight="regular" size="sm" color={colors.white}>
          해당 유저와 관련된 콘텐츠들이 표시됩니다.
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
              아니오
            </AppText>
          </CustomButton>
          <CustomButton size="fill" handlePress={handleUnblock}>
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
