import { router } from "expo-router";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { useGetUncheckedNotificationExistsQuery } from "@apis/notification";
import { IcAlarm, IcNoAlarm, IcPlusfriend } from "@images/icons";
import { ThipLogo } from "@images/thip";
import { CustomHeader } from "@shared/ui";

export default function FeedHeader() {
  const { hasUncheckedNotification } = useGetUncheckedNotificationExistsQuery();

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
          <Pressable onPress={handleToSearchUser}>
            <IcPlusfriend />
          </Pressable>
          <Pressable onPress={handleToAlarm}>
            {hasUncheckedNotification ? <IcAlarm /> : <IcNoAlarm />}
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
