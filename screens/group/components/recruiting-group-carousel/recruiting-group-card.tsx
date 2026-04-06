import { Image, Pressable, StyleSheet, View } from "react-native";

import { IcGroupWhite } from "@images/icons";
import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

import { GroupCarouselItemType } from "../../types";

interface RecruitingGroupCardProps {
  roomInfo: GroupCarouselItemType;
}

export default function RecruitingGroupCard({
  roomInfo,
}: RecruitingGroupCardProps) {
  return (
    <Pressable style={styles.roomContainer}>
      <Image source={{ uri: roomInfo.bookImageUrl }} style={styles.image} />
      <View style={styles.roomInfo}>
        <AppText
          weight="semibold"
          size="lg"
          color={colors.white}
          lineHeight={24}
          numberOfLines={1}
        >
          {roomInfo.roomTitle}
        </AppText>
        <View style={styles.memberCountSection}>
          <IcGroupWhite />
          <AppText weight="medium" size="xs" color={colors.grey[100]}>
            <AppText weight="semibold" size="xs" color={colors.white}>
              {roomInfo.memberCount}
            </AppText>{" "}
            / 30명
          </AppText>
        </View>
        <AppText weight="semibold" size="xs" color={colors.red} lineHeight={20}>
          {roomInfo.deadlineDate} 뒤 모집 마감
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  roomContainer: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.grey[300],
    backgroundColor: colors.darkgrey.main,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 107,
  },
  roomInfo: {
    flex: 1,
  },
  memberCountSection: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 4,
  },
});
