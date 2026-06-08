import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";

import { useGetAllFeedListQuery } from "@apis/feed";
import { AppText, FeedPostPreview } from "@shared/ui";
import { colors } from "@theme/token";

import MyThipPreview from "../my-thip-preview";

// TODO: 추후 로딩 처리 스켈레톤으로 하기 / 로딩 인디케이터 고민하기
export default function FeedContents() {
  const {
    feedList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPendingFeedList,
    isErrorFeedList,
    refetchFeedList,
    isRefetchingFeedList,
  } = useGetAllFeedListQuery();

  const handleLoadMore = () => {
    if (!hasNextPage || isFetchingNextPage) return;

    fetchNextPage();
  };

  const renderEmpty = () => {
    if (isPendingFeedList) {
      return (
        <View style={styles.status}>
          <ActivityIndicator color={colors.white} />
        </View>
      );
    }

    if (isErrorFeedList) {
      return (
        <View style={styles.status}>
          <AppText weight="medium" size="sm" color={colors.grey[200]}>
            피드를 불러오지 못했어요.
          </AppText>
        </View>
      );
    }

    return (
      <View style={styles.status}>
        <AppText weight="medium" size="sm" color={colors.grey[200]}>
          아직 피드가 없어요.
        </AppText>
      </View>
    );
  };

  return (
    <FlatList
      contentContainerStyle={[
        styles.list,
        isFetchingNextPage && { paddingBottom: 40 },
      ]}
      ListHeaderComponent={<MyThipPreview />}
      data={feedList}
      keyExtractor={(item) => String(item.feedId)}
      renderItem={({ item }) => <FeedPostPreview feedPreview={item} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={renderEmpty}
      ListFooterComponent={
        isFetchingNextPage ? (
          <ActivityIndicator style={styles.footer} color={colors.white} />
        ) : null
      }
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl
          refreshing={isRefetchingFeedList}
          onRefresh={refetchFeedList}
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
    paddingBottom: 100,
    gap: 40,
  },
  separator: {
    marginTop: 40,
    height: 6,
    backgroundColor: colors.darkgrey.divider,
  },
  status: {
    paddingVertical: 40,
    alignItems: "center",
  },
  footer: {
    marginTop: 40,
  },
});
