import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import { useBookDetailQuery } from "@apis/book";
import {
  useGetFeedRelatedBookQuery,
  type FeedRelatedBookSort,
} from "@apis/feed";
import { AppText, FeedPostPreview, type FilterType } from "@shared/ui";
import { colors } from "@theme/token";

import {
  BookDetailHeader,
  BookDetailTopContents,
  BookIntroModal,
  ReadCountBar,
} from "./components";
import { BOOK_DETAIL_FEED_SORT } from "./constants";

export default function BookDetailScreen() {
  const { bottom } = useSafeAreaInsets();
  const { isbn } = useLocalSearchParams<{ isbn: string }>();
  const [isVisibleReadCount, setIsVisibleReadCount] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sortType, setSortType] = useState<FilterType<FeedRelatedBookSort>>(
    BOOK_DETAIL_FEED_SORT[0],
  );
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const {
    bookDetailData,
    isPendingBookDetail,
    refetchBookDetail,
    isRefetchingBookDetail,
  } = useBookDetailQuery(isbn);
  const {
    feedRelatedBookList,
    isPendingFeedRelatedBookList,
    isErrorFeedRelatedBookList,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetchFeedRelatedBookList,
    isRefetchingFeedRelatedBookList,
  } = useGetFeedRelatedBookQuery(isbn, sortType.type);

  const refetchPage = () => {
    refetchBookDetail();
    refetchFeedRelatedBookList();
  };

  const handleLoadMore = () => {
    if (!hasNextPage || isFetchingNextPage) return;

    fetchNextPage();
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handlePressDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleSelectType = (type: FilterType<FeedRelatedBookSort>) => {
    setSortType(type);
    setIsDropdownVisible(false);
  };

  useEffect(() => {
    if (!isbn) {
      Toast.show({
        type: "error",
        text1: "책정보가 존재하지 않습니다.",
      });
      if (router.canGoBack()) {
        router.back();
      } else {
        router.replace("/feed");
      }
    }
  }, [isbn]);

  useEffect(() => {
    setIsVisibleReadCount(true);

    const timer = setTimeout(() => {
      setIsVisibleReadCount(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isbn]);

  if (isPendingBookDetail) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }

  const renderEmpty = () => {
    if (isPendingFeedRelatedBookList) {
      return (
        <View style={styles.status}>
          <ActivityIndicator color={colors.white} />
        </View>
      );
    }

    if (isErrorFeedRelatedBookList) {
      return (
        <View style={styles.status}>
          <AppText
            weight="semibold"
            size="lg"
            color={colors.grey[100]}
            lineHeight={24}
          >
            피드를 불러오지 못했어요.
          </AppText>
        </View>
      );
    }

    return (
      <View style={styles.status}>
        <AppText
          weight="semibold"
          size="lg"
          color={colors.white}
          lineHeight={24}
        >
          이 책으로 작성된 피드가 없어요
        </AppText>
        <AppText
          weight="regular"
          size="sm"
          color={colors.grey[100]}
          lineHeight={20}
        >
          첫번째 피드를 작성해보세요!
        </AppText>
      </View>
    );
  };

  return (
    <View style={styles.page}>
      <BookDetailHeader />
      {isVisibleReadCount && (
        <ReadCountBar readCount={bookDetailData?.readCount} />
      )}
      <FlatList
        contentContainerStyle={[styles.list, { paddingBottom: bottom + 20 }]}
        ListHeaderComponentStyle={styles.listHeader}
        ListHeaderComponent={() => (
          <BookDetailTopContents
            bookDetailData={bookDetailData}
            sortType={sortType}
            isDropdownVisible={isDropdownVisible}
            handleOpenModal={handleOpenModal}
            handlePressDropdown={handlePressDropdown}
            handleSelectType={handleSelectType}
          />
        )}
        data={feedRelatedBookList}
        keyExtractor={(item) => String(item.feedId)}
        renderItem={({ item }) => <FeedPostPreview feedPreview={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator style={styles.footer} color={colors.white} />
          ) : null
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={
              isRefetchingBookDetail || isRefetchingFeedRelatedBookList
            }
            onRefresh={refetchPage}
            tintColor={colors.white}
            colors={[colors.white]}
          />
        }
      />
      <BookIntroModal
        isVisible={isModalVisible}
        description={bookDetailData?.description}
        handleCloseModal={handleCloseModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  list: {
    gap: 40,
  },
  listHeader: {
    zIndex: 100,
  },
  separator: {
    marginTop: 40,
    height: 6,
    backgroundColor: colors.darkgrey.divider,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.black.main,
  },
  status: {
    paddingVertical: 80,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  footer: {
    marginTop: 40,
  },
});
