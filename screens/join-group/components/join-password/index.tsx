import { useEffect, useRef, useState } from "react";
import { Keyboard, Pressable, StyleSheet, TextInput, View } from "react-native";

import {
  type ChangeRoomJoinStatusRequest,
  useVerifyPrivateRoomPassword,
} from "@apis/room";
import { IcArrowLeft } from "@images/icons";
import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

const PASSWORD_LENGTH = 4;
const PASSWORD_INPUT_INDICES = Array.from(
  { length: PASSWORD_LENGTH },
  (_, index) => index,
);

interface JoinPasswordProps {
  roomId: number;
  isOpen: boolean;
  handleClose: () => void;
  changeRoomJoinStatus: ({ roomId, type }: ChangeRoomJoinStatusRequest) => void;
}

export default function JoinPassword({
  roomId,
  isOpen,
  handleClose,
  changeRoomJoinStatus,
}: JoinPasswordProps) {
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const [password, setPassword] = useState<string[]>(
    Array(PASSWORD_LENGTH).fill(""),
  );
  const [isError, setIsError] = useState(false);

  const { verifyPrivateRoomPassword, isPendingVerifyPrivateRoomPassword } =
    useVerifyPrivateRoomPassword();

  const handleChangePassword = (index: number, text: string) => {
    const value = text.slice(-1);
    const nextPassword = [...password];
    nextPassword[index] = value;

    setIsError(false);
    setPassword(nextPassword);

    if (value && index < PASSWORD_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const allInput = password.join("");
  const lastVerifiedInputRef = useRef<string | null>(null);

  useEffect(() => {
    if (
      allInput.length === 4 &&
      !isPendingVerifyPrivateRoomPassword &&
      lastVerifiedInputRef.current !== allInput
    ) {
      lastVerifiedInputRef.current = allInput;
      verifyPrivateRoomPassword(
        { roomId, password: allInput },
        {
          onSuccess: (data) => {
            if (data.matched) {
              changeRoomJoinStatus({
                roomId,
                type: "join",
              });
              handleClose();
              setIsError(false);
              setPassword(Array(PASSWORD_LENGTH).fill(""));
            } else {
              setIsError(true);
            }
          },
        },
      );
    }
  }, [
    roomId,
    allInput,
    isPendingVerifyPrivateRoomPassword,
    changeRoomJoinStatus,
    verifyPrivateRoomPassword,
    handleClose,
  ]);

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
