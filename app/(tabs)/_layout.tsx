import { Tabs } from "expo-router";

import {
  IcBooksearch,
  IcBooksearchFilled,
  IcFeed,
  IcFeedFilled,
  IcGroup,
  IcGroupFilled,
  IcMypage,
  IcMypageFilled,
} from "@images/icons";
import { usePreventAndroidBack } from "@shared/hooks";
import { CustomTabBar } from "@shared/ui";
import { colors } from "@theme/token";

export default function TabLayout() {
  // 탭 내부 경로일 때, 안드로이드 뒤로가기 버튼 막기
  usePreventAndroidBack();
  // TODO: 탭바 아이콘 수정
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.black.main },
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="feed"
        options={{
          title: "피드",
          tabBarIcon: ({ focused }) =>
            focused ? <IcFeedFilled /> : <IcFeed />,
        }}
      />
      <Tabs.Screen
        name="group"
        options={{
          title: "모임",
          tabBarIcon: ({ focused }) =>
            focused ? <IcGroupFilled /> : <IcGroup />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "검색",
          tabBarIcon: ({ focused }) =>
            focused ? <IcBooksearchFilled /> : <IcBooksearch />,
        }}
      />
      <Tabs.Screen
        name="my-page"
        options={{
          title: "내 정보",
          tabBarIcon: ({ focused }) =>
            focused ? <IcMypageFilled /> : <IcMypage />,
        }}
      />
      <Tabs.Screen
        name="search-user"
        options={{
          title: "사용자 검색",
          tabBarIcon: () => null,
          tabBarButton: () => null,
        }}
      />
    </Tabs>
  );
}
