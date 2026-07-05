import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import React, { useCallback, useRef, useState } from "react";
import { ActivityIndicator, Platform, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  type BookSelectableListType,
  type BookType,
  useBookSelectableListQuery,
  useSearchBookQuery,
} from "@apis/book";
import { colors } from "@theme/token";

import SearchBar from "../search-bar";
import {
  BookSearchEmpty,
  BottomSheetBookItem,
  BottomSheetTopTabBar,
} from "./components";

export interface BottomSheetBookItemType {
  bookTitle: string;
  authorName: string;
  bookImageUrl: string;
  isbn: string;
}

interface BookSearchBottomSheetProps {
  isVisible: boolean;
  handleSelectBook: (bookItem: BottomSheetBookItemType) => void;
  handleClose: () => void;
}

export default function BookSearchBottomSheet({
  isVisible,
  handleSelectBook,
  handleClose,
}: BookSearchBottomSheetProps) {
  const { bottom } = useSafeAreaInsets();
  const sheetRef = useRef<BottomSheet>(null);
  const [bookType, setBookType] = useState<BookSelectableListType>("SAVED");
  const [searchText, setSearchText] = useState("");
  const trimmedSearchText = searchText.trim();
  const isSearchMode = trimmedSearchText.length > 0;

  const {
    bookSelectableList,
    fetchNextPage: fetchNextPageSelectableList,
    hasNextPage: hasNextPageSelectableList,
    isFetchingNextPage: isFetchingNextPageSelectableList,
    isPendingBookSelectableList,
    isErrorBookSelectableList,
  } = useBookSelectableListQuery(bookType);

  const {
    searchBookList,
    fetchNextPage: fetchNextPageSearchList,
    hasNextPage: hasNextPageSearchList,
    isFetchingNextPage: isFetchingNextPageSearchBook,
    isPendingSearchBook,
    isFetchingSearchBook,
    isErrorSearchBook,
  } = useSearchBookQuery(searchText, 1, false);

  const searchResultBookList: BottomSheetBookItemType[] = searchBookList.map(
    (item: BookType) => ({
      bookTitle: item.title,
      authorName: item.authorName,
      bookImageUrl: item.imageUrl,
      isbn: item.isbn,
    }),
  );

  const bookList: BottomSheetBookItemType[] = isSearchMode
    ? searchResultBookList
    : bookSelectableList;
  const isPendingBookList = isSearchMode
    ? isPendingSearchBook
    : isPendingBookSelectableList;
  const isErrorBookList = isSearchMode
    ? isErrorSearchBook
    : isErrorBookSelectableList;
  const isFetchingBookList = isSearchMode
    ? isFetchingSearchBook
    : isFetchingNextPageSelectableList;

  const handleLoadMoreBookList = () => {
    if (isSearchMode) {
      if (!hasNextPageSearchList || isFetchingNextPageSearchBook) return;

      fetchNextPageSearchList();
      return;
    }

    if (!hasNextPageSelectableList || isFetchingNextPageSelectableList) return;

    fetchNextPageSelectableList();
  };

  const handleSetBookType = (type: BookSelectableListType) => {
    setBookType(type);
  };

  const handleChangeText = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  const handlePressBook = useCallback(
    (bookItem: BottomSheetBookItemType) => {
      handleSelectBook(bookItem);
      handleClose();
    },
    [handleSelectBook, handleClose],
  );

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
            containerStyle={[
              { backgroundColor: colors.darkgrey.dark },
              isSearchMode && { marginBottom: 20 },
            ]}
          />
          {!isSearchMode && (
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
            data={bookList}
            keyExtractor={(item: BottomSheetBookItemType) => String(item.isbn)}
            renderItem={({ item }: { item: BottomSheetBookItemType }) => (
              <BottomSheetBookItem
                bookItem={item}
                handleSelectBook={handlePressBook}
              />
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListEmptyComponent={() => (
              <BookSearchEmpty
                isPending={isPendingBookList}
                isError={isErrorBookList}
                searchText={trimmedSearchText}
                bookType={bookType}
                handleClose={handleClose}
              />
            )}
            ListFooterComponent={
              isFetchingBookList ? (
                <ActivityIndicator
                  style={styles.footer}
                  color={colors.white}
                />
              ) : null
            }
            onEndReached={handleLoadMoreBookList}
            onEndReachedThreshold={0.5}
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
  footer: {
    marginTop: 40,
  },
});
