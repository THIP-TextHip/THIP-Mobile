import { Pressable, StyleSheet } from "react-native";

import { AppText, CustomBottomSheet } from "@shared/ui";
import { colors } from "@theme/token";

interface UserBlockBottomSheetProps {
  isVisible: boolean;
  handleCloseBottomSheet: () => void;
  handleOpenModal: () => void;
}

export default function UserBlockBottomSheet({
  isVisible,
  handleCloseBottomSheet,
  handleOpenModal,
}: UserBlockBottomSheetProps) {
  return (
    <CustomBottomSheet
      isVisible={isVisible}
      handleClose={handleCloseBottomSheet}
    >
      <Pressable style={styles.bottomSheetButton} onPress={handleOpenModal}>
        <AppText weight="medium" size="base" color={colors.red}>
          차단하기
        </AppText>
      </Pressable>
    </CustomBottomSheet>
  );
}

const styles = StyleSheet.create({
  bottomSheetButton: {
    paddingHorizontal: 12,
    height: 50,
    justifyContent: "center",
  },
});
