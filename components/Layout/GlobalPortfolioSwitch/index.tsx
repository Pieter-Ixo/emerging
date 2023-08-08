import { Flex } from "@mantine/core";
import Link from "next/link";

import PortfolioIcon from "@/icons/portfolio-icon";
import GlobalIcon from "@/icons/global-icon";
import { useAppSelector } from "@/hooks/redux";

type Props = {
  selectedLink: "global" | "portfolio";
};

export default function GlobalPortfolioSwitch({
  selectedLink = "global",
}: Props) {
  const userAddress = useAppSelector((state) => state.user.connectedWallet);
  const isGlobalSelected = selectedLink === "global";
  const isPortfolioSelected = selectedLink === "portfolio";

  const portfolioLinkStatus = !userAddress
    ? "disabled"
    : isPortfolioSelected
    ? "active"
    : "inactive";
  return (
    <Flex align="center" gap={16}>
      <Link href="/collections/global">
        <GlobalIcon selected={isGlobalSelected} />
      </Link>
      <Link
        href="/collections/portfolio"
        style={{ pointerEvents: userAddress ? "unset" : "none" }}
      >
        <PortfolioIcon status={portfolioLinkStatus} />
      </Link>
    </Flex>
  );
}
