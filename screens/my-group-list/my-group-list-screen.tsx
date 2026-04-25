import { useMemo, useState } from "react";
import { FlatList, StyleSheet, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppText, MyGroupCard } from "@shared/ui";
import { colors } from "@theme/token";

import { MyGroupTopFilter } from "./components";
import { DUMMY_MY_GROUP_LIST } from "./constants";

export default function MyGroupListScreen() {
  const { bottom } = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const [myGroupType, setMyGroupType] = useState<
    "playing" | "recruiting" | null
  >(null);

  const handleSelectType = (type: "playing" | "recruiting") => {
    if (type === myGroupType) {
      setMyGroupType(null);
      return;
    }
    setMyGroupType(type);
  };

  // TODO: 서버에서 주는 데이터로 수정
  const filteredMyGroupList = useMemo(() => {
    return DUMMY_MY_GROUP_LIST.filter((item) =>
      myGroupType === null ? true : item.type === myGroupType,
    );
  }, [myGroupType]);

  const MyGroupEmpty = () => {
    return (
      myGroupType === null && (
        <View style={[styles.empty, { height: height - 300 }]}>
          <AppText
            weight="semibold"
            size="lg"
            color={colors.white}
            lineHeight={24}
          >
            참여중인 모임방이 없어요
          </AppText>
          <AppText
            weight="regular"
            size="sm"
            color={colors.grey[100]}
            lineHeight={20}
          >
            첫번쨰 모임방에 참여해보세요.
          </AppText>
        </View>
      )
    );
  };

  return (
    <View style={styles.page}>
      <MyGroupTopFilter
        myGroupType={myGroupType}
        handleSelectType={handleSelectType}
      />
      <FlatList
        contentContainerStyle={[styles.list, { paddingBottom: bottom + 20 }]}
        data={filteredMyGroupList}
        keyExtractor={(item) => String(item.roomId)}
        renderItem={({ item }) => <MyGroupCard {...item} />}
        ListEmptyComponent={MyGroupEmpty}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 20,
    gap: 20,
  },
  empty: {
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
