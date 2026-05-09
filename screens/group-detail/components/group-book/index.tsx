import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";

import { IcRight } from "@images/icons";
import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

interface GroupBookProps {
  isbn: string;
  bookTitle: string;
  authorName: string;
}

export default function GroupBook({
  isbn,
  bookTitle,
  authorName,
}: GroupBookProps) {
  const handleToBookDetail = () => {
    router.push({
      pathname: "/book-detail/[isbn]",
      params: { isbn },
    });
  };

  return (
    <Pressable style={styles.container} onPress={handleToBookDetail}>
      <AppText
        weight="semibold"
        size="base"
        color={colors.white}
        lineHeight={24}
      >
        {bookTitle}
      </AppText>
      <View style={styles.right}>
        <AppText weight="regular" size="xs" color={colors.grey[100]}>
          {authorName} 저
        </AppText>
        <IcRight />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingLeft: 12,
    paddingRight: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: colors.darkgrey.dark,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
  },
});
