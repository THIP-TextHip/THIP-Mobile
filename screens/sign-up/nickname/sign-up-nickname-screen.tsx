import { Keyboard, Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@shared/ui";
import { colors } from "@theme/token";
import { InputNickname } from "./components";

interface SignUpNicknameScreenProps {
  nickname: string;
  isNicknameDuplicated: boolean;
  setNickname: (v: string) => void;
}

export default function SignUpNicknameScreen({
  nickname,
  isNicknameDuplicated,
  setNickname,
}: SignUpNicknameScreenProps) {
  return (
    <View style={styles.screen}>
      <Pressable style={StyleSheet.absoluteFill} onPress={Keyboard.dismiss} />
      <View style={styles.pageContainer} pointerEvents="box-none">
        <AppText weight="semibold" size="lg" color={colors.white}>
          닉네임 (필수)
        </AppText>
        <View pointerEvents="auto">
          <InputNickname
            value={nickname}
            isNicknameDuplicated={isNicknameDuplicated}
            setValue={setNickname}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  pageContainer: {
    marginTop: 40,
    paddingHorizontal: 20,
    gap: 12,
    zIndex: 1,
  },
});
