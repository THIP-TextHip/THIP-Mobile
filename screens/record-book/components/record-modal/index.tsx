import { StyleSheet, View } from "react-native";

import { AppText, CustomButton, CustomModal } from "@shared/ui";
import { colors } from "@theme/token";

interface RecordModalProps {
  modalType: "pin" | "delete" | null;
  isVisible: boolean;
  handleCloseModal: () => void;
  handleDelete: () => void;
  handleToPin: () => void;
}

export default function RecordModal({
  modalType,
  isVisible,
  handleCloseModal,
  handleDelete,
  handleToPin,
}: RecordModalProps) {
  return (
    <CustomModal isVisible={isVisible} handleCloseModal={handleCloseModal}>
      <View style={styles.content}>
        <AppText weight="medium" size="lg" color={colors.white} lineHeight={24}>
          {modalType === "delete"
            ? "이 기록을 삭제하시겠어요?"
            : "이 기록을 피드에 핀할까요?"}
        </AppText>
        <AppText weight="regular" size="sm" color={colors.white}>
          {modalType === "delete"
            ? "삭제 후에는 되돌릴 수 없어요."
            : "핀하면 내 피드에 글을 옮길 수 있어요."}
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
          <CustomButton
            size="fill"
            handlePress={modalType === "delete" ? handleDelete : handleToPin}
          >
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
