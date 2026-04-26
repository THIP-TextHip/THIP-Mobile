import { StyleSheet, View } from "react-native";

import { CreateGroupHeader } from "./components";

export default function CreateGroupScreen() {
  return (
    <View style={styles.page}>
      {/* TODO: 헤더에 완료 버튼 추가 */}
      <CreateGroupHeader />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});
