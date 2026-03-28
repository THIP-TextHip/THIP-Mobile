import { Image, Pressable, StyleSheet } from "react-native";

import { colors } from "@theme/token";

import AppText from "../../../app-text";

interface BottomSheetBookItemProps {
  bookTitle: string;
  bookImageUrl: string;
  isbn: string;
  handlePressBookItem: (isbn: string) => void;
}

export default function BottomSheetBookItem({
  bookTitle,
  bookImageUrl,
  isbn,
  handlePressBookItem,
}: BottomSheetBookItemProps) {
  return (
    <Pressable
      style={styles.bookItem}
      onPress={() => handlePressBookItem(isbn)}
    >
      <Image source={{ uri: bookImageUrl }} style={styles.bookImage} />
      <AppText weight="regular" size="sm" color={colors.white} lineHeight={20}>
        {bookTitle}
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
