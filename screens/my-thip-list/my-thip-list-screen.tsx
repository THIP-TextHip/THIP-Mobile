import { FlatList, StyleSheet, View } from "react-native";

import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

import { DUMMY_MY_THIP_LIST } from "../feed/constants";
import { MyThipItem } from "./components";

export default function MyThipListScreen() {
  return (
    <View style={styles.page}>
      <View style={styles.entireCount}>
        <AppText weight="medium" size="sm" color={colors.grey[100]}>
          전체 {DUMMY_MY_THIP_LIST.length}
        </AppText>
      </View>
      <FlatList
        contentContainerStyle={styles.list}
        data={DUMMY_MY_THIP_LIST}
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
  },
  separator: {
    height: 1,
    backgroundColor: colors.darkgrey.dark,
    marginVertical: 20,
  },
});
