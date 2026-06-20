import { StyleSheet, View } from "react-native";

import { useDeleteUserAccountMutation } from "@apis/user";
import { AppText, CustomButton, CustomModal } from "@shared/ui";
import { colors } from "@theme/token";

interface DeleteAccountModalProps {
  isVisible: boolean;
  handleCloseModal: () => void;
}

export default function DeleteAccountModal({
  isVisible,
  handleCloseModal,
}: DeleteAccountModalProps) {
  // TODO: isPendingDeleteUserAccount 이용히여 추후 로딩 처리
  const { deleteUserAccount, isPendingDeleteUserAccount } =
    useDeleteUserAccountMutation();
  const handleDeleteAccount = () => {
    handleCloseModal();
    if (isPendingDeleteUserAccount) return;
    deleteUserAccount();
  };

  return (
    <CustomModal isVisible={isVisible} handleCloseModal={handleCloseModal}>
      <View style={styles.content}>
        <AppText weight="medium" size="lg" color={colors.white} lineHeight={24}>
          정말로 탈퇴하시겠어요?
        </AppText>
        <AppText weight="regular" size="sm" color={colors.white}>
          ‘예’를 누르면 모든 기록이 사라져요.
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
            handlePress={handleDeleteAccount}
            disabled={isPendingDeleteUserAccount}
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
