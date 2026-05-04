import { useEffect, useRef, useState } from "react";
import { Keyboard, Pressable, StyleSheet, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";

import { IcArrowLeft } from "@images/icons";
import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

import { DUMMY_GROUP_PASSWORD } from "../../constants";

const PASSWORD_LENGTH = 4;
const PASSWORD_INPUT_INDICES = Array.from(
  { length: PASSWORD_LENGTH },
  (_, index) => index,
);

interface JoinPasswordProps {
  roomId: number;
  isOpen: boolean;
  handleClose: () => void;
}

export default function JoinPassword({
  // roomId, 추후 서버에 해당 id로 요청
  isOpen,
  handleClose,
}: JoinPasswordProps) {
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [password, setPassword] = useState<string[]>(
    Array(PASSWORD_LENGTH).fill(""),
  );

  const handleChangePassword = (index: number, text: string) => {
    const value = text.slice(-1);
    const nextPassword = [...password];
    nextPassword[index] = value;

    setPassword(nextPassword);

    if (value && index < PASSWORD_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (value && index === PASSWORD_LENGTH - 1) {
      console.log(...nextPassword);
    }
  };

  const allInput = password.join("");

  // TODO: 추후 서버에서 온 응답으로 수정
  const isError = allInput.length === 4 && allInput !== DUMMY_GROUP_PASSWORD;

  useEffect(() => {
    if (allInput.length === 4) {
      // TODO : 서버에 비밀번호 요청
      if (!isError) {
        Toast.show({
          type: "default",
          text1: "모임방 참여가 완료되었어요! 모집 마감 후 활동이 시작돼요.",
        });
        handleClose();
      }
    }
  }, [allInput, isError, handleClose]);

  return (
    isOpen && (
      <Pressable style={styles.page} onPress={Keyboard.dismiss}>
        <View style={styles.header}>
          <Pressable
            onPress={handleClose}
            accessibilityRole="button"
            accessibilityLabel="비밀번호 입력 닫기"
            hitSlop={10}
          >
            <IcArrowLeft />
          </Pressable>
        </View>
        <View style={styles.content}>
          <AppText
            weight="semibold"
            size="lg"
            color={colors.white}
            lineHeight={24}
          >
            비밀번호를 입력해주세요.
          </AppText>
          <Pressable
            style={styles.passwordWrapper}
            onPress={(event) => event.stopPropagation()}
          >
            <View style={styles.inputWrapper}>
              {PASSWORD_INPUT_INDICES.map((index) => (
                <TextInput
                  key={index}
                  ref={(input) => {
                    inputRefs.current[index] = input;
                  }}
                  style={[
                    styles.input,
                    isError && { borderWidth: 1, borderColor: colors.red },
                  ]}
                  value={password[index]}
                  onChangeText={(text) => handleChangePassword(index, text)}
                  cursorColor={colors.neongreen}
                  selectionColor={colors.neongreen}
                  autoFocus={index === 0}
                  keyboardType="number-pad"
                  maxLength={1}
                />
              ))}
            </View>
            {isError && (
              <AppText weight="regular" size="xs" color={colors.red}>
                비밀번호가 일치하지 않습니다.
              </AppText>
            )}
          </Pressable>
        </View>
      </Pressable>
    )
  );
}

const styles = StyleSheet.create({
  page: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: colors.black.main,
    zIndex: 10,
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  content: {
    marginTop: 120,
    gap: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  passwordWrapper: {
    gap: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  inputWrapper: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  input: {
    color: colors.white,
    fontWeight: 600,
    fontSize: 18,
    fontFamily: "Paperlogy_600",
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.darkgrey.main,
    textAlign: "center",
  },
});
