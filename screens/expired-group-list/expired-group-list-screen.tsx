import { FlatList, StyleSheet, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppText, MyGroupCard } from "@shared/ui";
import { colors } from "@theme/token";

import { DUMMY_EXPIRED_ROOM_LIST } from "./constants";

const NICKNAME = "띱테스트";

export default function ExpiredGroupListScreen() {
  const { bottom } = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  const ListHeader = () => {
    return (
      <AppText weight="regular" size="sm" color={colors.white} lineHeight={24}>
        {NICKNAME}님이 참여했던 모임방들을 확인해보세요.
      </AppText>
    );
  };

  const ExpiredGroupEmpty = () => {
    return (
      <View style={[styles.empty, { height: height - 300 }]}>
        <AppText
          weight="semibold"
          size="lg"
          color={colors.white}
          lineHeight={24}
        >
          완료된 모임방이 없어요.
        </AppText>
        <AppText
          weight="regular"
          size="sm"
          color={colors.grey[100]}
          lineHeight={20}
        >
          모임방을 끝까지 완료해보세요.
        </AppText>
      </View>
    );
  };

  return (
    <FlatList
      contentContainerStyle={[styles.container, { paddingBottom: bottom + 20 }]}
      data={DUMMY_EXPIRED_ROOM_LIST}
      keyExtractor={(item) => String(item.roomId)}
      ListHeaderComponent={ListHeader}
      renderItem={({ item }) => <MyGroupCard {...item} />}
      ListEmptyComponent={ExpiredGroupEmpty}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
  empty: {
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
