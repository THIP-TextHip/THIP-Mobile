import { FlatList, Image, Pressable, StyleSheet, View } from "react-native";

import { AppText } from "@shared/ui";
import { colors } from "@theme/token";

import { IcGroupWhite } from "@/assets/images/icons";
import { router } from "expo-router";
import { RecommendRoomType } from "../../types";

interface RecommendGroupSectionProps {
  recommendRooms: RecommendRoomType[];
}

export default function RecommendGroupSection({
  recommendRooms,
}: RecommendGroupSectionProps) {
  const handleToJoinAnotherGroup = (roomId: number) => {
    router.push({
      pathname: "/join-group/[roomId]",
      params: { roomId: String(roomId) },
    });
  };
  return (
    <View style={styles.container}>
      <AppText
        weight="semibold"
        size="lg"
        color={colors.white}
        lineHeight={24}
        style={styles.title}
      >
        이런 모임방은 어때요?
      </AppText>
      <FlatList
        contentContainerStyle={styles.list}
        data={recommendRooms}
        keyExtractor={(item) => String(item.roomId)}
        renderItem={({ item }) => (
          <Pressable
            style={styles.room}
            onPress={() => handleToJoinAnotherGroup(item.roomId)}
          >
            <Image source={{ uri: item.bookImageUrl }} style={styles.image} />
            <View style={styles.info}>
              <AppText
                weight="semibold"
                size="sm"
                color={colors.white}
                lineHeight={24}
                numberOfLines={1}
              >
                {item.roomName}
              </AppText>
              <View style={styles.memberWrapper}>
                <IcGroupWhite width={20} height={20} />
                <AppText weight="medium" size="xs" color={colors.grey[100]}>
                  <AppText weight="semibold" size="xs" color={colors.white}>
                    {item.memberCount}
                  </AppText>{" "}
                  / {item.recruitCount}명
                </AppText>
              </View>
              <AppText
                weight="semibold"
                size="xs"
                color={colors.red}
                lineHeight={20}
              >
                {item.recruitEndDate} 뒤 모집 마감
              </AppText>
            </View>
          </Pressable>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  title: {
    paddingHorizontal: 20,
  },
  list: {
    paddingHorizontal: 20,
    gap: 20,
  },
  room: {
    padding: 12,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: colors.darkgrey.main,
    width: 232,
  },
  image: {
    width: 60,
    height: 80,
  },
  info: {
    gap: 4,
    flex: 1,
  },
  memberWrapper: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
  },
});
