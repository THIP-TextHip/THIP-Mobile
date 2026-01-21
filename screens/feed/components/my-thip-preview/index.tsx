import { router } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { LayoutChangeEvent, Pressable, StyleSheet, View } from "react-native";

import { IcGroupWhite, IcRightRight } from "@images/icons";
import { AppText, ProfileImage } from "@shared/ui";
import { colors } from "@theme/token";

import { DUMMY_MY_THIP_LIST } from "../../constants";

export default function MyThipPreview() {
  const [visibleCount, setVisibleCount] = useState(0);

  const handleItemAreaLayout = useCallback((e: LayoutChangeEvent) => {
    const width = e.nativeEvent.layout.width;

    // 화살표 너비 : 24 / 마지막 아이템에는 gap 없이 너비만 적용 : -12
    const count = Math.floor((width - 12) / 48);

    setVisibleCount(count);
  }, []);

  const visibleItems = useMemo(
    () => DUMMY_MY_THIP_LIST.slice(0, visibleCount),
    [visibleCount],
  );

  const handleToMyThipList = () => {
    router.push("/my-thip-list");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IcGroupWhite />
        <AppText weight="semibold" size="2xs" color={colors.white}>
          내 띱
        </AppText>
      </View>
      <View style={styles.content} onLayout={handleItemAreaLayout}>
        <View style={styles.itemWrapper}>
          {visibleItems.map((item) => (
            <View key={item.userId} style={styles.item}>
              <ProfileImage image={item.profileImage} />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
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
});
