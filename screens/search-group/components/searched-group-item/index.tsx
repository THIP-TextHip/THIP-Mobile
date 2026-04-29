import { router } from "expo-router";
import { Image, Pressable, StyleSheet, View } from "react-native";

import { IcGroupWhite } from "@images/icons";
import { AppText, PrivateRoomImage } from "@shared/ui";
import { colors } from "@theme/token";

import { SearchGroupType } from "../../types";

interface SearchedGroupItemProps {
  searchedGroup: SearchGroupType;
}

export default function SearchedGroupItem({
  searchedGroup,
}: SearchedGroupItemProps) {
  const handleToJoinGroup = () => {
    router.push({
      pathname: "/join-group/[roomId]",
      params: { roomId: String(searchedGroup.roomId) },
    });
  };

  return (
    <Pressable style={styles.container} onPress={handleToJoinGroup}>
      {searchedGroup.isPublic ? (
        <Image
          source={{ uri: searchedGroup.bookImageUrl }}
          style={styles.image}
        />
      ) : (
        <PrivateRoomImage
          image={searchedGroup.bookImageUrl}
          width={60}
          height={80}
        />
      )}

      <View style={styles.infoWrapper}>
        <AppText
          weight="semibold"
          size="lg"
          color={colors.white}
          lineHeight={24}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {searchedGroup.roomName}
        </AppText>
        <View style={styles.memberWrapper}>
          <IcGroupWhite />
          <AppText weight="medium" size="xs" color={colors.grey[100]}>
            <AppText weight="semibold" size="xs" color={colors.white}>
              {searchedGroup.memberCount}
            </AppText>{" "}
            / {searchedGroup.recruitCount}명
          </AppText>
        </View>
        <AppText weight="semibold" size="xs" color={colors.red} lineHeight={20}>
          {searchedGroup.deadlineDate} 모집 마감
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 80,
  },
  infoWrapper: {
    flex: 1,
    minWidth: 0,
    gap: 4,
  },
  memberWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
});
