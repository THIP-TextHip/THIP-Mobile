import { StyleSheet, View } from "react-native";

import { IcSearch } from "@images/icons";
import { AppText, CustomButton } from "@shared/ui";
import { colors } from "@theme/token";

interface BookSelectSectionProps {
  handleOpenBottomSheet: () => void;
}

export default function BookSelectSection({
  handleOpenBottomSheet,
}: BookSelectSectionProps) {
  return (
    <View style={styles.section}>
      <AppText weight="semibold" size="lg" color={colors.white} lineHeight={24}>
        책 선택
      </AppText>
      <CustomButton
        containerStyle={{
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: colors.grey[300],
        }}
        handlePress={handleOpenBottomSheet}
      >
        <View style={styles.bookSearchButtonContent}>
          <IcSearch />
          <AppText weight="medium" size="base" color={colors.grey[100]}>
            검색해서 찾기
          </AppText>
        </View>
      </CustomButton>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 12,
  },
  bookSearchButtonContent: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
});
