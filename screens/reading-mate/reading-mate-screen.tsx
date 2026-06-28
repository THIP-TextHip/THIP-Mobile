import { useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { type FollowerType } from "@apis/user";
import { UserListItem } from "@shared/ui";
import { colors } from "@theme/token";

import { DUMMY_READING_MATE } from "./constants";

export default function ReadingMateScreen() {
  const { bottom } = useSafeAreaInsets();
  // TODO: 추후 페이지 데이터 조회 시 roomId 사용
  // const { roomId } = useLocalSearchParams<{ roomId: string }>();

  const listItem = useCallback(
    ({ item }: { item: FollowerType }) => <UserListItem userData={item} />,
    [],
  );

  const Separator = () => <View style={styles.separator} />;

  return (
    <FlatList
      contentContainerStyle={[styles.list, { paddingBottom: bottom + 20 }]}
      data={DUMMY_READING_MATE}
      keyExtractor={(item) => String(item.userId)}
      renderItem={listItem}
      ItemSeparatorComponent={Separator}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingTop: 20,
  },
  separator: {
    height: 1,
    backgroundColor: colors.darkgrey.dark,
    marginHorizontal: 20,
  },
});
