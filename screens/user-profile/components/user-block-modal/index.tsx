import { StyleSheet, View } from "react-native";

import { AppText, CustomButton, CustomModal } from "@shared/ui";
import { colors } from "@theme/token";

interface UserBlockModalProps {
  isVisible: boolean;
  handleCloseModal: () => void;
  handleBlock: () => void;
}

export default function UserBlockModal({
  isVisible,
  handleCloseModal,
  handleBlock,
}: UserBlockModalProps) {
  return (
    <CustomModal isVisible={isVisible} handleCloseModal={handleCloseModal}>
      <View style={styles.content}>
        <AppText weight="medium" size="lg" color={colors.white} lineHeight={24}>
          해당 유저를 차단하시겠어요?
        </AppText>
        <AppText weight="regular" size="sm" color={colors.white}>
          차단 후에는 관련 콘텐츠들이 보이지 않아요.
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
          <CustomButton size="fill" handlePress={handleBlock}>
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
