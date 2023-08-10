import { Flex } from "@mantine/core";
import Link from "next/link";
import { useMediaQuery } from "@mantine/hooks";
import { useAppSelector } from "@/hooks/redux";

import WalletNavIcon from "@/icons/wallet-nav-icon";
import PortfolioIcon from "@/assets/icons/portfolio.svg";
import GlobalIcon from "@/assets/icons/global.svg";
import BaseIcon from "@/icons";

type Props = {
  selectedLink: "global" | "portfolio";
};

function PortfolioLink({ isSelected }: { isSelected: boolean }) {
  const userAddress = useAppSelector((state) => state.user.connectedWallet);
  if (!userAddress)
    return (
      <Link href="/collections/portfolio" style={{ pointerEvents: "none" }}>
        <BaseIcon
          Icon={PortfolioIcon}
          width={24}
          height={24}
          status="disabled"
          isBgCircle
        />
      </Link>
    );
  return (
    <Link href="/collections/portfolio">
      <BaseIcon
        Icon={PortfolioIcon}
        width={24}
        height={24}
        isCursor
        isBgCircle
        status={isSelected ? "selected" : "notSelected"}
      />
    </Link>
  );
}

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
          isCursor
          height={25}
          status={isGlobalSelected ? "selected" : "notSelected"}
          isBgCircle
        />

        {/* <GlobalIcon selected={isGlobalSelected} /> */}
      </Link>
      <PortfolioLink isSelected={isPortfolioSelected} />
    </Flex>
  );
}
