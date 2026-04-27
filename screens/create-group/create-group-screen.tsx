import { StyleSheet, View } from "react-native";

import { useState } from "react";
import { CreateGroupHeader, SelectMemberCountSection } from "./components";

export default function CreateGroupScreen() {
  const [memberCount, setMemberCount] = useState(15);

  return (
    <View style={styles.page}>
      {/* TODO: 헤더에 완료 버튼 추가 */}
      <CreateGroupHeader />
      <View style={styles.content}>
        <SelectMemberCountSection
          memberCount={memberCount}
          handleChangeMemberCount={setMemberCount}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
});
