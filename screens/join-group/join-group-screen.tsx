import { ScrollView, StyleSheet, View } from "react-native";

import { JoinGroupHeader, JoinGroupInfo } from "./components";
// TODO: 추후 서버에서 데이터 가져오기. url 파라미터의 roomId 이용
import { DUMMY_JOIN_GROUP_INFO } from "./constants";

export default function JoinGroupScreen() {
  return (
    <View style={styles.page}>
      <JoinGroupHeader />
      <ScrollView>
        <JoinGroupInfo
          roomName={DUMMY_JOIN_GROUP_INFO.roomName}
          roomImageUrl={DUMMY_JOIN_GROUP_INFO.roomImageUrl}
          isPublic={DUMMY_JOIN_GROUP_INFO.isPublic}
          progressStartDate={DUMMY_JOIN_GROUP_INFO.progressStartDate}
          progressEndDate={DUMMY_JOIN_GROUP_INFO.progressEndDate}
          recruitEndDate={DUMMY_JOIN_GROUP_INFO.recruitEndDate}
          category={DUMMY_JOIN_GROUP_INFO.category}
          categoryColor={DUMMY_JOIN_GROUP_INFO.categoryColor}
          roomDescription={DUMMY_JOIN_GROUP_INFO.roomDescription}
          memberCount={DUMMY_JOIN_GROUP_INFO.memberCount}
          recruitCount={DUMMY_JOIN_GROUP_INFO.recruitCount}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});
