import { useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ListTotalCountHeader, UserListItem } from "@shared/ui";
import { type UserListItemData } from "@shared/ui/user-list-item";
import { colors } from "@theme/token";

import { DUMMY_THIP_LIST } from "./constants";

export default function ThipListScreen() {
  const { bottom } = useSafeAreaInsets();
  // TODO: 추후 페이지 데이터 조회 시 userId 사용
  // const { userId } = useLocalSearchParams<{ userId: string }>();

  const listItem = useCallback(
    ({ item }: { item: UserListItemData }) => <UserListItem userData={item} />,
    [],
  );

  const Separator = () => <View style={styles.separator} />;

  return (
    <FlatList
      contentContainerStyle={[
        styles.resultWrapper,
        { paddingBottom: bottom + 20 },
      ]}
      ListHeaderComponent={() => (
        <ListTotalCountHeader length={DUMMY_THIP_LIST.length} />
      )}
      data={DUMMY_THIP_LIST}
      keyExtractor={(item) => String(item.userId)}
      renderItem={listItem}
      ItemSeparatorComponent={Separator}
    />
  );
}

const styles = StyleSheet.create({
  resultWrapper: {
    paddingTop: 20,
  },
  separator: {
    height: 1,
    backgroundColor: colors.darkgrey.dark,
    marginHorizontal: 20,
  },
});
