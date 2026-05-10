import { StyleSheet, View } from "react-native";

import { CreateVoteHeader } from "./components";

export default function CreateVoteScreen() {
  return (
    <View style={styles.page}>
      <CreateVoteHeader disabled={true} handleCreateVote={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});
