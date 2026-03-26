import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground, Pressable, StyleSheet, View } from "react-native";

import { IcPlus, IcRight, IcSave, IcSaveFilled } from "@images/icons";
import { AppText, CustomButton } from "@shared/ui";
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
  handleOpenModal: () => void;
}

export default function BookInfo({ bookInfo, handleOpenModal }: BookInfoProps) {
  const handleToGroupList = () => {
    console.log("모집중인 모임방 리스트 페이지로 이동");
  };
  const handleToFeedWrite = () => {
    console.log("피드 글쓰기 페이지로 이동");
  };
  const handlePressSaveButton = () => {
    console.log("책 저장 및 저장 취소");
  };
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
          <View style={styles.contentWrapper}>
            <View style={styles.infoWrapper}>
              <AppText weight="bold" size="2xl" color={colors.white}>
                {bookInfo.title}
              </AppText>
              <View style={styles.authorPublisher}>
                <AppText
                  weight="semibold"
                  size="xs"
                  color={colors.grey[200]}
                  lineHeight={24}
                >
                  {bookInfo.authorName} 저
                </AppText>
                <View style={styles.dot} />
                <AppText
                  weight="semibold"
                  size="xs"
                  color={colors.grey[200]}
                  lineHeight={24}
                >
                  {bookInfo.publisher}
                </AppText>
              </View>
            </View>
            <Pressable style={styles.descWrapper} onPress={handleOpenModal}>
              <AppText
                weight="semibold"
                size="sm"
                color={colors.white}
                lineHeight={24}
              >
                소개
              </AppText>
              <AppText
                weight="regular"
                size="2xs"
                color={colors.grey[100]}
                lineHeight={20}
                numberOfLines={2}
              >
                {bookInfo.description.replace(/\n/g, " ")}
              </AppText>
            </Pressable>
          </View>
          <View style={styles.buttonWrapper}>
            <Pressable style={styles.groupButton} onPress={handleToGroupList}>
              <AppText
                weight="medium"
                size="base"
                color={colors.white}
                lineHeight={24}
              >
                모집중인 모임방 {bookInfo.recruitingRoomCount}개
              </AppText>
              <IcRight />
            </Pressable>
            <View style={styles.feedBookmarkButtonWrapper}>
              <CustomButton size="fill" handlePress={handleToFeedWrite}>
                <View style={styles.feedButtonContent}>
                  <AppText
                    weight="medium"
                    size="base"
                    color={colors.white}
                    lineHeight={24}
                  >
                    피드에 글 쓰기
                  </AppText>
                  <IcPlus />
                </View>
              </CustomButton>
              <Pressable
                style={styles.saveButton}
                onPress={handlePressSaveButton}
              >
                {bookInfo.isSaved ? <IcSaveFilled /> : <IcSave />}
              </Pressable>
            </View>
          </View>
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
    gap: 20,
  },
  contentWrapper: {
    paddingVertical: 20,
    gap: 32,
  },
  infoWrapper: {
    gap: 8,
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
    backgroundColor: colors.grey[200],
  },
  descWrapper: {
    gap: 4,
  },
  buttonWrapper: {
    gap: 12,
  },
  groupButton: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.grey[200],
  },
  feedButtonContent: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  feedBookmarkButtonWrapper: {
    flexDirection: "row",
    gap: 12,
  },
  saveButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.grey[200],
    justifyContent: "center",
    alignItems: "center",
  },
});
