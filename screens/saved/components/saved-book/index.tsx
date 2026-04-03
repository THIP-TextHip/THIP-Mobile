import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { IcSaveFilled } from "@images/icons";
import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

import { DUMMY_SAVED_BOOK_LIST } from "../../constants";

// TODO: 추후 이걸 쓰지 않고 서버에서 주는 타입으로 교체.
interface SavedBookItemProps {
  book: {
    bookId: number;
    bookTitle: string;
    authorName: string;
    publisher: string;
    bookImageUrl: string;
    isbn: string;
    isSaved: boolean;
  };
}

export default function SavedBook() {
  const { height } = useWindowDimensions();
  const { bottom } = useSafeAreaInsets();

  const handleToBookDetail = (isbn: string) => {
    router.push({
      pathname: "/book-detail/[isbn]",
      params: { isbn: String(isbn) },
    });
  };

  // TODO: 서버에 저장 취소 요청
  const handlePressSaveButton = (isbn: string) => {
    console.log(isbn, "번 책 저장 취소");
  };

  const SavedBookItem = ({ book }: SavedBookItemProps) => {
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
          onPress={() => handlePressSaveButton(book.isbn)}
          hitSlop={10}
        >
          <IcSaveFilled />
        </Pressable>
      </View>
    );
  };

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

  return (
    <FlatList
      contentContainerStyle={[styles.list, { paddingBottom: bottom + 32 }]}
      data={DUMMY_SAVED_BOOK_LIST}
      keyExtractor={(item) => String(item.bookId)}
      renderItem={({ item }) => <SavedBookItem book={item} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={SavedBookEmpty}
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
});
