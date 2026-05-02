import { router } from "expo-router";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { IcRightRight } from "@images/icons";
import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

interface JoinGroupBookProps {
  isbn: string;
  bookImageUrl: string;
  bookTitle: string;
  authorName: string;
  bookDescription: string;
  publisher: string;
}

export default function JoinGroupBook({
  isbn,
  bookImageUrl,
  bookTitle,
  authorName,
  bookDescription,
  publisher,
}: JoinGroupBookProps) {
  const handleToBookDetail = () => {
    router.push({
      pathname: "/book-detail/[isbn]",
      params: { isbn: String(isbn) },
    });
  };

  return (
    <Pressable style={styles.container} onPress={handleToBookDetail}>
      <View style={styles.header}>
        <AppText
          weight="medium"
          size="base"
          color={colors.white}
          lineHeight={24}
        >
          {bookTitle}
        </AppText>
        <IcRightRight />
      </View>
      <View style={styles.content}>
        <Image source={{ uri: bookImageUrl }} style={styles.image} />
        <View style={styles.info}>
          <View style={styles.authorPublisher}>
            <AppText weight="medium" size="xs" color={colors.white}>
              {authorName} 저
            </AppText>
            <View style={styles.dot} />
            <AppText weight="medium" size="xs" color={colors.white}>
              {publisher}
            </AppText>
          </View>
          <View style={styles.desc}>
            <AppText weight="medium" size="xs" color={colors.white}>
              도서 소개
            </AppText>
            <AppText
              weight="regular"
              size="2xs"
              color={colors.grey[200]}
              lineHeight={20}
              numberOfLines={3}
            >
              {bookDescription}
            </AppText>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.darkgrey.main,
    backgroundColor: colors.darkgrey.dark,
    gap: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
    gap: 16,
  },
  image: {
    width: 80,
    height: 107,
  },
  info: {
    gap: 16,
    flex: 1,
  },
  authorPublisher: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  dot: {
    width: 2,
    height: 2,
    borderRadius: 2,
    backgroundColor: colors.grey[300],
  },
  desc: {
    gap: 4,
  },
});
