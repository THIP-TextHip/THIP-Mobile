import { ScrollView, StyleSheet, View } from "react-native";

import { ListTotalCountHeader, ThipPreview, UserProfile } from "@shared/ui";
import { colors } from "@theme/token";

// TODO: 서버에서 가져오기
import { DUMMY_THIP_LIST } from "../../constants";

// TODO: 서버에서 받아오기
const nickname = "ThipUser01";
const genre = "문학가";
const profileColor = colors.character.mint;

export default function MyFeedContents() {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.profile}>
        <UserProfile userProfile={{ nickname, genre, profileColor }} />
        <ThipPreview thipList={DUMMY_THIP_LIST} />
      </View>
      <ListTotalCountHeader length={3} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 32,
    gap: 40,
  },
  profile: {
    gap: 16,
    paddingHorizontal: 20,
  },
});
