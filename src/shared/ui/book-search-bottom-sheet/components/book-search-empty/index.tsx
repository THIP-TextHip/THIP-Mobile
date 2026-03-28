import { router } from "expo-router";
import { useCallback } from "react";
import { StyleSheet, View } from "react-native";

import { colors } from "@theme/token";

import AppText from "../../../app-text";
import { CustomButton } from "../../../button";

interface BookSearchEmptyProps {
  searchText: string;
  bookType: "SAVED" | "JOINING";
  handleClose: () => void;
}

export default function BookSearchEmpty({
  searchText,
  bookType,
  handleClose,
}: BookSearchEmptyProps) {
  const handleToBookRequestPage = useCallback(() => {
    handleClose();
    router.push("/book-request");
  }, [handleClose]);

  return (
    <View style={styles.emptyContainer}>
      <AppText
        weight="regular"
        size="sm"
        color={colors.grey[50]}
        lineHeight={20}
        style={{ textAlign: "center" }}
      >
        {searchText !== ""
          ? `현재 등록된 책이 아닙니다.\n원하시는 책을 신청해주세요.`
          : bookType === "SAVED"
            ? `아직 저장한 책이 없어요.\n마음에 드는 책을 THIP 해보세요!`
            : `아직 소속된 모임방이 없어요.\n마음에 드는 모임방에 참여해보세요!`}
      </AppText>
      {searchText !== "" && (
        <CustomButton handlePress={handleToBookRequestPage}>
          <AppText
            weight="semibold"
            size="base"
            color={colors.white}
            lineHeight={24}
          >
            책 신청하기
          </AppText>
        </CustomButton>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
});
