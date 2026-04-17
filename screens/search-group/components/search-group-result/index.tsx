import { FlatList, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppText, ListTotalCountHeader, SelectChip } from "@shared/ui";
import { colors } from "@theme/token";

import {
  DUMMY_SEARCH_GROUP_LIST,
  SEARCH_GROUP_CATEGORY,
} from "../../constants";
import { SearchGroupCategoryType } from "../../types";
import SearchedGroupItem from "../searched-group-item";

interface SearchGroupResultProps {
  searchText: string;
  roomCategory: SearchGroupCategoryType | null;
  handleChangeCategory: (roomCategory: SearchGroupCategoryType) => void;
}

export default function SearchGroupResult({
  searchText,
  roomCategory,
  handleChangeCategory,
}: SearchGroupResultProps) {
  const { bottom } = useSafeAreaInsets();
  // TODO: 서버에 searchText와 roomCategory로 검색 요청
  const Separator = () => <View style={styles.separator} />;

  const EmptyView = () => {
    return (
      <View style={styles.empty}>
        <AppText
          weight="semibold"
          size="lg"
          color={colors.white}
          lineHeight={24}
        >
          해당하는 모임방이 없어요
        </AppText>
        <AppText weight="regular" size="sm" color={colors.grey[100]}>
          직접 모임방을 만들어보세요.
        </AppText>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {roomCategory && (
        <View style={styles.header}>
          <FlatList
            contentContainerStyle={styles.category}
            data={SEARCH_GROUP_CATEGORY}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <SelectChip
                label={item}
                isSelected={item === roomCategory}
                handleSelect={() => handleChangeCategory(item)}
                type="category"
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          <ListTotalCountHeader length={DUMMY_SEARCH_GROUP_LIST.length} />
        </View>
      )}
      <FlatList
        contentContainerStyle={[
          styles.list,
          DUMMY_SEARCH_GROUP_LIST.length === 0 && { flex: 1 },
          { paddingBottom: bottom },
          roomCategory && { paddingTop: 8 },
        ]}
        data={DUMMY_SEARCH_GROUP_LIST}
        keyExtractor={(item) => String(item.roomId)}
        renderItem={({ item }) => <SearchedGroupItem searchedGroup={item} />}
        ItemSeparatorComponent={Separator}
        ListEmptyComponent={EmptyView}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    gap: 20,
  },
  category: {
    paddingHorizontal: 20,
    gap: 12,
  },
  list: {
    paddingHorizontal: 20,
  },
  separator: {
    height: 1,
    backgroundColor: colors.darkgrey.dark,
    marginTop: 12,
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
});
