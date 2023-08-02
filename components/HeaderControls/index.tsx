import { Flex } from "@mantine/core";

import Link from "next/link";
import GlobalIcon from "../icons/global-icon";
import PortfolioIcon from "../icons/portfolio-icon";

type Props = {
  selectedLink: "global" | "portfolio";
};

export default function HeaderControls({ selectedLink = "global" }: Props) {
  const isGlobalSelected = selectedLink === "global";
  const isPortfolioSelected = selectedLink === "portfolio";

// TODO: add portfolio link handling(if user isn't logged, disable portfolio btn)

  return (
    <Flex align="center" gap={16}>
      <Link href="/collections/global">
        <GlobalIcon selected={isGlobalSelected} />
      </Link>
      <Link href="/collections/portfolio">
        <PortfolioIcon selected={isPortfolioSelected}/>
      </Link>
    </Flex>
  );
}
