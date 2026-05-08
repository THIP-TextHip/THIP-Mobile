import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { GroupInfo } from "@shared/ui";

import { GroupBook, GroupDetailHeader, RecordBookOverview } from "./components";
import { DUMMY_GROUP_DETAIL } from "./constants";

export default function GroupDetailScreen() {
  const { bottom } = useSafeAreaInsets();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  // TODO: 추후 서버에서 데이터 가져오기. url 파라미터의 roomId 이용
  const {
    isHost, // TODO: isHost는 더보기 클릭 시 다른 바텀시트가 올라오도록 할 때 사용
    roomId,
    roomName,
    roomImageUrl,
    isPublic,
    progressStartDate,
    progressEndDate,
    category,
    categoryColor,
    roomDescription,
    memberCount,
    recruitCount,
    isbn,
    bookTitle,
    authorName,
    currentPage,
    userPercentage,
    currentVotes,
  } = DUMMY_GROUP_DETAIL;

  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(true);
  };
  return (
    <View style={styles.page}>
      <GroupDetailHeader handlePressMore={handleOpenBottomSheet} />
      <ScrollView contentContainerStyle={{ paddingBottom: bottom + 20 }}>
        <GroupInfo
          roomId={roomId}
          roomName={roomName}
          roomImageUrl={roomImageUrl}
          isPublic={isPublic}
          progressStartDate={progressStartDate}
          progressEndDate={progressEndDate}
          category={category}
          categoryColor={categoryColor}
          roomDescription={roomDescription}
          memberCount={memberCount}
          recruitCount={recruitCount}
        />
        <View style={styles.content}>
          <GroupBook
            isbn={isbn}
            bookTitle={bookTitle}
            authorName={authorName}
          />
          <RecordBookOverview
            roomId={roomId}
            currentPage={currentPage}
            userPercentage={userPercentage}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    gap: 20,
  },
});
