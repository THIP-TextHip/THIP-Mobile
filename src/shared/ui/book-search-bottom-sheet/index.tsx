import { useCallback, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";

import { colors } from "@theme/token";

import AppText from "../app-text";
import CustomBottomSheet from "../custom-bottom-sheet";
import SearchBar from "../search-bar";
import { BookSearchTopTabBar } from "./components";
import {
  DUMMY_GROUP_BOOK_LIST_BOTTOM_SHEET,
  DUMMY_SAVED_BOOK_LIST_BOTTOM_SHEET,
} from "./constants";

interface BookSearchBottomSheetProps {
  isVisible: boolean;
  handleClose: () => void;
}

export default function BookSearchBottomSheet({
  isVisible,
  handleClose,
}: BookSearchBottomSheetProps) {
  const { height } = useWindowDimensions();
  const [bookType, setBookType] = useState<"SAVED" | "JOINING">("SAVED");
  const [searchText, setSearchText] = useState("");

  const handleSetBookType = (type: "SAVED" | "JOINING") => {
    setBookType(type);
  };

  const handleChangeText = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  const handleSearch = useCallback(() => {
    console.log(searchText, " 검색");
  }, [searchText]);

  const handlePressBookItem = useCallback((isbn: string) => {
    console.log(isbn, " 책 클릭");
  }, []);

  const BookItem = ({
    bookTitle,
    bookImageUrl,
    isbn,
  }: {
    bookTitle: string;
    bookImageUrl: string;
    isbn: string;
  }) => {
    return (
      <Pressable onPress={() => handlePressBookItem(isbn)}>
        <AppText color={colors.white}>{bookTitle}</AppText>
      </Pressable>
    );
  };

  return (
    <CustomBottomSheet isVisible={isVisible} handleClose={handleClose}>
      <View style={[styles.container, { height: height * 0.65 }]}>
        <SearchBar
          value={searchText}
          placeholder="책 제목을 검색해보세요."
          setValue={handleChangeText}
          handleSearch={handleSearch}
          containerStyle={{ backgroundColor: colors.darkgrey.dark }}
          autoFocus={true}
        />
        <BookSearchTopTabBar
          bookType={bookType}
          handleSetBookType={handleSetBookType}
        />
        <FlatList
          contentContainerStyle={styles.list}
          data={
            bookType === "SAVED"
              ? DUMMY_SAVED_BOOK_LIST_BOTTOM_SHEET
              : DUMMY_GROUP_BOOK_LIST_BOTTOM_SHEET
          }
          keyExtractor={(item) => String(item.bookId)}
          renderItem={({ item }) => (
            <BookItem
              bookTitle={item.bookTitle}
              bookImageUrl={item.bookImageUrl}
              isbn={item.isbn}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </CustomBottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  list: {
    gap: 12,
  },
  separator: {
    height: 1,
    backgroundColor: "#525252",
    marginTop: 12,
  },
});
