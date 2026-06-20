import { useCallback, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import {
  useDeleteRecentSearchMutation,
  useGetRecentSearchQuery,
} from "@apis/recent-search";
import { RecentSearch, SearchBar } from "@shared/ui";

import { SearchUserResult } from "./components";

export default function SearchUserScreen() {
  const { recentSearchList } = useGetRecentSearchQuery("USER");
  const { deleteRecentSearch } = useDeleteRecentSearchMutation("USER");

  const [searchText, setSearchText] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleChangeText = useCallback((text: string) => {
    setSearchText(text);
    setHasSearched(false);
  }, []);

  const handleSearch = useCallback(() => {
    if (searchText.trim() === "") return;
    setHasSearched(true);
  }, [searchText]);

  const handleClickKeyword = useCallback((keyword: string) => {
    setSearchText(keyword);
    setHasSearched(true);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.page}>
        <View style={styles.searchBar}>
          <SearchBar
            value={searchText}
            placeholder="내가 찾는 사용자를 검색해보세요."
            setValue={handleChangeText}
            handleSearch={handleSearch}
            autoFocus={true}
          />
        </View>
        <View style={styles.content}>
          {!!searchText.trim() ? (
            <SearchUserResult
              searchText={searchText}
              hasSearched={hasSearched}
            />
          ) : (
            <View style={styles.recentSearch}>
              <RecentSearch
                recentSearchedKeywords={recentSearchList}
                handleClickKeyword={handleClickKeyword}
                handleRemoveKeyword={deleteRecentSearch}
              />
            </View>
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
  searchBar: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
  },
  recentSearch: {
    padding: 20,
  },
});
