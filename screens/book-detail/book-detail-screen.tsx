import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import { useBookDetailQuery } from "@apis/book";
import { IcDownmoreGrey } from "@images/icons";
import {
  AppText,
  DropdownFilter,
  FeedPostPreview,
  FilterType,
} from "@shared/ui";
import { colors } from "@theme/token";

import {
  BookDetailHeader,
  BookInfo,
  BookIntroModal,
  ReadCountBar,
} from "./components";
import {
  BOOK_DETAIL_FEED_SORT,
  DUMMY_BOOK_FEED_PREVIEW_LIST,
} from "./constants";

export default function BookDetailScreen() {
  const { bottom } = useSafeAreaInsets();
  const { isbn } = useLocalSearchParams<{ isbn: string }>();
  const {
    bookDetailData,
    isPendingBookDetail,
    refetchBookDetail,
    isRefetchingBookDetail,
  } = useBookDetailQuery(isbn);

  const [isVisibleReadCount, setIsVisibleReadCount] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [sortType, setSortType] = useState<FilterType>(
    BOOK_DETAIL_FEED_SORT[0],
  );
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handlePressDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleSelectType = (type: FilterType) => {
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
    console.log(isbn);

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

  const BookDetailTopContents = () => {
    return (
      <View style={styles.topContents}>
        <BookInfo bookInfo={bookDetailData} handleOpenModal={handleOpenModal} />
        <View style={styles.feedHeader}>
          <AppText
            weight="semibold"
            size="lg"
            color={colors.grey[100]}
            lineHeight={24}
          >
            피드 글 둘러보기
          </AppText>
          <View style={styles.sort}>
            <Pressable
              style={styles.dropdownWrapper}
              onPress={handlePressDropdown}
              hitSlop={5}
            >
              <AppText
                weight="medium"
                size="sm"
                color={colors.grey[100]}
                lineHeight={24}
              >
                {sortType.label}
              </AppText>
              <IcDownmoreGrey />
            </Pressable>
            <DropdownFilter
              isVisible={isDropdownVisible}
              currentType={sortType}
              typeList={BOOK_DETAIL_FEED_SORT}
              handleSelectType={handleSelectType}
            />
          </View>
        </View>
      </View>
    );
  };

  // TODO: 중요!!!! 특정 책으로 올라온 피드 조회 필요!!
  return (
    <View style={styles.page}>
      <BookDetailHeader />
      {isVisibleReadCount && (
        <ReadCountBar readCount={bookDetailData?.readCount} />
      )}
      <FlatList
        contentContainerStyle={[styles.list, { paddingBottom: bottom + 20 }]}
        ListHeaderComponentStyle={styles.listHeader}
        ListHeaderComponent={BookDetailTopContents}
        data={DUMMY_BOOK_FEED_PREVIEW_LIST}
        keyExtractor={(item) => String(item.feedId)}
        renderItem={({ item }) => <FeedPostPreview feedPreview={item} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingBookDetail}
            onRefresh={refetchBookDetail}
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
    zIndex: 10,
    elevation: 10,
  },
  dropdownWrapper: {
    flexDirection: "row",
    alignItems: "center",
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
});
