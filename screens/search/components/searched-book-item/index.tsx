import { Image, Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@shared/ui";
import { colors } from "@theme/token";
import { router } from "expo-router";

interface SearchedBookItemProps {
  title: string;
  imageUrl: string;
  authorName: string;
  publisher: string;
  isbn: string;
}

export default function SearchedBookItem({
  title,
  imageUrl,
  authorName,
  publisher,
  isbn,
}: SearchedBookItemProps) {
  const handleToBookDetail = () => {
    router.push({
      pathname: "/book-detail/[isbn]",
      params: { isbn },
    });
  };

  return (
    <Pressable style={styles.container} onPress={handleToBookDetail}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.textWrapper}>
        <AppText
          weight="semibold"
          size="base"
          color={colors.white}
          style={styles.title}
        >
          {title}
        </AppText>
        <View style={styles.meta}>
          <AppText
            weight="medium"
            size="xs"
            color={colors.grey[200]}
            numberOfLines={1}
            style={styles.metaText}
          >
            {authorName}
          </AppText>
          <AppText weight="medium" size="xs" color={colors.grey[200]}>
            저
          </AppText>
          <View style={styles.dot} />
          <AppText
            weight="medium"
            size="xs"
            color={colors.grey[200]}
            numberOfLines={1}
            style={styles.metaText}
          >
            {publisher}
          </AppText>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  image: {
    width: 80,
    height: 107,
  },
  textWrapper: {
    flex: 1,
    minWidth: 0,
    gap: 8,
  },
  title: {
    flexShrink: 1,
  },
  meta: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
    minWidth: 0,
  },
  metaText: {
    flexShrink: 1,
  },
  dot: {
    width: 2,
    height: 2,
    borderRadius: 999,
    backgroundColor: colors.grey[200],
    marginHorizontal: 2,
  },
});
