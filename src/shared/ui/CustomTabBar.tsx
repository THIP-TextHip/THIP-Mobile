import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { colors } from "@theme/token";
import { AppText } from "@ui/AppText";
import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <SafeAreaView style={styles.outer}>
      <View style={styles.tabBarContainer}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const { options } = descriptors[route.key];

          const color = focused ? colors.purple.main : colors.grey[300];
          const size = 24;

          const icon =
            typeof options.tabBarIcon === "function"
              ? options.tabBarIcon({ focused, color, size })
              : null;

          return (
            <Pressable
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              style={styles.tabBarItemContainer}
            >
              <View style={styles.tabBarItemIcon}>{icon}</View>
              <AppText
                weight="medium"
                size="xs"
                color={focused ? colors.purple.main : colors.grey[300]}
                style={styles.tabBarItemTitle}
              >
                {options.title ?? route.name}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outer: {
    backgroundColor: colors.black.main,
  },

  tabBarContainer: {
    flexDirection: "row",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.grey[300],
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  tabBarItemContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },

  tabBarItemIcon: {
    display: "flex",
    alignSelf: "center",
  },

  tabBarItemTitle: {
    textAlign: "center",
  },
});
