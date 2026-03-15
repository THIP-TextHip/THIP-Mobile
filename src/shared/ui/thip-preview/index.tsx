import { Pressable, StyleSheet, View } from "react-native";

import { IcGroupWhite, IcRightRight } from "@images/icons";
import { colors } from "@theme/token";

import AppText from "../app-text";
import ProfileImage from "../profile-image";

interface ThipPreviewProps {
  followerCount: number;
  thipList: string[];
}

export default function ThipPreview({
  followerCount,
  thipList,
}: ThipPreviewProps) {
  const handleToThipList = () => {
    // TODO : 띱 리스트 화면으로 이동
    console.log("띱 리스트 화면으로 이동");
  };
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <IcGroupWhite />
        <View style={styles.textWrapper}>
          <AppText weight="semibold" size="xs" color={colors.white}>
            {followerCount}명
          </AppText>
          <AppText weight="medium" size="xs" color={colors.grey[100]}>
            이 띱하는 중
          </AppText>
        </View>
      </View>
      {followerCount !== 0 && (
        <View style={styles.right}>
          <View style={styles.thipList}>
            {thipList.slice(0, 5).map((item, index) => (
              <ProfileImage key={`${item}-${index}`} image={item} size={24} />
            ))}
          </View>
          <Pressable onPress={handleToThipList}>
            <IcRightRight />
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 24,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  textWrapper: {
    flexDirection: "row",
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
  },
  thipList: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
