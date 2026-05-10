import { useState } from "react";
import { Keyboard, Pressable, StyleSheet, View } from "react-native";

import { RecordPageSection } from "@shared/ui";

import { RecordWriteHeader } from "./components";
import { DUMMY_RECORD_GROUP_STATE } from "./constants";

export default function RecordWriteScreen() {
  const [recordPage, setRecordPage] = useState(
    DUMMY_RECORD_GROUP_STATE.recentBookPage,
  );
  const [isOverview, setIsOverview] = useState(false);

  const handleChangeOverview = () => {
    setIsOverview((prev) => !prev);
  };

  return (
    <Pressable style={styles.page} onPress={Keyboard.dismiss}>
      <RecordWriteHeader disabled={true} handleWriteRecord={() => {}} />
      <View style={styles.content}>
        <RecordPageSection
          totalPage={DUMMY_RECORD_GROUP_STATE.totalBookPage}
          isOverviewPossible={DUMMY_RECORD_GROUP_STATE.isOverviewPossible}
          recordPage={recordPage}
          isOverview={isOverview}
          handleChangeRecordPage={setRecordPage}
          handleChangeOverview={handleChangeOverview}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  content: {
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
});
