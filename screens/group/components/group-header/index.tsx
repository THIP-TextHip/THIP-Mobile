import { router } from "expo-router";
import { useCallback } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { useGetUncheckedNotificationExistsQuery } from "@apis/notification";
import { IcAlarm, IcDone, IcNoAlarm } from "@images/icons";
import { ThipLogo } from "@images/thip";
import { CustomHeader } from "@shared/ui";

export default function GroupHeader() {
  const { hasUncheckedNotification } = useGetUncheckedNotificationExistsQuery();

  const handleToCompletedGroup = useCallback(() => {
    router.push("/expired-group-list");
  }, []);

  const handleToAlarm = useCallback(() => {
    router.push("/alarm");
  }, []);

  return (
    <CustomHeader
      left={<Image source={ThipLogo} style={{ width: 92, height: 23 }} />}
      right={
        <View style={styles.iconWrapper}>
          <Pressable onPress={handleToCompletedGroup} hitSlop={10}>
            <IcDone />
          </Pressable>
          <Pressable onPress={handleToAlarm} hitSlop={10}>
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
