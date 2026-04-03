import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { SavedBook, SavedFeed, SavedTopTabBar } from "./components";

export default function SavedScreen() {
  const [savedType, setSavedType] = useState<"FEED" | "BOOK">("FEED");

  return (
    <View style={styles.page}>
      <SavedTopTabBar type={savedType} handleChangeType={setSavedType} />
      {savedType === "FEED" ? <SavedFeed /> : <SavedBook />}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});
