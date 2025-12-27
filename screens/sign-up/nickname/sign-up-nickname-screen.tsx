import { StyleSheet, Text, View } from "react-native";

export default function SignUpNicknameScreen() {
  return (
    <View style={styles.pageContainer}>
      <Text style={{ color: "white" }}>닉네임 페이지</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
});
