import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ImageBackground, Pressable, StyleSheet, View } from "react-native";

import {
  GetBookDetailResponse,
  useChangeBookSaveStatusMutation,
} from "@apis/book";
import { IcPlus, IcRight, IcSave, IcSaveFilled } from "@images/icons";
import { AppText, CustomButton } from "@shared/ui";
import { colors } from "@theme/token";

interface BookInfoProps {
  bookInfo: GetBookDetailResponse | undefined;
  handleOpenModal: () => void;
}

export default function BookInfo({ bookInfo, handleOpenModal }: BookInfoProps) {
  const { changeBookSaveStatus } = useChangeBookSaveStatusMutation();

  if (!bookInfo) {
    return;
  }

  // TODO: 해당 책으로 모집 중인 모임방 리스트 페이지 UI 구현
  const handleToGroupList = () => {
    console.log("모집중인 모임방 리스트 페이지로 이동");
  };
  // TODO: 해당 책이 선택되고 편집 불가한 상태로 되도록
  const handleToFeedWrite = () => {
    router.push("/feed-write");
  };
  const handlePressSaveButton = () => {
    changeBookSaveStatus({ isbn: bookInfo.isbn, type: !bookInfo.isSaved });
  };

  return (
    <ImageBackground source={{ uri: bookInfo.imageUrl }}>
      <LinearGradient
        colors={[colors.darkgrey.gradStart, colors.black.main]}
        locations={[0.0594, 0.94]}
        start={{ x: 0.43, y: 0 }}
        end={{ x: 0.57, y: 1 }}
        style={styles.linearBlur}
      />
      <BlurView intensity={12} tint="default" style={styles.linearBlur} />
      <View style={styles.container}>
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
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  linearBlur: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    padding: 20,
    paddingTop: 76,
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
