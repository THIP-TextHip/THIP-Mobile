import { useCallback, useState } from "react";
import { FlatList, StyleSheet, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "@theme/token";

import CustomBottomSheet from "../custom-bottom-sheet";
import SearchBar from "../search-bar";
import {
  BookSearchEmpty,
  BottomSheetBookItem,
  BottomSheetTopTabBar,
} from "./components";
import {
  DUMMY_GROUP_BOOK_LIST_BOTTOM_SHEET,
  DUMMY_SAVED_BOOK_LIST_BOTTOM_SHEET,
  DUMMY_SEARCHED_BOOK_LIST_BOTTOM_SHEET,
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
  const { bottom } = useSafeAreaInsets();

  const [bookType, setBookType] = useState<"SAVED" | "JOINING">("SAVED");
  const [searchText, setSearchText] = useState("");

  const handleSetBookType = (type: "SAVED" | "JOINING") => {
    setBookType(type);
  };

  const handleChangeText = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  const handleSearch = useCallback(() => {
    if (searchText.trim() === "") return;
    console.log(searchText, " 검색");
  }, [searchText]);

  const handlePressBookItem = useCallback((isbn: string) => {
    console.log(isbn, " 책 클릭");
  }, []);

  // TODO: 서버에서 받아온 값으로 수정. 로직도 약간 수정 필요.
  const searchedBookList =
    searchText.trim() !== ""
      ? DUMMY_SEARCHED_BOOK_LIST_BOTTOM_SHEET
      : bookType === "SAVED"
        ? DUMMY_SAVED_BOOK_LIST_BOTTOM_SHEET
        : DUMMY_GROUP_BOOK_LIST_BOTTOM_SHEET;

  return (
    <CustomBottomSheet
      isVisible={isVisible}
      handleClose={handleClose}
      containerPaddingBottom={0}
    >
      <View style={[styles.container, { height: height * 0.65 }]}>
        <SearchBar
          value={searchText}
          placeholder="책 제목을 검색해보세요."
          setValue={handleChangeText}
          handleSearch={handleSearch}
          containerStyle={{ backgroundColor: colors.darkgrey.dark }}
        />
        {searchText.trim() === "" && (
          <BottomSheetTopTabBar
            bookType={bookType}
            handleSetBookType={handleSetBookType}
          />
        )}
        <FlatList
          contentContainerStyle={[styles.list, { paddingBottom: bottom + 20 }]}
          data={searchedBookList}
          keyExtractor={(item) => String(item.bookId)}
          renderItem={({ item }) => (
            <BottomSheetBookItem
              bookTitle={item.bookTitle}
              bookImageUrl={item.bookImageUrl}
              isbn={item.isbn}
              handlePressBookItem={handlePressBookItem}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={() => (
            <BookSearchEmpty
              searchText={searchText.trim()}
              bookType={bookType}
              handleClose={handleClose}
            />
          )}
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
