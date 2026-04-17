import { router } from "expo-router";
import { useCallback } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { IcSearch } from "@images/icons";
import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

export default function GroupSearchButton() {
  const handleToGroupSearch = useCallback(() => {
    router.push("/search-group");
  }, []);

  return (
    <View style={styles.searchContainer}>
      <Pressable style={styles.searchBar} onPress={handleToGroupSearch}>
        <AppText
          weight="regular"
          size="sm"
          color={colors.grey[300]}
          lineHeight={24}
        >
          모임방 참여할 사람!
        </AppText>
        <IcSearch />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  searchContainer: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  searchBar: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.darkgrey.main,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  floating: {
    position: "absolute",
    bottom: 32,
    right: 20,
  },
});
