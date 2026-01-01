import { Image, StyleSheet, View } from "react-native";

import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

interface MostSearchedBookItemProps {
  ranking: number;
  photo: string;
  title: string;
  isLast?: boolean;
}

export default function MostSearchedBookItem({
  ranking,
  photo,
  title,
  isLast = false,
}: MostSearchedBookItemProps) {
  return (
    <View style={[styles.container, isLast && styles.lastItem]}>
      <AppText
        weight="medium"
        size="base"
        color={colors.white}
        style={styles.ranking}
      >
        {ranking}.
      </AppText>
      <View style={styles.content}>
        <Image source={{ uri: photo }} style={styles.photo} />
        <AppText weight="regular" size="sm" color={colors.white}>
          {title}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 2,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.darkgrey.dark,
    gap: 4,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  ranking: {
    width: 16,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  photo: {
    width: 45,
    height: 60,
  },
});
