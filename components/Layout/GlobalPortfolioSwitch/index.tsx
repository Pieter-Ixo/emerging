import { Flex } from "@mantine/core";
// import { useMediaQuery } from "@mantine/hooks";

// import WalletNavIcon from "@/icons/wallet-nav-icon";
import GlobalIconLink from "./components/GlobalIconLink";
import PortfolioIconLink from "./components/PortfolioIconLink";

type Props = {
  selectedLink: "global" | "portfolio";
};

export default function GlobalPortfolioSwitch({
  selectedLink = "global",
}: Props) {
  const isGlobalSelected = selectedLink === "global";
  const isPortfolioSelected = selectedLink === "portfolio";

  // const isScreenWiderThanMobile = useMediaQuery("(min-width: 768px)");

  return (
    <Flex align="center" gap={16}>
      {/* {!isScreenWiderThanMobile && <WalletNavIcon />} */}
      <GlobalIconLink isSelected={isGlobalSelected} />
      <PortfolioIconLink isSelected={isPortfolioSelected} />
    </Flex>
  );
}
