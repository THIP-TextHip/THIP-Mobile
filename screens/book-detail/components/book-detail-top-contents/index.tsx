import { Pressable, StyleSheet, View } from "react-native";

import { GetBookDetailResponse } from "@apis/book";
import type { FeedRelatedBookSort } from "@apis/feed";
import { IcDownmoreGrey } from "@images/icons";
import { AppText, DropdownFilter, type FilterType } from "@shared/ui";
import { colors } from "@theme/token";

import { BOOK_DETAIL_FEED_SORT } from "../../constants";
import BookInfo from "../book-info";

interface BookDetailTopContentsProps {
  bookDetailData: GetBookDetailResponse | undefined;
  sortType: FilterType<FeedRelatedBookSort>;
  isDropdownVisible: boolean;
  handleOpenModal: () => void;
  handlePressDropdown: () => void;
  handleSelectType: (type: FilterType<FeedRelatedBookSort>) => void;
}

export default function BookDetailTopContents({
  bookDetailData,
  sortType,
  isDropdownVisible,
  handleOpenModal,
  handlePressDropdown,
  handleSelectType,
}: BookDetailTopContentsProps) {
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
}

const styles = StyleSheet.create({
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
});
