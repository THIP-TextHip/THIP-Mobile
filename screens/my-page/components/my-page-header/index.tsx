import { AppText, CustomHeader } from "@shared/ui";
import { colors } from "@theme/token";

export default function MyPageHeader() {
  return (
    <CustomHeader
      left={
        <AppText
          weight="bold"
          size="2xl"
          style={{ color: colors.white }}
          lineHeight={24}
        >
          내 정보
        </AppText>
      }
    />
  );
}
