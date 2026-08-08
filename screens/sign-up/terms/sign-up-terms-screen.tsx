import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { AppText, ButtonHeader, CustomHeader } from "@shared/ui";
import { colors } from "@theme/token";

import { TermsAgreementRow, TermsNotice } from "./components";
import {
  INITIAL_TERMS_AGREEMENTS,
  TERMS_AGREEMENT_LIST,
  type TermsAgreementId,
  type TermsAgreements,
} from "./constants";

export default function SignUpTermsScreen() {
  const [agreements, setAgreements] = useState<TermsAgreements>(
    INITIAL_TERMS_AGREEMENTS,
  );

  const isAllAgreed = TERMS_AGREEMENT_LIST.every((item) => agreements[item.id]);

  const toggleAgreement = (id: TermsAgreementId) => {
    setAgreements((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAllAgreements = () => {
    const nextChecked = !isAllAgreed;

    setAgreements(
      TERMS_AGREEMENT_LIST.reduce<TermsAgreements>(
        (acc, item) => ({ ...acc, [item.id]: nextChecked }),
        { ...INITIAL_TERMS_AGREEMENTS },
      ),
    );
  };

  const handleClickNext = () => {
    if (!isAllAgreed) return;
    router.push("/sign-up/nickname");
  };

  return (
    <View style={styles.screen}>
      <CustomHeader
        center={
          <AppText
            weight="bold"
            size="2xl"
            color={colors.white}
            lineHeight={24}
          >
            약관 동의
          </AppText>
        }
        right={
          <ButtonHeader
            disabled={!isAllAgreed}
            handleClickButton={handleClickNext}
          >
            다음
          </ButtonHeader>
        }
      />
      <View style={styles.page}>
        <TermsNotice />
        <View style={styles.agreementSection}>
          <TermsAgreementRow
            label="위 내용과 약관에 모두 동의합니다"
            checked={isAllAgreed}
            handleToggle={toggleAllAgreements}
            isEmphasized
          />
          <View style={styles.divider} />
          <View style={styles.agreementList}>
            {TERMS_AGREEMENT_LIST.map((item) => (
              <TermsAgreementRow
                key={item.id}
                label={item.label}
                url={item.url}
                checked={agreements[item.id]}
                handleToggle={() => toggleAgreement(item.id)}
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  page: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 40,
    gap: 30,
  },
  agreementSection: {
    gap: 16,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: colors.darkgrey.main,
  },
  agreementList: {
    gap: 16,
  },
});
