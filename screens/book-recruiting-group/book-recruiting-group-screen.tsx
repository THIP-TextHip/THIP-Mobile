import { StyleSheet, View } from "react-native";

import { ListTotalCountHeader } from "@shared/ui";

export default function BookRecruitingGroupScreen() {
  return (
    <View style={styles.page}>
      <View style={styles.totalCountHeader}>
        <ListTotalCountHeader length={4} />
      </View>
      {/* TODO: api 부터 만들고 화면에 넣기. 카드는 MyGroupCard와 비슷하게 만들면 될듯함. */}
      {/* 이거 하고 나서 책 바텀시트에 쓰는 api도 연동하기 */}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  totalCountHeader: {
    paddingVertical: 20,
  },
});
