import { Image, Pressable, StyleSheet } from "react-native";

import { colors } from "@theme/token";

import { BottomSheetBookItemType } from "../..";
import AppText from "../../../app-text";

interface BottomSheetBookItemProps {
  bookItem: BottomSheetBookItemType;
  handleSelectBook: (isbn: BottomSheetBookItemType) => void;
}

export default function BottomSheetBookItem({
  bookItem,
  handleSelectBook,
}: BottomSheetBookItemProps) {
  return (
    <Pressable
      style={styles.bookItem}
      onPress={() => handleSelectBook(bookItem)}
    >
      <Image source={{ uri: bookItem.bookImageUrl }} style={styles.bookImage} />
      <AppText weight="regular" size="sm" color={colors.white} lineHeight={20}>
        {bookItem.bookTitle}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bookItem: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  bookImage: {
    width: 45,
    height: 60,
  },
});
