import { FlatList, Image, Pressable, StyleSheet, View } from "react-native";

import { colors } from "@theme/token";

import AppText from "../../../app-text";
import { FeedPostDetailType } from "../../types";

interface FeedPostDetailBodyProps {
  feedDetail: FeedPostDetailType;
  handleOpenImageView: (index: number) => void;
}

export default function FeedPostDetailBody({
  feedDetail,
  handleOpenImageView,
}: FeedPostDetailBodyProps) {
  return (
    <View style={styles.body}>
      <AppText
        weight="regular"
        size="sm"
        color={colors.grey[100]}
        style={{ lineHeight: 20 }}
      >
        {feedDetail.contentBody}
      </AppText>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.imageWrapper}
        data={feedDetail.contentUrls}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item, index }) => (
          <Pressable onPress={() => handleOpenImageView(index)}>
            <Image
              source={{ uri: item }}
              style={styles.image}
              resizeMode="cover"
            />
          </Pressable>
        )}
      />
      <View style={styles.tagWrapper}>
        {feedDetail.tagList.map((tag) => (
          <View key={tag} style={styles.tag}>
            <AppText weight="regular" size="xs" color={colors.white}>
              {tag}
            </AppText>
          </View>
        ))}
      </View>
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    gap: 16,
  },
  imageWrapper: {
    flexDirection: "row",
    gap: 16,
  },
  image: {
    width: 200,
    height: 200,
  },
  tagWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    justifyContent: "center",
    height: 30,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.grey[200],
  },
  divider: {
    height: 1,
    backgroundColor: colors.darkgrey.dark,
  },
});
