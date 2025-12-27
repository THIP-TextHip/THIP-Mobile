import { StyleSheet, Text, View } from "react-native";

export default function Welcome() {
  return (
    <View style={styles.pageContainer}>
      <Text>온보딩</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
});
