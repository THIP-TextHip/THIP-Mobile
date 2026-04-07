import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { FloatingGroupCreate } from "@images/icons";
import { colors } from "@theme/token";

import {
  AllGroupButton,
  GroupSearchButton,
  MyGroupCarousel,
  RecruitingGroupCarousel,
} from "./components";

export default function GroupScreen() {
  const handleToGroupCreate = () => {
    console.log("모임 만들기 페이지로 이동");
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.page}>
        <GroupSearchButton />
        <View style={styles.content}>
          <MyGroupCarousel />
          <View style={styles.separator} />
          <AllGroupButton />
          <RecruitingGroupCarousel />
        </View>
      </ScrollView>
      <Pressable style={styles.floating} onPress={handleToGroupCreate}>
        <FloatingGroupCreate />
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
  },
  content: {
    paddingTop: 20,
    paddingBottom: 100,
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
