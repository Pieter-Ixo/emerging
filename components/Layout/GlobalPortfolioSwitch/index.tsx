import { Flex } from "@mantine/core";
import Link from "next/link";

import PortfolioIcon from "@/icons/portfolio-icon";
import GlobalIcon from "@/icons/global-icon";
import { useAppSelector } from "@/hooks/redux";

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

  return (
    <Flex align="center" gap={16}>
      <Link href="/collections/global">
        <GlobalIcon selected={isGlobalSelected} />
      </Link>
      <PortfolioLink isSelected={isPortfolioSelected} />
    </Flex>
  );
}
