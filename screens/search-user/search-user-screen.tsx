import { useCallback, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { RecentSearch, SearchBar } from "@shared/ui";

import { SearchUserResult } from "./components";
import { RECENT_SEARCH_USER } from "./constants";

export default function SearchUserScreen() {
  const [searchText, setSearchText] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleChangeText = useCallback((text: string) => {
    setSearchText(text);
    setHasSearched(false);
  }, []);
  const handleSearch = useCallback(() => {
    if (searchText.trim() === "") return;
    console.log(searchText, " 검색");
    setHasSearched(true);
  }, [searchText]);

  const handleClickKeyword = useCallback((keyword: string) => {
    console.log(keyword, " 검색");
  }, []);
  const handleRemoveKeyword = useCallback((keyword: string) => {
    console.log(keyword, " 삭제");
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
            <SearchUserResult searchText={searchText} hasSearched={hasSearched} />
          ) : (
            <View style={styles.recentSearch}>
              <RecentSearch
                recentSearchedKeywords={RECENT_SEARCH_USER}
                handleClickKeyword={handleClickKeyword}
                handleRemoveKeyword={handleRemoveKeyword}
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
