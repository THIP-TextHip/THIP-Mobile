import { Pressable, StyleSheet } from "react-native";

import { CharacterSearch } from "@images/thip/character";
import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

export default function AllGroupButton() {
  const handleToAllGroup = () => {
    console.log("모임 검색 페이지로 이동. 전체 칩 눌린 상태로");
  };
  return (
    <Pressable style={styles.container} onPress={handleToAllGroup}>
      <AppText weight="medium" size="sm" color={colors.white} lineHeight={20}>
        전체 모임방을 한 눈에 둘러보세요!
      </AppText>
      <CharacterSearch style={styles.character} width={32} height={33} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: colors.darkgrey.main,
  },
  character: {
    position: "absolute",
    bottom: 0,
    right: 12,
  },
});
