import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { AppText } from "@shared/ui";
import { colors } from "@theme/token";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "./custom-tab-bar.styles";

export const CustomTabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  return (
    <SafeAreaView style={styles.outer} edges={["bottom"]}>
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
};
