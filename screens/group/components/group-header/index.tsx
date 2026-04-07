import { router } from "expo-router";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { IcAlarm, IcDone } from "@images/icons";
import { ThipLogo } from "@images/thip";
import { CustomHeader } from "@shared/ui";

export default function GroupHeader() {
  const handleToCompletedGroup = () => {
    console.log("완료된 모임방 페이지로 이동");
  };
  const handleToAlarm = () => {
    router.push("/alarm");
  };

  return (
    <CustomHeader
      left={<Image source={ThipLogo} style={{ width: 92, height: 23 }} />}
      right={
        <View style={styles.iconWrapper}>
          <Pressable onPress={handleToCompletedGroup} hitSlop={10}>
            <IcDone />
          </Pressable>
          <Pressable onPress={handleToAlarm} hitSlop={10}>
            <IcAlarm />
          </Pressable>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
});
