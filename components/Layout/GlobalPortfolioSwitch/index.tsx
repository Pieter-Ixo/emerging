import { Flex } from "@mantine/core";
import Link from "next/link";
import { useMediaQuery } from "@mantine/hooks";

import WalletNavIcon from "@/icons/wallet-nav-icon";
import GlobalIcon from "@/assets/icons/global.svg";
import BaseIcon from "@/icons";
import PortfolioLink from "./components/PortfolioLink";

type Props = {
  selectedLink: "global" | "portfolio";
};

export default function GlobalPortfolioSwitch({
  selectedLink = "global",
}: Props) {
  const isGlobalSelected = selectedLink === "global";
  const isPortfolioSelected = selectedLink === "portfolio";

  const isScreenWiderThanMobile = useMediaQuery("(min-width: 768px)");

  return (
    <Flex align="center" gap={16}>
      {!isScreenWiderThanMobile && <WalletNavIcon />}
      <Link href="/collections/global">
        <BaseIcon
          Icon={GlobalIcon}
          width={24}
          isPointer
          height={25}
          status={isGlobalSelected ? "selected" : "notSelected"}
          variant="circle"
        />
      </Link>
      <PortfolioLink isSelected={isPortfolioSelected} />
    </Flex>
  );
}
