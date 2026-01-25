import { LinearGradient } from "expo-linear-gradient";
import { useMemo, useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { colors } from "@theme/token";

import AppText from "../../../app-text";

const IMAGE_GAP = 10;

interface FeedPostPreviewBodyProps {
  feedId: number;
  contentBody: string;
  contentUrls: string[];
}

export default function FeedPostPreviewBody({
  feedId,
  contentBody,
  contentUrls,
}: FeedPostPreviewBodyProps) {
  const collapsedLines = useMemo(
    () => (contentUrls.length === 0 ? 8 : 3),
    [contentUrls.length],
  );

  const [isTruncated, setIsTruncated] = useState(false);

  const [containerWidth, setContainerWidth] = useState(0);

  const imageSize = (containerWidth - IMAGE_GAP * 2) / 3;

  const handleToFeedDetail = () => {
    console.log(feedId, "번 게시글로 이동");
  };

  return (
    <Pressable
      style={styles.container}
      onPress={handleToFeedDetail}
      onLayout={(e) => {
        const w = e.nativeEvent.layout.width;
        setContainerWidth(w);
      }}
    >
      <AppText
        weight="regular"
        size="sm"
        color={colors.grey[100]}
        style={styles.contentBodyStyle}
        numberOfLines={collapsedLines}
        onTextLayout={(e) => {
          setIsTruncated(e.nativeEvent.lines.length > collapsedLines);
        }}
      >
        {contentBody}
      </AppText>
      {isTruncated && (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          locations={[0.0702, 0.4515]}
          colors={["rgba(18,18,18,0)", colors.black.main]}
          style={styles.isTruncated}
        >
          <AppText
            weight="semibold"
            size="sm"
            color={colors.grey[300]}
            style={styles.isTruncatedText}
          >
            ...더보기
          </AppText>
        </LinearGradient>
      )}
      <View style={styles.imageWrapper}>
        {contentUrls.slice(0, 3).map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            width={imageSize}
            height={imageSize}
            style={{ width: imageSize, height: imageSize }}
          />
        ))}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    gap: 16,
  },
  contentBodyStyle: {
    lineHeight: 20,
  },
  isTruncated: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 80,
  },
  isTruncatedText: {
    lineHeight: 20,
    textAlign: "right",
  },
  imageWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: IMAGE_GAP,
  },
});
