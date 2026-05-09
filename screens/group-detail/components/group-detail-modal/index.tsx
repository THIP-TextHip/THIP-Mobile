import { StyleSheet, View } from "react-native";

import { AppText, CustomButton, CustomModal } from "@shared/ui";
import { colors } from "@theme/token";

interface GroupDetailModalProps {
  type: "delete" | "leave" | null;
  isVisible: boolean;
  handleCloseModal: () => void;
  handleAccept: () => void;
}

export default function GroupDetailModal({
  type,
  isVisible,
  handleCloseModal,
  handleAccept,
}: GroupDetailModalProps) {
  if (!type) return;
  const description =
    type === "delete"
      ? "방을 삭제하게 되면\n독서메이트들과의 추억이 사라집니다."
      : "방을 나가시게 되면\n독서메이트들과의 추억이 사라집니다.";

  return (
    <CustomModal isVisible={isVisible} handleCloseModal={handleCloseModal}>
      <View style={styles.content}>
        <AppText weight="medium" size="lg" color={colors.white} lineHeight={24}>
          모임방을 {type === "delete" ? "삭제하" : "나가"}시겠어요?
        </AppText>
        <AppText weight="regular" size="sm" color={colors.white}>
          {description}
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
          <CustomButton size="fill" handlePress={handleAccept}>
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
