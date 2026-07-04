import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useSavedFeedQuery } from "@apis/feed";
import { AppText, FeedPostPreview } from "@shared/ui";
import { colors } from "@theme/token";

export default function SavedFeed() {
  const { height } = useWindowDimensions();
  const { bottom } = useSafeAreaInsets();

  const {
    savedFeedList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPendingSavedFeed,
    isErrorSavedFeed,
    refetchSavedFeed,
    isRefetchingSavedFeed,
  } = useSavedFeedQuery();

  const handleLoadMore = () => {
    if (!hasNextPage || isFetchingNextPage) return;

    fetchNextPage();
  };

  if (isPendingSavedFeed) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }

  if (isErrorSavedFeed && savedFeedList.length === 0) {
    return (
      <View style={styles.empty}>
        <AppText
          weight="semibold"
          size="lg"
          color={colors.white}
          lineHeight={24}
        >
          데이터를 불러오지 못했어요
        </AppText>
        <Pressable onPress={() => void refetchSavedFeed()}>
          <AppText
            weight="regular"
            size="sm"
            color={colors.grey[100]}
            lineHeight={20}
          >
            다시 시도하기
          </AppText>
        </Pressable>
      </View>
    );
  }

  const SavedFeedEmpty = () => {
    return (
      <View style={[styles.empty, { height: height - 300 }]}>
        <AppText
          weight="semibold"
          size="lg"
          color={colors.white}
          lineHeight={24}
        >
          저장된 피드가 없어요
        </AppText>
        <AppText
          weight="regular"
          size="sm"
          color={colors.grey[100]}
          lineHeight={20}
        >
          마음에 드는 피드를 THIP 해보세요!
        </AppText>
      </View>
    );
  };

  return (
    <FlatList
      contentContainerStyle={[
        styles.list,
        { paddingBottom: bottom + 20 },
        isFetchingNextPage && { paddingBottom: 40 },
      ]}
      data={savedFeedList}
      keyExtractor={(item) => String(item.feedId)}
      renderItem={({ item }) => <FeedPostPreview feedPreview={item} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={SavedFeedEmpty}
      ListFooterComponent={
        isFetchingNextPage ? (
          <ActivityIndicator style={styles.footer} color={colors.white} />
        ) : null
      }
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl
          refreshing={isRefetchingSavedFeed}
          onRefresh={refetchSavedFeed}
          tintColor={colors.white}
          colors={[colors.white]}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingTop: 32,
    gap: 40,
  },
  separator: {
    marginTop: 40,
    height: 6,
    backgroundColor: colors.darkgrey.divider,
  },
  empty: {
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    marginTop: 40,
  },
});
