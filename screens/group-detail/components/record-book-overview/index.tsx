import { Pressable, StyleSheet, View } from "react-native";

import { IcRightRight } from "@images/icons";
import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

interface RecordBookOverviewProps {
  roomId: number;
  currentPage: number;
  userPercentage: number;
}

export default function RecordBookOverview({
  roomId,
  currentPage,
  userPercentage,
}: RecordBookOverviewProps) {
  const clampedPercentage = Math.max(0, Math.min(100, userPercentage));
  const handleToRecordBook = () => {
    console.log(roomId, "번 기록장 페이지로 이동");
  };
  return (
    <Pressable style={styles.container} onPress={handleToRecordBook}>
      <View style={styles.header}>
        <AppText
          weight="semibold"
          size="base"
          color={colors.white}
          lineHeight={24}
        >
          기록장
        </AppText>
        <IcRightRight />
      </View>
      <AppText weight="medium" size="xs" color={colors.grey[100]}>
        현재 페이지 {currentPage}
      </AppText>
      <View style={styles.progress}>
        <View style={styles.percent}>
          <AppText
            weight="semibold"
            size="base"
            color={colors.purple.main}
            lineHeight={20}
          >
            {clampedPercentage}
          </AppText>
          <AppText
            weight="semibold"
            size="xs"
            color={colors.purple.main}
            lineHeight={16}
          >
            %
          </AppText>
        </View>
        <View style={styles.progressBar}>
          <View
            style={[styles.currentProgress, { width: `${clampedPercentage}%` }]}
          />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    gap: 12,
    borderRadius: 12,
    backgroundColor: colors.darkgrey.dark,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progress: {
    height: 56,
    gap: 12,
  },
  percent: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  progressBar: {
    height: 7,
    borderRadius: 12,
    backgroundColor: colors.grey[300],
    overflow: "hidden",
  },
  currentProgress: {
    position: "absolute",
    left: 0,
    height: 7,
    borderRadius: 12,
    backgroundColor: colors.purple.main,
  },
});
