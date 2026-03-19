import { StyleSheet, View } from "react-native";

import { AppText, CustomButton, CustomModal } from "@shared/ui";
import { colors } from "@theme/token";

interface FeedDeleteModalProps {
  isVisible: boolean;
  handleCloseModal: () => void;
  handleFeedDelete: () => void;
}

export default function FeedDeleteModal({
  isVisible,
  handleCloseModal,
  handleFeedDelete,
}: FeedDeleteModalProps) {
  return (
    <CustomModal isVisible={isVisible} handleCloseModal={handleCloseModal}>
      <View style={styles.content}>
        <AppText weight="medium" size="lg" color={colors.white} lineHeight={24}>
          이 피드를 삭제하시겠어요?
        </AppText>
        <AppText weight="regular" size="sm" color={colors.white}>
          삭제 후에는 되돌릴 수 없어요.
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
          <CustomButton size="fill" handlePress={handleFeedDelete}>
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
