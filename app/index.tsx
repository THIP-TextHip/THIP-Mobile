import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { getAuthToken } from "@apis/token-storage";
import { colors } from "@theme/token";

type InitialRoute = "/(tabs)/feed" | "/login";

export default function Index() {
  const [initialRoute, setInitialRoute] = useState<InitialRoute | null>(null);

  useEffect(() => {
    let isMounted = true;

    const resolveInitialRoute = async () => {
      try {
        const token = await getAuthToken();

        if (isMounted) {
          setInitialRoute(token ? "/(tabs)/feed" : "/login");
        }
      } catch (error) {
        console.error("[Index] token read failed", error);

        if (isMounted) {
          setInitialRoute("/login");
        }
      }
    };

    resolveInitialRoute();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!initialRoute) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={colors.white} />
      </View>
    );
  }

  return <Redirect href={initialRoute} />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.black.main,
  },
});
