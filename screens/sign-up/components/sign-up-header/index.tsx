import { ReactNode } from "react";

import { CustomHeader } from "@shared/ui";

interface SignUpHeaderProps {
  center?: ReactNode;
  disabled: boolean;
  handleClickButton: () => void;
}

export default function SignUpHeader({
  center,
  disabled,
  handleClickButton,
}: SignUpHeaderProps) {
  return <CustomHeader center={center} />;
}
