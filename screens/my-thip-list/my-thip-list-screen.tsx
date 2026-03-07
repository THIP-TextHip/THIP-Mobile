import { FlatList, StyleSheet, View } from "react-native";

import { ListTotalCountHeader } from "@shared/ui";
import { colors } from "@theme/token";

import { DUMMY_THIP_LIST } from "../feed/constants";
import { MyThipItem } from "./components";

export default function MyThipListScreen() {
  return (
    <View style={styles.page}>
      <ListTotalCountHeader length={DUMMY_THIP_LIST.length} />
      <FlatList
        contentContainerStyle={styles.list}
        data={DUMMY_THIP_LIST}
        keyExtractor={(item) => String(item.userId)}
        renderItem={({ item }) => (
          <MyThipItem
            profileImage={item.profileImage}
            nickname={item.nickname}
            aliasName={item.aliasName}
            aliasColor={item.aliasColor}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    marginTop: 20,
  },
  entireCount: {
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkgrey.dark,
    marginHorizontal: 20,
  },
  list: {
    padding: 20,
    gap: 20,
  },
  separator: {
    height: 1,
    backgroundColor: colors.darkgrey.dark,
    marginTop: 20,
  },
});
