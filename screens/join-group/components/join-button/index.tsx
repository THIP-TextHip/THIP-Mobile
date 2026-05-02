import { Pressable, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

interface JoinButtonProps {
  isHost: boolean;
  isJoining: boolean;
  handlePressJoinButton: () => void;
}

export default function JoinButton({
  isHost,
  isJoining,
  handlePressJoinButton,
}: JoinButtonProps) {
  const { bottom } = useSafeAreaInsets();

  return (
    <Pressable
      style={[
        styles.joinButton,
        { height: bottom + 50, paddingBottom: bottom },
      ]}
      onPress={handlePressJoinButton}
    >
      <AppText weight="semibold" size="lg" color={colors.white} lineHeight={24}>
        {isHost ? "모집 마감하기" : isJoining ? "참여 취소하기" : "참여하기"}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  joinButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    width: "100%",
    backgroundColor: colors.purple.main,
    justifyContent: "center",
    alignItems: "center",
  },
});
