import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

import { BookDetailHeader, BookInfo, ReadCountBar } from "./components";
import { DUMMY_BOOK_DETAIL } from "./constants";

export default function BookDetailScreen() {
  const { isbn } = useLocalSearchParams<{ isbn: string }>();
  const [isVisibleReadCount, setIsVisibleReadCount] = useState(false);

  useEffect(() => {
    setIsVisibleReadCount(true);

    const timer = setTimeout(() => {
      setIsVisibleReadCount(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.page}>
      <BookDetailHeader />
      {isVisibleReadCount && (
        <ReadCountBar readCount={DUMMY_BOOK_DETAIL.readCount} />
      )}
      <FlatList
        contentContainerStyle={{ gap: 100 }}
        ListHeaderComponent={() => <BookInfo bookInfo={DUMMY_BOOK_DETAIL} />}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        renderItem={() => (
          <AppText size="2xl" color={colors.white}>
            {isbn}번 책 상세 페이지
          </AppText>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});
