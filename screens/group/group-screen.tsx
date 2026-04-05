import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { FloatingGroupCreate } from "@images/icons";
import { colors } from "@theme/token";

import { GroupSearchButton, MyGroupCarousel } from "./components";

export default function GroupScreen() {
  const handleToGroupCreate = () => {
    console.log("모임 만들기 페이지로 이동");
  };

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <GroupSearchButton />
      <View style={styles.content}>
        <MyGroupCarousel />
        <View style={styles.separator} />
      </View>
      <Pressable style={styles.floating} onPress={handleToGroupCreate}>
        <FloatingGroupCreate />
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  content: {
    paddingVertical: 20,
    gap: 32,
  },
  separator: {
    height: 6,
    backgroundColor: colors.darkgrey.divider,
  },
  floating: {
    position: "absolute",
    bottom: 32,
    right: 20,
  },
});
