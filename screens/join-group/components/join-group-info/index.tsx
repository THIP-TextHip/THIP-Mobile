import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground, StyleSheet, View } from "react-native";

import { IcCalendar, IcGroupWhite, IcLock } from "@images/icons";
import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

interface RecruitingGroupInfoProps {
  roomName: string;
  roomImageUrl: string;
  isPublic: boolean;
  progressStartDate: string;
  progressEndDate: string;
  recruitEndDate: string;
  category: string;
  categoryColor: string;
  roomDescription: string;
  memberCount: number;
  recruitCount: number;
}

export default function RecruitingGroupInfo({
  roomName,
  roomImageUrl,
  isPublic,
  progressStartDate,
  progressEndDate,
  recruitEndDate,
  category,
  categoryColor,
  roomDescription,
  memberCount,
  recruitCount,
}: RecruitingGroupInfoProps) {
  return (
    <ImageBackground source={{ uri: roomImageUrl }}>
      <LinearGradient
        colors={[colors.darkgrey.gradStart, colors.black.main]}
        locations={[0.0594, 0.94]}
        start={{ x: 0.43, y: 0 }}
        end={{ x: 0.57, y: 1 }}
        style={styles.linear}
      />
      <View style={styles.container}>
        <View style={styles.title}>
          <AppText weight="bold" size="2xl" color={colors.white}>
            {roomName}
          </AppText>
          {!isPublic && <IcLock />}
        </View>
        <View style={styles.infoWrapper}>
          <View style={styles.desc}>
            <AppText
              weight="semibold"
              size="sm"
              color={colors.white}
              lineHeight={24}
            >
              소개글
            </AppText>
            <AppText
              weight="regular"
              size="xs"
              color={colors.grey[100]}
              lineHeight={20}
            >
              {roomDescription}
            </AppText>
          </View>
          <View style={styles.durationAndMember}>
            <View style={styles.durationWrapper}>
              <View style={styles.title}>
                <IcCalendar width={20} height={20} />
                <AppText weight="medium" size="xs" color={colors.white}>
                  모임 활동기간
                </AppText>
              </View>
              <AppText weight="regular" size="2xs" color={colors.grey[100]}>
                {progressStartDate} ~ {progressEndDate}
              </AppText>
            </View>
            <View style={styles.memberWrapper}>
              <View style={styles.title}>
                <IcGroupWhite />
                <AppText weight="medium" size="xs" color={colors.white}>
                  참여 중인 독서메이트
                </AppText>
              </View>
              <AppText weight="medium" size="xs" color={colors.grey[100]}>
                <AppText weight="semibold" size="xs" color={colors.white}>
                  {memberCount}
                </AppText>{" "}
                / {recruitCount}명
              </AppText>
            </View>
          </View>
          <View style={styles.endDateCategoryWrapper}>
            <View style={styles.endDateCategoryItem}>
              <AppText weight="medium" size="xs" color={colors.white}>
                모집
              </AppText>
              <AppText weight="medium" size="xs" color={colors.neongreen}>
                {recruitEndDate} 남음
              </AppText>
            </View>
            <View style={styles.endDateCategoryItem}>
              <AppText weight="medium" size="xs" color={colors.white}>
                장르
              </AppText>
              <AppText weight="medium" size="xs" color={categoryColor}>
                {category}
              </AppText>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  linear: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 76,
    paddingBottom: 30,
    gap: 40,
  },
  title: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
  },
  infoWrapper: {
    gap: 20,
  },
  desc: {
    gap: 4,
  },
  durationAndMember: {
    flexDirection: "row",
    gap: 40,
  },
  durationWrapper: {
    gap: 12,
  },
  memberWrapper: {
    gap: 12,
  },
  endDateCategoryWrapper: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  endDateCategoryItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 40,
    backgroundColor: colors.darkgrey.card,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
