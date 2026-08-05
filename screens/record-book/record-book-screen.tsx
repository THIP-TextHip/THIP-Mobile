import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import { type RoomPostType } from "@apis/room";
import {
  useGetRoomBookPageQuery,
  useGetRoomPostListQuery,
} from "@apis/room-post";
import { IcAlertGrey } from "@images/icons";
import { useDelayedLoading } from "@shared/hooks";
import { AppText, LoadingIndicator } from "@shared/ui";
import RecordBookPostItemSkeleton from "./components/record-book-post-item/skeleton";
import {
  useRecordBookAlarmStore,
  useRoomDetailVoteStore,
} from "@stores/record-book";
import { colors } from "@theme/token";

import {
  RecordBookFilter,
  RecordBookFloating,
  RecordBookHeader,
  RecordBookPostItem,
  RecordBookTopTabBar,
  RecordCommentBottomSheet,
} from "./components";
import { GROUP_RECORD_SORT } from "./constants";
import { RoomPostSortTypeWithLabel } from "./types";

export default function RecordBookScreen() {
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation();
  const { roomId } = useLocalSearchParams<{ roomId: string }>();
  const { recordBookAlarmInfo, clearRecordBookAlarmInfo } =
    useRecordBookAlarmStore();
  const { roomDetailVote, clearRoomDetailVote } = useRoomDetailVoteStore();
  const [isMyRecord, setIsMyRecord] = useState(false);
  const [selectedChip, setSelectedChip] = useState<"page" | "overview" | null>(
    recordBookAlarmInfo
      ? "page"
      : roomDetailVote
        ? roomDetailVote.isOverview
          ? "overview"
          : "page"
        : null,
  );
  const [pageSettingMode, setPageSettingMode] = useState(false);
  const [selectedPages, setSelectedPages] = useState<{
    start: number | null;
    end: number | null;
  }>({
    start: recordBookAlarmInfo
      ? recordBookAlarmInfo.page
      : roomDetailVote && !roomDetailVote.isOverview
        ? roomDetailVote.page
        : null,
    end: recordBookAlarmInfo
      ? recordBookAlarmInfo.page
      : roomDetailVote && !roomDetailVote.isOverview
        ? roomDetailVote.page
        : null,
  });

  const [sortType, setSortType] = useState<RoomPostSortTypeWithLabel>(
    GROUP_RECORD_SORT[0],
  );
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(
    recordBookAlarmInfo ? recordBookAlarmInfo.openComments : false,
  );
  const [postIdForComment, setPostIdForComment] = useState<number | null>(
    recordBookAlarmInfo ? recordBookAlarmInfo.postId : null,
  );
  const [postTypeForComment, setPostTypeForComment] =
    useState<RoomPostType | null>(
      recordBookAlarmInfo ? recordBookAlarmInfo.postType : null,
    );

  const {
    bookPageInfo,
    isPendingBookPageInfo,
    isErrorBookPageInfo,
    bookPageInfoError,
    refetchBookPageInfo,
    isRefetchingBookPageInfo,
  } = useGetRoomBookPageQuery(roomId);

  const {
    roomPostList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPendingRoomPostList,
    isErrorRoomPostList,
    roomPostListError,
    refetchRoomPostList,
    isRefetchingRoomPostList,
  } = useGetRoomPostListQuery({
    roomId,
    type: isMyRecord ? "mine" : "group",
    sort: isMyRecord ? null : sortType.type,
    pageStart: isMyRecord ? null : selectedPages.start,
    pageEnd: isMyRecord ? null : selectedPages.end,
    isOverview: isMyRecord ? null : selectedChip === "overview",
    isPageFilter: isMyRecord ? null : selectedChip === "page",
  });

  const handleLoadMore = () => {
    if (!hasNextPage || isFetchingNextPage) return;

    fetchNextPage();
  };

  const handleRefetch = () => {
    refetchBookPageInfo();
    refetchRoomPostList();
  };

  const handleGroupRecord = () => {
    setIsMyRecord(false);
  };

  const handleMyRecord = () => {
    setIsMyRecord(true);
  };

  const handlePressPageChip = () => {
    if (selectedChip !== "page") {
      if (selectedPages.start !== null || selectedPages.end !== null) {
        setSelectedChip("page");
        return;
      }
    }
    setPageSettingMode(true);
  };

  const handleResetPage = () => {
    setSelectedPages({ start: null, end: null });
    setPageSettingMode(false);
    setSelectedChip(null);
  };

  const handleApplyPage = (start: number | null, end: number | null) => {
    if (start && end && start > end) {
      Toast.show({
        type: "error",
        text1: "설정하신 값이 책의 총 페이지보다 작아야 합니다.",
      });

      return;
    }
    if (
      (start && bookPageInfo && start > bookPageInfo.totalBookPage) ||
      (end && bookPageInfo && end > bookPageInfo.totalBookPage)
    ) {
      Toast.show({
        type: "error",
        text1: "설정하신 값이 책의 총 페이지보다 작아야 합니다.",
      });

      return;
    }

    setPageSettingMode(false);
    setSelectedPages({ start, end });
    if (start === null && end === null) {
      setSelectedChip(null);
      return;
    }
    setSelectedChip("page");
  };

  const handlePressOverviewChip = () => {
    if (!bookPageInfo?.isOverviewPossible) {
      Toast.show({
        type: "error",
        text1: "독서 진행도 80% 이상부터 총평을 볼 수 있어요.",
      });
      return;
    }
    setSelectedChip((prev) => (prev === "overview" ? null : "overview"));
  };

  const handlePressDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleSelectType = (type: RoomPostSortTypeWithLabel) => {
    setSortType(type);
    setIsDropdownVisible(false);
  };

  const handleOpenComment = (postId: number, postType: RoomPostType) => {
    setPostIdForComment(postId);
    setPostTypeForComment(postType);
    setIsCommentOpen(true);
  };

  const handleCloseComment = () => {
    setPostIdForComment(null);
    setPostTypeForComment(null);
    setIsCommentOpen(false);
  };

  useEffect(() => {
    if (!roomId) {
      Toast.show({
        type: "error",
        text1: "잘못된 접근이에요. 다시 시도해 주세요.",
      });

      router.back();
    }
  }, [roomId]);

  useEffect(() => {
    if (isErrorBookPageInfo) {
      Toast.show({
        type: "error",
        text1: bookPageInfoError?.message,
      });

      router.back();
    }
  }, [isErrorBookPageInfo, bookPageInfoError?.message]);

  useEffect(() => {
    return navigation.addListener("beforeRemove", () => {
      clearRecordBookAlarmInfo();
      clearRoomDetailVote();
    });
  }, [clearRecordBookAlarmInfo, clearRoomDetailVote, navigation]);

  const isSkeletonVisible = useDelayedLoading(
    isPendingRoomPostList || isPendingBookPageInfo,
  );

  if (!roomId || isErrorBookPageInfo) return null;

  const RecordListHeader = () => {
    if (isMyRecord) return null;
    return (
      <View style={styles.listHeader}>
        <IcAlertGrey />
        <AppText weight="regular" size="xs" color={colors.grey[200]}>
          {selectedChip === "page"
            ? "페이지별 보기는 입력한 페이지의 글만 노출됩니다."
            : selectedChip === "overview"
              ? "총평 보기는 스포일러가 포함 될 수도 있습니다."
              : "내 진행도에 따라 일부 댓글은 블러처리됩니다."}
        </AppText>
      </View>
    );
  };

  const StatusView = () => {
    if (isPendingRoomPostList || isPendingBookPageInfo)
      return isSkeletonVisible ? <RecordBookPostItemSkeleton /> : null;
    return (
      <View style={styles.status}>
        {isErrorRoomPostList ? (
          <AppText
            weight="semibold"
            size="lg"
            color={colors.white}
            lineHeight={24}
          >
            데이터를 불러오지 못했어요 ({roomPostListError?.message})
          </AppText>
        ) : (
          <>
            <AppText
              weight="semibold"
              size="lg"
              color={colors.white}
              lineHeight={24}
            >
              아직 기록이 없어요
            </AppText>
            <AppText weight="regular" size="sm" color={colors.grey[100]}>
              {isMyRecord
                ? "나의 첫번째 기록을 남겨보세요"
                : selectedPages.start !== null &&
                  selectedPages.end !== null &&
                  "우리 모임의 첫번째 기록을 남겨보세요"}
            </AppText>
          </>
        )}
      </View>
    );
  };

  return (
    <View style={styles.page}>
      <RecordBookHeader />
      <RecordBookTopTabBar
        isMyRecord={isMyRecord}
        handleGroupRecord={handleGroupRecord}
        handleMyRecord={handleMyRecord}
      />
      {!isMyRecord && (
        <RecordBookFilter
          selectedChip={selectedChip}
          selectedPages={selectedPages}
          pageSettingMode={pageSettingMode}
          isDropdownVisible={isDropdownVisible}
          sortType={sortType}
          handlePressPageChip={handlePressPageChip}
          handleResetPage={handleResetPage}
          handleApplyPage={handleApplyPage}
          handlePressOverviewChip={handlePressOverviewChip}
          handlePressDropdown={handlePressDropdown}
          handleSelectType={handleSelectType}
        />
      )}
      {roomPostList.length === 0 ? (
        <StatusView />
      ) : (
        <>
          <FlatList
            contentContainerStyle={{ paddingBottom: bottom + 80 }}
            data={roomPostList}
            keyExtractor={(item) => String(item.postId)}
            renderItem={({ item }) => (
              <RecordBookPostItem
                roomId={Number(roomId)}
                post={item}
                handleOpenComment={handleOpenComment}
              />
            )}
            ListHeaderComponent={RecordListHeader}
            ListFooterComponent={
              isFetchingNextPage ? <LoadingIndicator variant="footer" /> : null
            }
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            refreshControl={
              <RefreshControl
                refreshing={
                  isRefetchingRoomPostList || isRefetchingBookPageInfo
                }
                onRefresh={handleRefetch}
                tintColor={colors.white}
                colors={[colors.white]}
              />
            }
          />
          {postIdForComment && postTypeForComment && (
            <RecordCommentBottomSheet
              roomId={roomId}
              postId={postIdForComment}
              postType={postTypeForComment}
              isVisible={isCommentOpen}
              handleClose={handleCloseComment}
            />
          )}
        </>
      )}

      <RecordBookFloating roomId={roomId} />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },

  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 16,
    gap: 4,
  },
  status: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 100,
  },
});
