import { Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

import { AlarmResponse } from "../../types";

interface AlarmItemProps {
  alarm: AlarmResponse;
}

export default function AlarmItem({
  alarm: { title, content, isChecked, notificationType, postDate },
}: AlarmItemProps) {
  const alarmType = notificationType === "feed" ? "피드" : "모임";

  // TODO: 추후 클릭 시 이동 및 읽음 처리 구현
  const handlePressAlarm = () => {
    console.log(title, " 클릭");
  };

  return (
    <Pressable
      style={[styles.container, isChecked && styles.isChecked]}
      onPress={handlePressAlarm}
    >
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.alarmType}>
            <AppText weight="semibold" size="xs" color={colors.grey[100]}>
              {alarmType}
            </AppText>
          </View>
          <AppText weight="semibold" size="sm" color={colors.white}>
            {title}
          </AppText>
        </View>
        <View style={styles.headerRight}>
          <AppText weight="regular" size="2xs" color={colors.grey[200]}>
            {postDate}
          </AppText>
          {!isChecked && <View style={styles.unreadDot} />}
        </View>
      </View>
      <AppText
        weight="semibold"
        size="xs"
        color={colors.grey[100]}
        numberOfLines={1}
      >
        {content}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
    borderRadius: 12,
    backgroundColor: colors.darkgrey.dark,
  },
  isChecked: {
    opacity: 0.5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerRight: {
    position: "relative",
    justifyContent: "center",
    height: 24,
    paddingHorizontal: 2,
  },
  alarmType: {
    height: 24,
    justifyContent: "center",
    paddingHorizontal: 10,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: colors.grey[200],
  },
  unreadDot: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 4,
    height: 4,
    borderRadius: 999,
    backgroundColor: colors.red,
  },
});
