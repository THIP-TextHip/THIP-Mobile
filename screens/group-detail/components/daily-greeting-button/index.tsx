import { Pressable, StyleSheet, View } from "react-native";

import { IcRightRight } from "@images/icons";
import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

interface DailyGreetingButtonProps {
  roomId: number;
}

export default function DailyGreetingButton({
  roomId,
}: DailyGreetingButtonProps) {
  const handleToDailyGreeting = () => {
    alert(`${roomId}번 오늘의 한마디 페이지 준비 중`);
  };
  return (
    <Pressable style={styles.container} onPress={handleToDailyGreeting}>
      <View style={styles.header}>
        <AppText
          weight="semibold"
          size="base"
          color={colors.white}
          lineHeight={24}
        >
          오늘의 한마디
        </AppText>
        <IcRightRight />
      </View>
      <AppText weight="medium" size="xs" color={colors.grey[100]}>
        모임방 멤버들과 간단한 인사를 나눠보세요!
      </AppText>
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
});
