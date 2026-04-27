import { StyleSheet, View } from "react-native";

import { AppText, NumberPicker } from "@shared/ui";
import { colors } from "@theme/token";

import { LIMITED_MEMBER_COUNT } from "../../constants";

interface SelectMemberCountSectionProps {
  memberCount: number;
  handleChangeMemberCount: (memberCount: number) => void;
}

export default function SelectMemberCountSection({
  memberCount,
  handleChangeMemberCount,
}: SelectMemberCountSectionProps) {
  return (
    <View style={styles.section}>
      <AppText weight="semibold" size="lg" color={colors.white} lineHeight={24}>
        인원 제한
      </AppText>
      <View style={styles.content}>
        <View style={styles.item}>
          <NumberPicker
            values={LIMITED_MEMBER_COUNT}
            value={memberCount}
            onChange={handleChangeMemberCount}
            isInfinite={true}
          />
          <AppText weight="regular" size="xs" color={colors.white}>
            명
          </AppText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 12,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    alignItems: "center",
    flexDirection: "row",
    gap: 2,
  },
});
