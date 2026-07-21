import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "@theme/token";

import AppText from "../app-text";
import { styles } from "./custom-tab-bar.styles";

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const focusedKey = state.routes[state.index]?.key;
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.tabBarOuter, { paddingBottom: bottom }]}>
      <View style={styles.tabBarContainer}>
        {state.routes.map((route) => {
          const focused = focusedKey === route.key;
          const { options } = descriptors[route.key];

          const color = focused ? colors.purple.main : colors.grey[300];
          const size = 24;

          const icon =
            typeof options.tabBarIcon === "function"
              ? options.tabBarIcon({ focused, color, size })
              : null;

          const handleTabPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <Pressable
              key={route.key}
              onPress={handleTabPress}
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
