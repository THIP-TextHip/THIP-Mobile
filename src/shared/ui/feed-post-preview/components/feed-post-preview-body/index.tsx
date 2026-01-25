import { LinearGradient } from "expo-linear-gradient";
import { useMemo, useState } from "react";
import {
  Image,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  TextLayoutEvent,
  View,
} from "react-native";

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

  const [containerWidth, setContainerWidth] = useState(0);
  const [fullLineCount, setFullLineCount] = useState(0);

  const isTruncated = fullLineCount > collapsedLines;

  const imageSize = (containerWidth - IMAGE_GAP * 2) / 3;

  const handleGetContainerWidth = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    setContainerWidth(w);
  };

  // 웹에서는 지원이 안됨. 라인 수 계산 불가
  const handleCountTextLines = (e: TextLayoutEvent) => {
    const lines = e.nativeEvent.lines.length;
    setFullLineCount((prev) => (prev === lines ? prev : lines));
  };

  const handleToFeedDetail = () => {
    console.log(feedId, "번 게시글로 이동");
  };

  return (
    <Pressable
      style={styles.container}
      onPress={handleToFeedDetail}
      onLayout={handleGetContainerWidth}
    >
      <View style={styles.textWrapper}>
        {/* 전체 라인 수 계산용 */}
        <AppText
          weight="regular"
          size="sm"
          color={colors.grey[100]}
          style={[styles.contentBodyStyle, styles.measureText]}
          onTextLayout={handleCountTextLines}
          pointerEvents="none"
        >
          {contentBody}
        </AppText>
        {/* 실제 텍스트 (numberOfLines 적용) */}
        <AppText
          weight="regular"
          size="sm"
          color={colors.grey[100]}
          style={styles.contentBodyStyle}
          numberOfLines={collapsedLines}
          ellipsizeMode="clip"
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
      </View>
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
    gap: 16,
  },
  textWrapper: {
    position: "relative",
  },
  contentBodyStyle: {
    lineHeight: 20,
  },
  measureText: {
    position: "absolute",
    opacity: 0,
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
