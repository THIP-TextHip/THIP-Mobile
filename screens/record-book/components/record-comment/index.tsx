import { StyleSheet, View } from "react-native";

import { AppText, CustomBottomSheet } from "@shared/ui";
import { colors } from "@theme/token";

interface RecordCommentProps {
  isVisible: boolean;
  handleClose: () => void;
}

export default function RecordComment({
  isVisible,
  handleClose,
}: RecordCommentProps) {
  return (
    <CustomBottomSheet isVisible={isVisible} handleClose={handleClose}>
      <View style={styles.bottomSheetButton}>
        <AppText weight="medium" size="base" color={colors.white}>
          댓글 바텀시트
        </AppText>
      </View>
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
