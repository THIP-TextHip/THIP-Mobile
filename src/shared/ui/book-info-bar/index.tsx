import { Pressable, StyleSheet, View } from "react-native";

import { IcRight } from "@images/icons";
import { colors } from "@theme/token";

import AppText from "../app-text";

interface BookInfoBarProps {
  isbn: string;
  bookTitle: string;
  bookAuthor: string;
}

export default function BookInfoBar({
  isbn,
  bookTitle,
  bookAuthor,
}: BookInfoBarProps) {
  // TODO: 클릭 시 책 상세 정보 페이지로 이동되도록
  const handleToBookDetail = () => {
    console.log(isbn, " 상세로 이동");
  };
  return (
    <Pressable style={styles.container} onPress={handleToBookDetail}>
      <View style={styles.infoWrapper}>
        <AppText
          weight="semibold"
          size="base"
          color={colors.white}
          style={styles.title}
          numberOfLines={1}
        >
          {bookTitle}
        </AppText>
        <View style={styles.authorWrapper}>
          <AppText
            weight="regular"
            size="xs"
            color={colors.grey[100]}
            style={styles.author}
            numberOfLines={1}
          >
            {bookAuthor}
          </AppText>
          <AppText weight="regular" size="xs" color={colors.grey[100]}>
            저
          </AppText>
        </View>
      </View>
      <IcRight />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingRight: 4,
    paddingLeft: 12,
    borderRadius: 12,
    backgroundColor: colors.darkgrey.main,
    flexDirection: "row",
  },
  infoWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    lineHeight: 24,
    flex: 1,
  },
  authorWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  author: {
    maxWidth: 100,
  },
});
