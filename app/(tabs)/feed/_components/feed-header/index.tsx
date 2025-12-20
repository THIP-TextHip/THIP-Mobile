import Ionicons from "@expo/vector-icons/Ionicons";
import { AppText, CustomHeader } from "@shared/ui";
import { colors } from "@theme/token";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function FeedHeader() {
  const handleToSearchUser = () => {
    router.push("/search-user");
  };
  const handleToAlarm = () => {
    router.push("/alarm");
  };

  return (
    <CustomHeader
      left={
        <AppText
          weight="extrabold"
          size="2xl"
          style={{ color: colors.purple.main }}
        >
          Thip
        </AppText>
      }
      // TODO : icon 수정
      right={
        <View style={styles.iconWrapper}>
          <Ionicons
            name="person-add-outline"
            size={24}
            color={colors.white}
            onPress={handleToSearchUser}
          />
          <Ionicons
            name="alarm-outline"
            size={24}
            color={colors.white}
            onPress={handleToAlarm}
          />
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
});
