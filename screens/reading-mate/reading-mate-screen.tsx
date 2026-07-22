import { useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { type ReadingMateType, useGetReadingMateQuery } from "@apis/room";
import { AppText, UserListItem } from "@shared/ui";
import { colors } from "@theme/token";

export default function ReadingMateScreen() {
  const { bottom } = useSafeAreaInsets();
  const { roomId } = useLocalSearchParams<{ roomId: string }>();

  const {
    readingMateList,
    isPendingReadingMateList,
    isErrorReadingMateList,
    readingMateListError,
    refetchReadingMateList,
    isRefetchingReadingMateList,
  } = useGetReadingMateQuery(roomId);

  const listItem = useCallback(
    ({ item }: { item: ReadingMateType }) => (
      <UserListItem userData={{ profileImageUrl: item.imageUrl, ...item }} />
    ),
    [],
  );

  const Separator = () => <View style={styles.separator} />;

  return isPendingReadingMateList ? (
    <View style={styles.status}>
      <ActivityIndicator size="large" color={colors.white} />
    </View>
  ) : isErrorReadingMateList ? (
    <View style={styles.status}>
      <AppText weight="semibold" size="lg" color={colors.white}>
        데이터를 불러오지 못했어요.{" "}
        {readingMateListError?.code
          ? `${readingMateListError.code}`
          : "다시 시도해 주세요."}
      </AppText>
    </View>
  ) : (
    <FlatList
      contentContainerStyle={[styles.list, { paddingBottom: bottom + 20 }]}
      data={readingMateList}
      keyExtractor={(item) => String(item.userId)}
      renderItem={listItem}
      ItemSeparatorComponent={Separator}
      refreshControl={
        <RefreshControl
          refreshing={isRefetchingReadingMateList}
          onRefresh={refetchReadingMateList}
          tintColor={colors.white}
          colors={[colors.white]}
        />
      }
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
  status: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
