import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  type NotificationType,
  useGetNotificationListQuery,
} from "@apis/notification";
import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

import AlarmItem from "../alarm-item";

interface AlarmListProps {
  filter: NotificationType | null;
}

export default function AlarmList({ filter }: AlarmListProps) {
  const { bottom } = useSafeAreaInsets();

  const {
    notificationList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPendingNotificationList,
    isErrorNotificationList,
    notificationListError,
    refetchNotificationList,
    isRefetchingNotificationList,
  } = useGetNotificationListQuery(filter);

  const handleLoadMore = () => {
    if (!hasNextPage || isFetchingNextPage) return;

    fetchNextPage();
  };

  if (isPendingNotificationList) {
    return (
      <View style={styles.status}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }

  if (isErrorNotificationList) {
    return (
      <View style={styles.status}>
        <AppText weight="semibold" size="lg" color={colors.white}>
          데이터를 불러오지 못했어요 ({notificationListError?.code})
        </AppText>
      </View>
    );
  }

  return notificationList.length > 0 ? (
    <FlatList
      contentContainerStyle={[styles.content, { paddingBottom: bottom + 20 }]}
      data={notificationList}
      keyExtractor={(item) => String(item.notificationId)}
      renderItem={({ item }) => <AlarmItem alarm={item} />}
      ListFooterComponent={
        isFetchingNextPage ? (
          <ActivityIndicator style={styles.footer} color={colors.white} />
        ) : null
      }
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      refreshControl={
        <RefreshControl
          refreshing={isRefetchingNotificationList}
          onRefresh={refetchNotificationList}
          tintColor={colors.white}
          colors={[colors.white]}
        />
      }
    />
  ) : (
    <View style={styles.status}>
      <AppText weight="semibold" size="lg" color={colors.white}>
        새로운 알림이 없어요
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    gap: 20,
    paddingBottom: 20,
  },
  status: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 80,
  },
  footer: {
    marginTop: 40,
  },
});
