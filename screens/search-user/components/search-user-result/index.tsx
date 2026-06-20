import { useCallback, useEffect } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";

import { useQueryClient } from "@tanstack/react-query";

import { RECENT_SEARCH_QUERY_KEY } from "@apis/recent-search";
import { useSearchUserQuery, type UserType } from "@apis/user";
import { AppText, ListTotalCountHeader, UserListItem } from "@shared/ui";
import { colors } from "@theme/token";

interface SearchUserResultProps {
  searchText: string;
  hasSearched: boolean;
}

export default function SearchUserResult({
  searchText,
  hasSearched,
}: SearchUserResultProps) {
  const queryClient = useQueryClient();
  const { searchUserList, isPendingSearchUser, isFetchingSearchUser } =
    useSearchUserQuery(searchText, hasSearched, 30);

  useEffect(() => {
    const normalizedSearchText = searchText.trim();

    if (
      !hasSearched ||
      normalizedSearchText === "" ||
      isPendingSearchUser ||
      isFetchingSearchUser
    ) {
      return;
    }

    queryClient.invalidateQueries({
      queryKey: RECENT_SEARCH_QUERY_KEY.LIST("USER"),
    });
  }, [
    hasSearched,
    isFetchingSearchUser,
    isPendingSearchUser,
    queryClient,
    searchText,
  ]);

  const listItem = useCallback(
    ({ item }: { item: UserType }) => <UserListItem userData={item} />,
    [],
  );

  const Separator = () => <View style={styles.separator} />;

  if (isPendingSearchUser) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {hasSearched && searchUserList.length !== 0 && (
        <ListTotalCountHeader length={searchUserList.length} />
      )}
      {searchUserList.length === 0 ? (
        <View style={styles.empty}>
          <AppText weight="medium" size="lg" color={colors.white}>
            찾는 사용자가 없어요
          </AppText>
        </View>
      ) : (
        <FlatList
          contentContainerStyle={styles.resultWrapper}
          data={searchUserList}
          keyExtractor={(item) => String(item.userId)}
          renderItem={listItem}
          ItemSeparatorComponent={Separator}
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
  loading: {
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
