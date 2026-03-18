import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground, StyleSheet } from "react-native";

import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

interface BookInfoProps {
  // TODO: 서버 api 응답 타입으로 수정
  bookInfo: {
    title: string;
    imageUrl: string;
    authorName: string;
    publisher: string;
    isbn: string;
    description: string;
    recruitingRoomCount: number;
    readCount: number;
    isSaved: boolean;
  };
}

export default function BookInfo({ bookInfo }: BookInfoProps) {
  return (
    <ImageBackground
      source={{ uri: bookInfo.imageUrl }}
      style={styles.background}
    >
      <LinearGradient
        colors={["rgba(18,18,18,0)", "#121212"]}
        locations={[0.0594, 0.94]}
        start={{ x: 0.43, y: 0 }}
        end={{ x: 0.57, y: 1 }}
        style={styles.container}
      >
        <BlurView intensity={12} tint="default" style={styles.container}>
          <AppText color={colors.white}>{bookInfo.title}</AppText>
        </BlurView>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    aspectRatio: 0.86,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    padding: 20,
    justifyContent: "flex-end",
  },
});
