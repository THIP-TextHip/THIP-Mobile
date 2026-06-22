import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  SavedBookType,
  useChangeBookSaveStatusMutation,
  useSavedBookQuery,
} from "@apis/book";
import { IcSave, IcSaveFilled } from "@images/icons";
import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

export default function SavedBook() {
  const { height } = useWindowDimensions();
  const { bottom } = useSafeAreaInsets();

  const {
    savedBookList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPendingSavedBook,
    isErrorSavedBook,
    refetchSavedBook,
    isRefetchingSavedBook,
  } = useSavedBookQuery();
  const { changeBookSaveStatus } = useChangeBookSaveStatusMutation();

  const handleLoadMore = () => {
    if (!hasNextPage || isFetchingNextPage) return;

    fetchNextPage();
  };

  const handleToBookDetail = (isbn: string) => {
    router.push({
      pathname: "/book-detail/[isbn]",
      params: { isbn },
    });
  };

  const handlePressSaveButton = (isbn: string, isSaved: boolean) => {
    changeBookSaveStatus({ isbn, type: !isSaved });
  };

  if (isPendingSavedBook) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }

  if (isErrorSavedBook && savedBookList.length === 0) {
    return (
      <View style={styles.empty}>
        <AppText
          weight="semibold"
          size="lg"
          color={colors.white}
          lineHeight={24}
        >
          데이터를 불러오지 못했어요
        </AppText>
        <Pressable onPress={() => void refetchSavedBook()}>
          <AppText
            weight="regular"
            size="sm"
            color={colors.grey[100]}
            lineHeight={20}
          >
            다시 시도하기
          </AppText>
        </Pressable>
      </View>
    );
  }

  const SavedBookEmpty = () => {
    return (
      <View style={[styles.empty, { height: height - 300 }]}>
        <AppText
          weight="semibold"
          size="lg"
          color={colors.white}
          lineHeight={24}
        >
          아직 저장한 책이 없어요
        </AppText>
        <AppText
          weight="regular"
          size="sm"
          color={colors.grey[100]}
          lineHeight={20}
        >
          마음에 드는 책을 THIP 해보세요!
        </AppText>
      </View>
    );
  };

  const SavedBookItem = (book: SavedBookType) => {
    return (
      <View style={styles.item}>
        <Pressable
          style={styles.bookContainer}
          onPress={() => handleToBookDetail(book.isbn)}
        >
          <Image source={{ uri: book.bookImageUrl }} style={styles.image} />
          <View style={styles.textWrapper}>
            <AppText
              weight="semibold"
              size="base"
              color={colors.white}
              lineHeight={20}
              style={styles.title}
              numberOfLines={2}
            >
              {book.bookTitle}
            </AppText>
            <View style={styles.authorPublisherWrapper}>
              <AppText
                weight="semibold"
                size="xs"
                color={colors.grey[200]}
                lineHeight={24}
                numberOfLines={1}
                style={styles.authorPublisher}
              >
                {book.authorName} 저
              </AppText>
              <View style={styles.dot} />
              <AppText
                weight="semibold"
                size="xs"
                color={colors.grey[200]}
                lineHeight={24}
                numberOfLines={1}
                style={styles.authorPublisher}
              >
                {book.publisher}
              </AppText>
            </View>
          </View>
        </Pressable>
        <Pressable
          style={{ alignSelf: "flex-start" }}
          onPress={() => handlePressSaveButton(book.isbn, book.isSaved)}
          hitSlop={10}
        >
          {book.isSaved ? <IcSaveFilled /> : <IcSave />}
        </Pressable>
      </View>
    );
  };

  return (
    <FlatList
      contentContainerStyle={[
        styles.list,
        { paddingBottom: bottom + 20 },
        isFetchingNextPage && { paddingBottom: 40 },
      ]}
      data={savedBookList}
      keyExtractor={(item) => String(item.bookId)}
      renderItem={({ item }) => <SavedBookItem {...item} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={SavedBookEmpty}
      ListFooterComponent={
        isFetchingNextPage ? (
          <ActivityIndicator style={styles.footer} color={colors.white} />
        ) : null
      }
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      // TODO: 새로고침 디자인 확인
      refreshControl={
        <RefreshControl
          refreshing={isRefetchingSavedBook}
          onRefresh={refetchSavedBook}
          tintColor={colors.white}
          colors={[colors.white]}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingTop: 32,
    paddingHorizontal: 20,
    gap: 20,
  },
  separator: {
    marginTop: 20,
    height: 1,
    backgroundColor: colors.darkgrey.dark,
  },
  item: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
  },
  bookContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 12,
    minWidth: 0,
  },
  image: {
    width: 80,
    height: 107,
  },
  textWrapper: {
    flex: 1,
    minWidth: 0,
    gap: 8,
  },
  title: {
    flexShrink: 1,
  },
  authorPublisherWrapper: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  authorPublisher: {
    maxWidth: "50%",
  },
  dot: {
    width: 2,
    height: 2,
    borderRadius: 2,
    backgroundColor: colors.grey[200],
  },
  empty: {
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    marginTop: 40,
  },
});
