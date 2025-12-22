import { router } from "expo-router";
import { Image, StyleSheet, View } from "react-native";

import { IcAlarm, IcPlusfriend } from "@images/icons";
import { ThipLogo } from "@images/thip";
import { CustomHeader } from "@shared/ui";

export default function FeedHeader() {
  const handleToSearchUser = () => {
    router.push("/search-user");
  };
  const handleToAlarm = () => {
    router.push("/alarm");
  };

  return (
    <CustomHeader
      left={<Image source={ThipLogo} style={{ width: 92, height: 23 }} />}
      right={
        <View style={styles.iconWrapper}>
          <IcPlusfriend onPress={handleToSearchUser} />
          {/* TODO : 알림 없을 때는 => <IcNoAlarm /> */}
          <IcAlarm onPress={handleToAlarm} />
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
