import { useCallback, useState } from "react";
import {
  Keyboard,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import {
  useDeleteRecentSearchMutation,
  useGetRecentSearchQuery,
} from "@apis/recent-search";
import { IcRightRight } from "@images/icons";
import { AppText, RecentSearch, SearchBar } from "@shared/ui";
import { useSearchGroupInitialCategory } from "@stores/search-group";
import { colors } from "@theme/token";

import { SearchGroupResult } from "./components";
import { SearchGroupCategoryType } from "./types";

export default function SearchGroupScreen() {
  const {
    searchGroupInitialCategory,
    setSearchGroupInitialCategory,
    clearSearchGroupInitialCategory,
  } = useSearchGroupInitialCategory();

  const { recentSearchList } = useGetRecentSearchQuery("ROOM");
  const { deleteRecentSearch } = useDeleteRecentSearchMutation("ROOM");

  const [searchText, setSearchText] = useState("");
  const [roomCategory, setRoomCategory] =
    useState<SearchGroupCategoryType | null>(searchGroupInitialCategory);

  const handleChangeText = useCallback((text: string) => {
    setSearchText(text);
    setRoomCategory(null);
  }, []);

  const handleSearch = useCallback(() => {
    if (searchText.trim() === "") return;
    console.log(searchText, " 검색");
    setRoomCategory("전체");
  }, [searchText]);

  const handleClickKeyword = useCallback((keyword: string) => {
    console.log(keyword, " 검색");
  }, []);

  const handleChangeCategoryToEntire = useCallback(() => {
    Keyboard.dismiss();
    setRoomCategory("전체");
  }, []);

  const handleChangeCategory = useCallback(
    (nextCategory: SearchGroupCategoryType) => {
      if (roomCategory === nextCategory) {
        setSearchText("");
        setRoomCategory(null);
        clearSearchGroupInitialCategory();
        return;
      }
      setRoomCategory(nextCategory);
      setSearchGroupInitialCategory(nextCategory);
    },
    [
      roomCategory,
      clearSearchGroupInitialCategory,
      setSearchGroupInitialCategory,
    ],
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.page}>
        <View style={styles.searchSection}>
          <SearchBar
            value={searchText}
            placeholder="방제목, 책제목을 검색해보세요."
            autoFocus={searchGroupInitialCategory ? false : true}
            setValue={handleChangeText}
            handleSearch={handleSearch}
          />
        </View>
        <View style={styles.content}>
          {searchText.trim() !== "" || roomCategory !== null ? (
            <SearchGroupResult
              searchText={searchText}
              roomCategory={roomCategory}
              handleChangeCategory={handleChangeCategory}
            />
          ) : (
            <>
              <View style={styles.recentSection}>
                <RecentSearch
                  recentSearchedKeywords={recentSearchList}
                  handleClickKeyword={handleClickKeyword}
                  handleRemoveKeyword={deleteRecentSearch}
                />
              </View>
              <Pressable
                style={styles.toEntire}
                onPress={handleChangeCategoryToEntire}
                hitSlop={10}
              >
                <AppText
                  weight="semibold"
                  size="lg"
                  color={colors.grey[100]}
                  lineHeight={24}
                >
                  전체 모임방 둘러보기
                </AppText>
                <IcRightRight />
              </Pressable>
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  searchSection: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
  },
  recentSection: {
    paddingHorizontal: 20,
  },
  toEntire: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },
});
