import { FlatList, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppText, MyGroupCard } from "@shared/ui";
import { colors } from "@theme/token";

import { DUMMY_EXPIRED_ROOM_LIST } from "./constants";

const NICKNAME = "띱테스트";

export default function ExpiredGroupListScreen() {
  const { bottom } = useSafeAreaInsets();

  const ListHeader = () => {
    return (
      <AppText weight="regular" size="sm" color={colors.white} lineHeight={24}>
        {NICKNAME}님이 참여했던 모임방들을 확인해보세요.
      </AppText>
    );
  };
  return (
    <FlatList
      contentContainerStyle={[styles.container, { paddingBottom: bottom + 20 }]}
      data={DUMMY_EXPIRED_ROOM_LIST}
      keyExtractor={(item) => String(item.roomId)}
      ListHeaderComponent={ListHeader}
      renderItem={({ item }) => (
        <MyGroupCard
          roomId={item.roomId}
          bookImageUrl={item.bookImageUrl}
          roomName={item.roomName}
          memberCount={item.memberCount}
          type={item.type}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
});
