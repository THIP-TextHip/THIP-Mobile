import { BlurView } from "expo-blur";
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
import { getDurationErrorMessage } from "./utils";

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
    !startDate ||
    !endDate ||
    durationErrorMessage !== "" ||
    (!isPublic && cleanedPassword.length !== 4);

  useEffect(() => {
    return navigation.addListener("beforeRemove", () => {
      clearSelectedBookInfo();
    });
  }, [clearSelectedBookInfo, navigation]);

  useEffect(() => {
    if (!startDate || !endDate) return;
    setDurationErrorMessage(getDurationErrorMessage(startDate, endDate) ?? "");
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
      { onSuccess: clearSelectedBookInfo },
    );
  };

  const Separator = () => {
    return <View style={styles.separator} />;
  };

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
          scrollEnabled={!isPendingCreateRoom}
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

      {isPendingCreateRoom && (
        <BlurView intensity={12} tint="dark" style={styles.linearBlur}>
          <ActivityIndicator size="large" color={colors.white} />
        </BlurView>
      )}
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
  linearBlur: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
});
