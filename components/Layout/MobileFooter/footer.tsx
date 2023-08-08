import { Flex, Footer } from "@mantine/core";

import { palette } from "@/theme/palette";

import GlobalPortfolioSwitch from "../GlobalPortfolioSwitch";

export default function MobileNav() {
  return (
    <Footer p="xs" height={100} bg={palette.Neutral200} withBorder={false}>
      <Flex h="100%" justify="center" align="center">
        <GlobalPortfolioSwitch selectedLink="portfolio" />
      </Flex>
    </Footer>
  );
}
