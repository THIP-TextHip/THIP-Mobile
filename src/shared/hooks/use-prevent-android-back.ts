import { useSegments } from "expo-router";
import { useEffect, useMemo, useRef } from "react";
import { BackHandler, Platform } from "react-native";

const TAB_ROUTES = new Set([
  "feed",
  "group",
  "search",
  "my-page",
  "search-user",
]);
const ANDROID_BLOCK_ROUTES = new Set(["login"]);

export function usePreventAndroidBack() {
  const segments = useSegments();

  const shouldBlock = useMemo(() => {
    const first = String(segments[0] ?? "");
    const second = String(segments[1] ?? "");

    const isLogin = ANDROID_BLOCK_ROUTES.has(first);

    const isTabRoot =
      first === "(tabs)" && segments.length === 2 && TAB_ROUTES.has(second);

    return isLogin || isTabRoot;
  }, [segments]);

  const shouldBlockRef = useRef(shouldBlock);
  useEffect(() => {
    shouldBlockRef.current = shouldBlock;
  }, [shouldBlock]);

  useEffect(() => {
    if (Platform.OS !== "android") return;

    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      return shouldBlockRef.current; // true면 뒤로가기 막힘
    });

    return () => sub.remove();
  }, []);
}
