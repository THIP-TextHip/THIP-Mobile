import { router } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import { useGetMyFollowingsPreviewQuery } from "@apis/user";
import { IcGroupWhite, IcRightRight } from "@images/icons";
import { CharacterSearch } from "@images/thip";
import { AppText, ProfileImage } from "@shared/ui";
import { colors } from "@theme/token";

export default function MyThipPreview() {
  // TODO: 추후에 로딩 처리는 스켈레톤, 에러 처리도 추가 필요
  const {
    myFollowingListPreview,
    isPendingMyFollowingsPreview,
    // isErrorMyFollowingsPreview,
  } = useGetMyFollowingsPreviewQuery();
  const [visibleCount, setVisibleCount] = useState(0);

  const handleItemAreaLayout = useCallback((e: LayoutChangeEvent) => {
    const width = e.nativeEvent.layout.width;

    // 화살표 너비 : 24 / 마지막 아이템에는 gap 없이 너비만 적용 : -12
    const count = Math.floor((width - 12) / 48);

    setVisibleCount(count);
  }, []);

  const visibleItems = useMemo(
    () => myFollowingListPreview?.myFollowingUsers.slice(0, visibleCount),
    [myFollowingListPreview?.myFollowingUsers, visibleCount],
  );

  const handleToMyThipList = () => {
    router.push("/my-thip-list");
  };

  const handleToSearchUser = () => {
    router.push("/search-user");
  };

  if (isPendingMyFollowingsPreview) {
    return (
      <View style={styles.status}>
        <ActivityIndicator size="large" color={colors.white} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IcGroupWhite />
        <AppText weight="semibold" size="2xs" color={colors.white}>
          내띱
        </AppText>
      </View>
      {myFollowingListPreview?.myFollowingUsers.length === 0 ? (
        <Pressable style={styles.empty} onPress={handleToSearchUser}>
          <AppText
            weight="medium"
            size="sm"
            color={colors.white}
            lineHeight={20}
          >
            관심있는 독서메이트를 찾아보세요!
          </AppText>
          <CharacterSearch style={styles.character} width={32} height={33} />
        </Pressable>
      ) : (
        <View style={styles.content} onLayout={handleItemAreaLayout}>
          <View style={styles.itemWrapper}>
            {visibleItems?.map((item) => (
              <View key={item.userId} style={styles.item}>
                <ProfileImage image={item.profileImageUrl} />
                <AppText
                  weight="regular"
                  size="2xs"
                  color={colors.white}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.nickname}
                </AppText>
              </View>
            ))}
          </View>
          <Pressable onPress={handleToMyThipList}>
            <IcRightRight />
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemWrapper: {
    flexDirection: "row",
    gap: 12,
  },
  item: {
    gap: 7,
    alignItems: "center",
    width: 36,
  },
  status: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  empty: {
    marginVertical: 8,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: colors.darkgrey.main,
  },
  character: {
    position: "absolute",
    bottom: 0,
    right: 12,
  },
});
