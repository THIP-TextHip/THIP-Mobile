import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useCreateRoomMutation } from "@apis/room";
import type { GroupCategoryType } from "@shared/types";
import {
  BookSearchBottomSheet,
  BookSelectSection,
  type BottomSheetBookItemType,
  VisibilitySection,
} from "@shared/ui";
import { getKoreaDate, parseStringToDate } from "@shared/utils";
import { useSelectedBookStore } from "@stores/selected-book";
import { colors } from "@theme/token";

import {
  CreateGroupDescSection,
  CreateGroupGenreSection,
  CreateGroupHeader,
  CreateGroupTitleSection,
  SelectGroupDurationSection,
  SelectMemberCountSection,
} from "./components";
import { DAY_IN_MS } from "./constants";

// TODO: 비공개 설정 시 비밀번호 입력 부분 추가
export default function CreateGroupScreen() {
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation();
  const { selectedBookInfo, clearSelectedBookInfo } = useSelectedBookStore();
  const { createRoom, isPendingCreateRoom } = useCreateRoomMutation();

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [groupBook, setGroupBook] = useState<BottomSheetBookItemType | null>(
    selectedBookInfo ?? null,
  );
  const [selectedCategory, setSelectedCategory] =
    useState<GroupCategoryType | null>(null);
  const [groupTitle, setGroupTitle] = useState("");
  const [groupDesc, setGroupDesc] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [memberCount, setMemberCount] = useState(15);
  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState("");

  const [durationErrorMessage, setDurationErrorMessage] = useState("");

  const cleanedPassword = password.trim();

  const disabled =
    groupBook === null ||
    selectedCategory === null ||
    groupTitle.trim() === "" ||
    groupDesc.trim() === "" ||
    durationErrorMessage !== "" ||
    (!isPublic && cleanedPassword.length !== 4);

  useEffect(() => {
    return navigation.addListener("beforeRemove", () => {
      clearSelectedBookInfo();
    });
  }, [clearSelectedBookInfo, navigation]);

  useEffect(() => {
    const today = getKoreaDate();
    const parsedStartDate = parseStringToDate(startDate);
    const parsedEndDate = parseStringToDate(endDate);

    if (!parsedStartDate || !parsedEndDate) {
      setDurationErrorMessage("오류가 발생했습니다. 재시도 해주세요.");
      return;
    }

    const durationDays =
      (parsedEndDate.getTime() - parsedStartDate.getTime()) / DAY_IN_MS;

    if (parsedStartDate <= today || parsedEndDate <= today) {
      setDurationErrorMessage("모임 기간은 오늘 이후부터 설정 가능합니다.");
      return;
    }

    if (parsedEndDate <= parsedStartDate) {
      setDurationErrorMessage("종료일은 시작일 다음 날부터 선택할 수 있어요.");
      return;
    }

    if (durationDays > 90) {
      setDurationErrorMessage("모임 기간은 최대 90일 까지 설정 가능합니다.");
      return;
    }

    setDurationErrorMessage("");
  }, [startDate, endDate]);

  const handleOpenBottomSheet = () => {
    setIsBottomSheetVisible(true);
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetVisible(false);
  };

  const handleSelectCategory = (category: GroupCategoryType) => {
    setSelectedCategory((prev) => {
      if (prev === category) return null;
      return category;
    });
  };

  const handleCreateGroup = () => {
    createRoom(
      {
        isbn: groupBook?.isbn ?? "",
        category: selectedCategory ?? "",
        roomName: groupTitle,
        description: groupDesc,
        progressStartDate: startDate,
        progressEndDate: endDate,
        recruitCount: memberCount,
        password: isPublic ? null : cleanedPassword,
        isPublic: isPublic,
      },
      { onSettled: clearSelectedBookInfo },
    );
  };

  const Separator = () => {
    return <View style={styles.separator} />;
  };

  if (isPendingCreateRoom) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <CreateGroupHeader
        disabled={disabled}
        handleConfirm={handleCreateGroup}
      />

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView
          nestedScrollEnabled
          contentContainerStyle={[
            styles.content,
            { paddingBottom: bottom + 20 },
          ]}
        >
          <BookSelectSection
            isAlreadySelected={selectedBookInfo !== null}
            book={groupBook}
            handleOpenBottomSheet={handleOpenBottomSheet}
          />
          <Separator />
          <CreateGroupGenreSection
            selectedCategory={selectedCategory}
            handleChangeCategory={handleSelectCategory}
          />
          <Separator />
          <CreateGroupTitleSection
            groupTitle={groupTitle}
            handleChangeGroupTitle={setGroupTitle}
          />
          <Separator />
          <CreateGroupDescSection
            groupDesc={groupDesc}
            handleChangeGroupDesc={setGroupDesc}
          />
          <Separator />
          <SelectGroupDurationSection
            startDate={startDate}
            endDate={endDate}
            errorMessage={durationErrorMessage}
            handleChangeStartDate={setStartDate}
            handleChangeEndDate={setEndDate}
          />
          <Separator />
          <SelectMemberCountSection
            memberCount={memberCount}
            handleChangeMemberCount={setMemberCount}
          />
          <Separator />
          <VisibilitySection
            createType="room"
            isPublic={isPublic}
            password={password}
            handleChangeVisibility={setIsPublic}
            handleChangePassword={setPassword}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      <BookSearchBottomSheet
        isVisible={isBottomSheetVisible}
        handleSelectBook={setGroupBook}
        handleClose={handleCloseBottomSheet}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    paddingVertical: 20,
    gap: 32,
  },
  separator: {
    marginHorizontal: 20,
    height: 1,
    backgroundColor: colors.darkgrey.dark,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
