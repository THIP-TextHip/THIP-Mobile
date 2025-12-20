import { AppText, CustomHeader } from "@shared/ui";
import { colors } from "@theme/token";

export default function SearchHeader() {
  return (
    <CustomHeader
      left={
        <AppText weight="bold" size="2xl" style={{ color: colors.white }}>
          검색
        </AppText>
      }
    />
  );
}
