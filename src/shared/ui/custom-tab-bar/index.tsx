import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { colors } from "@theme/token";
import { Pressable, View } from "react-native";

import AppText from "../app-text";
import { styles } from "./custom-tab-bar.styles";

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const focusedKey = state.routes[state.index]?.key;
  const routes = state.routes.filter((route) => route.name !== "alarm");

  return (
    <View style={styles.tabBarOuter}>
      <View style={styles.tabBarContainer}>
        {routes.map((route) => {
          const focused = focusedKey === route.key;
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
    </View>
  );
}
