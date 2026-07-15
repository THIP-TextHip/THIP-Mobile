import { router } from "expo-router";
import { useCallback } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { type MyRoomListType } from "@apis/room";
import { IcGroupWhite } from "@images/icons";
import { colors } from "@theme/token";

import AppText from "../app-text";

export default function MyGroupCard({
  roomId,
  bookImageUrl,
  roomName,
  recruitCount,
  memberCount,
  endDate,
  type,
}: MyRoomListType) {
  const handleToGroupDetail = useCallback(() => {
    router.push({
      pathname: "/group-detail/[roomId]",
      params: { roomId: String(roomId) },
    });
  }, [roomId]);

  const handleToJoinGroup = () => {
    router.push({
      pathname: "/join-group/[roomId]",
      params: { roomId: String(roomId) },
    });
  };

  return (
    <Pressable
      style={styles.container}
      onPress={type === "recruiting" ? handleToJoinGroup : handleToGroupDetail}
    >
      <Image source={{ uri: bookImageUrl }} style={styles.image} />
      <View style={styles.content}>
        <AppText
          weight="semibold"
          size="lg"
          lineHeight={24}
          color={colors.white}
          numberOfLines={1}
        >
          {roomName}
        </AppText>
        <View style={styles.info}>
          <View style={styles.memberWrapper}>
            <IcGroupWhite />
            {type === "recruiting" ? (
              <AppText weight="medium" size="xs" color={colors.grey[100]}>
                <AppText weight="semibold" size="xs" color={colors.white}>
                  {memberCount}
                </AppText>{" "}
                / {recruitCount}명
              </AppText>
            ) : (
              <AppText weight="medium" size="sm" color={colors.white}>
                {memberCount}명
              </AppText>
            )}
          </View>
          {type !== "expired" && (
            <AppText
              weight="semibold"
              size="xs"
              lineHeight={20}
              color={type === "playing" ? colors.grey[100] : colors.red}
            >
              {endDate} {type === "playing" ? "종료" : "모집 마감"}
            </AppText>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    backgroundColor: colors.darkgrey.main,
    borderRadius: 12,
  },
  image: {
    width: 80,
    height: 107,
  },
  content: {
    flex: 1,
    gap: 8,
  },
  info: {
    gap: 4,
  },
  memberWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
});
