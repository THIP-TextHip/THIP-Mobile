import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";

import { IcDownmoreGrey } from "@images/icons";
import { AppText, FeedPostPreview } from "@shared/ui";
import { colors } from "@theme/token";

import { BookDetailHeader, BookInfo, ReadCountBar } from "./components";
import { DUMMY_BOOK_DETAIL, DUMMY_BOOK_FEED_PREVIEW_LIST } from "./constants";

export default function BookDetailScreen() {
  // TODO: 추후 서버에서 해당 isbn 으로 조회 예정
  const { isbn } = useLocalSearchParams<{ isbn: string }>();
  const [isVisibleReadCount, setIsVisibleReadCount] = useState(false);
  const [isLatestOrder, setIsLatestOrder] = useState(false);

  // TODO: 정렬 방식 변경 방법 논의
  const handleChangeSort = () => {
    setIsLatestOrder(!isLatestOrder);
  };

  useEffect(() => {
    setIsVisibleReadCount(true);
    console.log(isbn);

    const timer = setTimeout(() => {
      setIsVisibleReadCount(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isbn]);

  const BookDetailTopContents = () => {
    return (
      <View style={styles.topContents}>
        <BookInfo bookInfo={DUMMY_BOOK_DETAIL} />
        <View style={styles.feedHeader}>
          <AppText
            weight="semibold"
            size="lg"
            color={colors.grey[100]}
            lineHeight={24}
          >
            피드 글 둘러보기
          </AppText>
          <Pressable style={styles.sort}>
            <Pressable
              style={styles.dropdownWrapper}
              onPress={handleChangeSort}
              hitSlop={5}
            >
              <AppText
                weight="medium"
                size="sm"
                color={colors.grey[100]}
                lineHeight={24}
              >
                {isLatestOrder ? "최신순" : "인기순"}
              </AppText>
              <IcDownmoreGrey />
            </Pressable>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.page}>
      <BookDetailHeader />
      {isVisibleReadCount && (
        <ReadCountBar readCount={DUMMY_BOOK_DETAIL.readCount} />
      )}
      <FlatList
        contentContainerStyle={styles.list}
        ListHeaderComponent={BookDetailTopContents}
        data={DUMMY_BOOK_FEED_PREVIEW_LIST}
        keyExtractor={(item) => String(item.feedId)}
        renderItem={({ item }) => <FeedPostPreview feedPreview={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  topContents: {
    gap: 20,
  },
  feedHeader: {
    marginHorizontal: 20,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkgrey.dark,
  },
  sort: {
    alignItems: "flex-end",
    marginBottom: 4,
  },
  dropdownWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  list: {
    gap: 40,
  },
  separator: {
    marginTop: 40,
    height: 6,
    backgroundColor: colors.darkgrey.divider,
  },
});
