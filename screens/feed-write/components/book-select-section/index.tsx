import { Image, Pressable, StyleSheet, View } from "react-native";

import { IcSearch } from "@images/icons";
import { AppText, BottomSheetBookItemType, CustomButton } from "@shared/ui";
import { colors } from "@theme/token";

interface BookSelectSectionProps {
  feedBook: BottomSheetBookItemType | null;
  handleOpenBottomSheet: () => void;
}

export default function BookSelectSection({
  feedBook,
  handleOpenBottomSheet,
}: BookSelectSectionProps) {
  return (
    <View style={styles.section}>
      <AppText weight="semibold" size="lg" color={colors.white} lineHeight={24}>
        책 선택
      </AppText>
      {feedBook ? (
        <View style={styles.bookItem}>
          <Image
            source={{ uri: feedBook.bookImageUrl }}
            style={styles.bookImage}
          />
          <View style={styles.textWrapper}>
            <AppText
              weight="semibold"
              size="sm"
              color={colors.white}
              lineHeight={24}
            >
              {feedBook.bookTitle}
            </AppText>
            <AppText
              weight="medium"
              size="xs"
              color={colors.grey[200]}
              lineHeight={20}
            >
              {feedBook.authorName} 저
            </AppText>
          </View>
          <Pressable
            style={styles.changeButton}
            onPress={handleOpenBottomSheet}
          >
            <AppText weight="medium" size="sm" color={colors.grey[100]}>
              변경
            </AppText>
          </Pressable>
        </View>
      ) : (
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 12,
    paddingHorizontal: 20,
  },
  bookSearchButtonContent: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  bookItem: {
    flexDirection: "row",
    gap: 12,
  },
  bookImage: {
    width: 60,
    height: 80,
  },
  textWrapper: {
    gap: 8,
  },
  changeButton: {
    position: "absolute",
    right: 0,
    bottom: 0,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.grey[300],
  },
});
