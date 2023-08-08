import { Flex } from "@mantine/core";
import Link from "next/link";
import { useMediaQuery } from "@mantine/hooks";
import { useAppSelector } from "@/hooks/redux";

import PortfolioIcon from "@/icons/portfolio-icon";
import GlobalIcon from "@/icons/global-icon";
import WalletNavIcon from "@/icons/wallet-nav-icon";

type Props = {
  selectedLink: "global" | "portfolio";
};

function PortfolioLink({ isSelected }: { isSelected: boolean }) {
  const userAddress = useAppSelector((state) => state.user.connectedWallet);
  if (!userAddress)
    return (
      <Link href="/collections/portfolio" style={{ pointerEvents: "none" }}>
        <PortfolioIcon status="disabled" />
      </Link>
    );
  return (
    <Link href="/collections/portfolio">
      <PortfolioIcon status={isSelected ? "selected" : "notSelected"} />
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
        <GlobalIcon selected={isGlobalSelected} />
      </Link>
      <PortfolioLink isSelected={isPortfolioSelected} />
    </Flex>
  );
}
