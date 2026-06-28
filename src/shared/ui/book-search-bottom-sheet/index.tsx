import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import React, { useCallback, useRef, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "@theme/token";

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

// TODO: 서버 제공 타입으로 변경
export interface FeedBookItemType {
  bookTitle: string;
  authorName: string;
  bookImageUrl: string;
  isbn: string;
}

interface BookSearchBottomSheetProps {
  isVisible: boolean;
  handleSelectBook: (bookItem: FeedBookItemType) => void;
  handleClose: () => void;
}

export default function BookSearchBottomSheet({
  isVisible,
  handleSelectBook,
  handleClose,
}: BookSearchBottomSheetProps) {
  const { bottom } = useSafeAreaInsets();
  const sheetRef = useRef<BottomSheet>(null);

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

  const handlePressBook = useCallback(
    (bookItem: FeedBookItemType) => {
      handleSelectBook(bookItem);
      handleClose();
    },
    [handleSelectBook, handleClose],
  );

  // TODO: 서버에서 받아온 값으로 수정. 로직도 약간 수정 필요.
  const searchedBookList =
    searchText.trim() !== ""
      ? DUMMY_SEARCHED_BOOK_LIST_BOTTOM_SHEET
      : bookType === "SAVED"
        ? DUMMY_SAVED_BOOK_LIST_BOTTOM_SHEET
        : DUMMY_GROUP_BOOK_LIST_BOTTOM_SHEET;

  return (
    isVisible && (
      <GestureHandlerRootView style={styles.backdrop}>
        <BottomSheet
          onClose={handleClose}
          ref={sheetRef}
          snapPoints={["65%"]}
          enableDynamicSizing={false}
          enablePanDownToClose
          backdropComponent={(props) => (
            <>
              <BlurView
                intensity={15}
                tint="dark"
                style={[styles.backdrop, !isVisible && { display: "none" }]}
                pointerEvents="none"
              />
              <BottomSheetBackdrop
                {...props}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
                pressBehavior="close"
              />
            </>
          )}
          style={styles.container}
          backgroundStyle={styles.sheetBackground}
          handleComponent={null}
        >
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
          <BottomSheetFlatList
            contentContainerStyle={[
              styles.list,
              {
                paddingBottom:
                  Platform.OS === "ios" ? bottom + 20 : bottom + 30,
              },
            ]}
            data={searchedBookList}
            keyExtractor={(item: FeedBookItemType) => String(item.isbn)}
            renderItem={({ item }: { item: FeedBookItemType }) => (
              <BottomSheetBookItem
                bookItem={item}
                handleSelectBook={handlePressBook}
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
        </BottomSheet>
      </GestureHandlerRootView>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  sheetBackground: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: colors.darkgrey.main,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(18, 18, 18, 0.30)",
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
