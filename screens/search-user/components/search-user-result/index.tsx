import { FlatList, StyleSheet, View } from "react-native";

import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

import { DUMMY_SEARCHED_USER } from "../../constants";
import SearchedUserItem from "../searched-user-item";

interface SearchUserResultProps {
  searchText: string;
  hasSearched: boolean;
}

export default function SearchUserResult({
  searchText,
  hasSearched,
}: SearchUserResultProps) {
  // TODO: searchText로 추후 서버 api 연동하여 검색된 유저 리스트 조회

  return (
    <View style={styles.container}>
      {hasSearched && DUMMY_SEARCHED_USER.length !== 0 && (
        <View style={styles.entireCount}>
          <AppText weight="medium" size="sm" color={colors.grey[100]}>
            전체 {DUMMY_SEARCHED_USER.length}
          </AppText>
        </View>
      )}
      {DUMMY_SEARCHED_USER.length === 0 ? (
        <View style={styles.empty}>
          <AppText weight="medium" size="lg" color={colors.white}>
            찾는 사용자가 없어요
          </AppText>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.resultWrapper}
          data={DUMMY_SEARCHED_USER}
          keyExtractor={(item) => String(item.userId)}
          renderItem={({ item }) => <SearchedUserItem userData={item} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  entireCount: {
    marginHorizontal: 20,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkgrey.dark,
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  resultWrapper: {
    marginTop: 4,
  },
  separator: {
    height: 1,
    backgroundColor: colors.darkgrey.dark,
    marginHorizontal: 20,
  },
});
